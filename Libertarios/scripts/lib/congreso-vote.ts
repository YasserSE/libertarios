/**
 * Lectura y recuento de una votación de los datos abiertos del Congreso.
 *
 * Lo usan `scripts/fetch-congreso-vote.ts` (la herramienta de quien codifica
 * los hechos, WP4) y `scripts/verify-afinidad-sources.ts` (el validador, WP5).
 * Que los dos cuenten con el mismo código es el punto: si el investigador ve
 * «GP: sí» con esta función, el validador comprobará el dato con la misma.
 *
 * Todo lo de este fichero es puro (sin red) para poder probarlo con una
 * respuesta real guardada en `src/test/fixtures/`.
 *
 * Formato real del JSON (comprobado el 2026-10-06 con
 * `Leg15/Sesion202/20260930/Votacion001/VOT_20260930153547.json`):
 *   { informacion: { sesion: 202, numeroVotacion: 1, fecha: "30/9/2026", titulo, textoExpediente, … },
 *     totales: { asentimiento: "No", presentes, afavor, enContra, abstenciones, noVotan },
 *     votaciones: [{ asiento: "6", diputado: "Apellidos, Nombre", grupo: "GSUMAR", voto: "Sí"|"No"|"Abstención"|"No vota" }] }
 * Ojo: la fecha va sin ceros a la izquierda y el directorio `Votacion001/` no se
 * puede listar (404); el fichero se llama `VOT_<marca de tiempo>.json` y solo se
 * descubre desde la página de datos abiertos del día (ver `listingUrl`).
 */
import type { DeputyAttribution, Party } from "@/data/afinidad/types";
import { CONGRESO_VOTE_URL } from "@/lib/afinidad/schema";

export type VoteValue = "si" | "no" | "abstencion" | "ausente";

export interface CongresoVoteJson {
  informacion: {
    sesion: number;
    numeroVotacion: number;
    fecha: string;
    titulo?: string;
    textoExpediente?: string;
    tituloSubGrupo?: string;
    textoSubGrupo?: string;
  };
  totales?: {
    asentimiento?: string;
    presentes?: number;
    afavor?: number;
    enContra?: number;
    abstenciones?: number;
    noVotan?: number;
  };
  votaciones: Array<{ asiento?: string; diputado: string; grupo: string; voto: string }>;
}

/** Comprobación mínima de forma: lo justo para no contar basura como votos. */
export function isCongresoVoteJson(x: unknown): x is CongresoVoteJson {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  const info = o.informacion as Record<string, unknown> | undefined;
  return (
    !!info &&
    typeof info.sesion === "number" &&
    typeof info.numeroVotacion === "number" &&
    typeof info.fecha === "string" &&
    Array.isArray(o.votaciones)
  );
}

/**
 * Traduce el voto del JSON a nuestro vocabulario. Se normalizan acentos y
 * mayúsculas porque el Congreso ha publicado «Si»/«Sí» y «Abstencion» según la
 * época. Lo desconocido devuelve `null` y se informa, en vez de adivinar.
 */
export function normalizeVote(v: string): VoteValue | null {
  const s = v.normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
  if (s === "si") return "si";
  if (s === "no") return "no";
  if (s === "abstencion") return "abstencion";
  if (s === "no vota" || s === "novota" || s === "ausente") return "ausente";
  return null;
}

/** «30/9/2026» → «2026-09-30». `null` si no tiene esa forma. */
export function parseCongresoDate(fecha: string): string | null {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(fecha.trim());
  if (!m) return null;
  return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

export interface VoteRef {
  legislature: "XIV" | "XV";
  session: number;
  /** AAAA-MM-DD */
  date: string;
  number: number;
}

const ROMAN: Record<string, "XIV" | "XV"> = { "14": "XIV", "15": "XV" };

/** Saca legislatura, sesión, fecha y número de una URL de votación. */
export function parseVoteUrl(url: string): VoteRef | null {
  const m = CONGRESO_VOTE_URL.exec(url);
  if (!m) return null;
  const legislature = ROMAN[m[1]];
  if (!legislature) return null;
  const ymd = m[3];
  return {
    legislature,
    session: Number(m[2]),
    date: `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`,
    number: Number(m[4]),
  };
}

/**
 * Página de datos abiertos de un día. Es la única forma estable de encontrar
 * el nombre del fichero `VOT_….json` de una votación (el directorio no se lista).
 */
export function listingUrl(ref: Pick<VoteRef, "legislature" | "date">): string {
  const [y, m, d] = ref.date.split("-");
  return (
    "https://www.congreso.es/es/opendata/votaciones?p_p_id=votaciones&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view" +
    `&targetLegislatura=${ref.legislature}&targetDate=${d}/${m}/${y}`
  );
}

/**
 * Busca en el HTML de la página del día los ficheros de la votación pedida.
 * Devuelve las URLs absolutas por extensión. Si hay `png`/`pdf` pero no `json`
 * (pasa en votaciones públicas por llamamiento), la votación existe pero no se
 * puede comprobar por máquina, y el validador lo dice así.
 */
export function findVoteFiles(html: string, ref: VoteRef): { json?: string; xml?: string; pdf?: string; png?: string } {
  const re = /\/webpublica\/opendata\/votaciones\/Leg(\d+)\/Sesion(\d+)\/(\d{8})\/Votacion(\d+)\/(VOT_[^"'<>\s]+?\.(json|xml|pdf|png))/g;
  const out: { json?: string; xml?: string; pdf?: string; png?: string } = {};
  const leg = ref.legislature === "XV" ? 15 : 14;
  const ymd = ref.date.replace(/-/g, "");
  for (const m of Array.from(html.matchAll(re))) {
    if (Number(m[1]) !== leg || Number(m[2]) !== ref.session || m[3] !== ymd || Number(m[4]) !== ref.number) continue;
    const ext = m[6] as "json" | "xml" | "pdf" | "png";
    out[ext] ??= `https://www.congreso.es${m[0]}`;
  }
  return out;
}

/** Diferencias entre la cabecera del JSON y lo que dice el dataset. Vacío = coincide. */
export function checkVoteInfo(json: CongresoVoteJson, ref: Omit<VoteRef, "legislature">): string[] {
  const problems: string[] = [];
  const i = json.informacion;
  if (i.sesion !== ref.session) problems.push(`sesión ${i.sesion} en el JSON, ${ref.session} en el dataset`);
  if (i.numeroVotacion !== ref.number)
    problems.push(`votación nº ${i.numeroVotacion} en el JSON, ${ref.number} en el dataset`);
  const date = parseCongresoDate(i.fecha);
  if (date !== ref.date) problems.push(`fecha ${i.fecha} en el JSON, ${ref.date} en el dataset`);
  return problems;
}

// ─── Recuento ──────────────────────────────────────────────────────────────

export interface Tally {
  si: number;
  no: number;
  abstencion: number;
  ausente: number;
  /** Votos con un valor que no reconocemos; si no es 0, hay que mirar el JSON. */
  desconocido: number;
  total: number;
}

const emptyTally = (): Tally => ({ si: 0, no: 0, abstencion: 0, ausente: 0, desconocido: 0, total: 0 });

function add(t: Tally, voto: string) {
  const v = normalizeVote(voto);
  if (v) t[v]++;
  else t.desconocido++;
  t.total++;
}

/**
 * Voto mayoritario según `docs/AFINIDAD-DATOS.md` §3: cuenta la mayoría entre
 * quienes votaron (sí/no/abstención); si nadie votó, «ausente» (que no es
 * posición). Empate exacto en cabeza → «empate», y la decisión es humana.
 * `strong` = la mayoría llega a dos tercios; si no, la regla de disidencia
 * rebaja la posición un punto hacia 0, y por eso se enseña.
 */
export function majority(t: Tally): { vote: VoteValue | "empate"; strong: boolean } {
  const cast = t.si + t.no + t.abstencion;
  if (cast === 0) return { vote: "ausente", strong: true };
  const ranked = (["si", "no", "abstencion"] as const).map((k) => [k, t[k]] as const).sort((a, b) => b[1] - a[1]);
  if (ranked[0][1] === ranked[1][1]) return { vote: "empate", strong: false };
  return { vote: ranked[0][0], strong: ranked[0][1] * 3 >= cast * 2 };
}

export function tallyByGroup(json: CongresoVoteJson): Record<string, Tally> {
  const out: Record<string, Tally> = {};
  for (const v of json.votaciones) add((out[v.grupo] ??= emptyTally()), v.voto);
  return out;
}

const normName = (s: string) => s.normalize("NFC").replace(/\s+/g, " ").trim().toLocaleLowerCase("es");

/**
 * Atribución de un diputado a un partido en una fecha. El nombre se compara
 * tal cual sale en el JSON (normalizando espacios y mayúsculas) y la fecha
 * debe caer en el intervalo: los cambios de grupo (Podemos al Mixto en
 * diciembre de 2023) son precisamente lo que esta tabla resuelve.
 */
export function attributeDeputy(
  name: string,
  date: string,
  legislature: "XIV" | "XV",
  deputies: readonly DeputyAttribution[],
): DeputyAttribution | undefined {
  const n = normName(name);
  return deputies.find(
    (d) => d.legislature === legislature && normName(d.deputy) === n && d.from <= date && (!d.to || date <= d.to),
  );
}

export interface PartyTally {
  partyId: string;
  tally: Tally;
  /** Cómo se llegó al recuento: grupo propio, diputados atribuidos o ambos. */
  via: Array<"grupo" | "diputado">;
  deputies: Array<{ diputado: string; grupo: string; voto: string }>;
}

export interface PartyTallies {
  byParty: Record<string, PartyTally>;
  /**
   * Diputados del Mixto o del Plural sin atribuir en `deputies.ts`: su voto no
   * cuenta para ningún partido. (El nombre se conserva por compatibilidad;
   * incluye también el Grupo Plural de la XIV.)
   */
  unattributedMixto: Array<{ diputado: string; voto: string }>;
}

/**
 * Grupos compartidos por varios partidos sin grupo propio: el Mixto (XIV y XV)
 * y el Plural (XIV). Su voto de grupo no es el de ningún partido.
 */
export const SHARED_GROUPS: readonly string[] = ["GMx", "GPlu"];

/**
 * Grupo parlamentario de un partido en una legislatura concreta. Por qué hace
 * falta: un mismo partido no siempre se sentó en el mismo grupo (Podemos y la
 * izquierda que hoy es Sumar/Frente Amplio estaban en la XIV en GCUP-EC-GC).
 * `congressGroupByLegislature` manda; si no lo trae, vale `congressGroup`.
 */
export function partyGroupIn(party: Party, legislature: "XIV" | "XV"): string | undefined {
  return party.congressGroupByLegislature?.[legislature] ?? party.congressGroup;
}

/**
 * Recuento por partido (reglas de `docs/AFINIDAD-DATOS.md` §3):
 * 1. Un diputado atribuido en `deputies.ts` en esa fecha cuenta SOLO para ese
 *    partido, esté en el grupo que esté (Micó cuenta para Compromís también
 *    mientras se sentaba en GSUMAR, y por eso no suma a Sumar).
 * 2. Un partido con grupo propio en esa legislatura (`partyGroupIn`) recibe el
 *    voto de su grupo menos los diputados atribuidos a otro partido.
 * 3. Un partido cuyo grupo es compartido (GMx/GPlu) o que no tiene grupo NO
 *    recibe el voto del grupo: solo el de sus diputados atribuidos. Antes se
 *    leía el grupo y todo el Mixto (Ábalos incluido) sumaba a Podemos, BNG,
 *    CC, UPN y Compromís a la vez.
 * 4. Un diputado del Mixto/Plural sin atribución se lista aparte y no cuenta
 *    para nadie: no se reparte por intuición.
 */
export function tallyByParty(
  json: CongresoVoteJson,
  legislature: "XIV" | "XV",
  parties: readonly Party[],
  deputies: readonly DeputyAttribution[],
  sharedGroups: readonly string[] = SHARED_GROUPS,
): PartyTallies {
  const date = parseCongresoDate(json.informacion.fecha) ?? "";
  const byParty: Record<string, PartyTally> = {};
  const unattributedMixto: PartyTallies["unattributedMixto"] = [];
  const entry = (partyId: string) =>
    (byParty[partyId] ??= { partyId, tally: emptyTally(), via: [], deputies: [] });
  const mark = (e: PartyTally, via: "grupo" | "diputado") => {
    if (!e.via.includes(via)) e.via.push(via);
  };
  // Solo «poseen» un grupo los partidos cuyo grupo en esta legislatura no es
  // compartido. Los del Mixto/Plural dependen exclusivamente de deputies.ts.
  const groupOwners = new Map<string, Party[]>();
  for (const p of parties) {
    const g = partyGroupIn(p, legislature);
    if (!g || sharedGroups.includes(g)) continue;
    const list = groupOwners.get(g) ?? [];
    list.push(p);
    groupOwners.set(g, list);
  }

  for (const v of json.votaciones) {
    const a = attributeDeputy(v.diputado, date, legislature, deputies);
    if (a) {
      const e = entry(a.partyId);
      add(e.tally, v.voto);
      mark(e, "diputado");
      e.deputies.push(v);
      continue;
    }
    const owners = sharedGroups.includes(v.grupo) ? [] : groupOwners.get(v.grupo) ?? [];
    for (const p of owners) {
      const e = entry(p.id);
      add(e.tally, v.voto);
      mark(e, "grupo");
      e.deputies.push(v);
    }
    if (owners.length === 0 && sharedGroups.includes(v.grupo))
      unattributedMixto.push({ diputado: v.diputado, voto: v.voto });
  }
  return { byParty, unattributedMixto };
}

// ─── Salida legible ────────────────────────────────────────────────────────

const VOTE_LABEL: Record<VoteValue | "empate", string> = {
  si: "sí",
  no: "no",
  abstencion: "abstención",
  ausente: "ausente",
  empate: "EMPATE",
};

function row(cols: Array<string | number>, widths: number[]): string {
  return cols
    .map((c, i) => (typeof c === "number" ? String(c).padStart(widths[i]) : String(c).padEnd(widths[i])))
    .join("  ")
    .trimEnd();
}

function tallyRow(label: string, t: Tally, extra = ""): string {
  const m = majority(t);
  const verdict = VOTE_LABEL[m.vote] + (m.vote !== "ausente" && m.vote !== "empate" && !m.strong ? " (<2/3)" : "");
  return row(
    [label, t.si, t.no, t.abstencion, t.ausente, t.total, verdict, extra],
    [18, 4, 4, 5, 8, 5, 18, 0],
  );
}

// Cabecera alineada como las cifras (a la derecha) para que las columnas casen.
const HEADER = [
  "".padEnd(18),
  "sí".padStart(4),
  "no".padStart(4),
  "abst".padStart(5),
  "no vota".padStart(8),
  "total".padStart(5),
  "mayoría",
].join("  ");

/**
 * El informe que imprime `npm run afinidad:vote`. Formato fijo (lo copian los
 * investigadores a sus notas); si cambia, cambia también el test.
 */
export function formatVoteReport(
  json: CongresoVoteJson,
  opts: { url?: string; legislature: "XIV" | "XV"; parties: readonly Party[]; deputies: readonly DeputyAttribution[] },
): string {
  const i = json.informacion;
  const lines: string[] = [];
  lines.push(
    `Votación ${opts.legislature} · sesión ${i.sesion} · nº ${i.numeroVotacion} · ${parseCongresoDate(i.fecha) ?? i.fecha}`,
  );
  if (i.titulo) lines.push(`Título: ${i.titulo.trim()}`);
  if (i.textoExpediente) lines.push(`Expediente: ${i.textoExpediente.trim()}`);
  if (i.tituloSubGrupo?.trim() || i.textoSubGrupo?.trim())
    lines.push(`Subgrupo: ${[i.tituloSubGrupo, i.textoSubGrupo].filter((s) => s?.trim()).join(" — ").trim()}`);
  if (opts.url) lines.push(`JSON: ${opts.url}`);
  const t = json.totales;
  if (t)
    lines.push(
      `Totales oficiales: presentes ${t.presentes ?? "?"} · sí ${t.afavor ?? "?"} · no ${t.enContra ?? "?"} · ` +
        `abstenciones ${t.abstenciones ?? "?"} · no votan ${t.noVotan ?? "?"} · asentimiento ${t.asentimiento ?? "?"}`,
    );

  const groups = tallyByGroup(json);
  lines.push("", "POR GRUPO", HEADER);
  for (const g of Object.keys(groups).sort()) lines.push(tallyRow(g, groups[g]));
  const all = Object.values(groups).reduce((acc, x) => {
    (["si", "no", "abstencion", "ausente", "desconocido", "total"] as const).forEach((k) => (acc[k] += x[k]));
    return acc;
  }, emptyTally());
  lines.push(tallyRow("TOTAL", all));
  if (all.desconocido > 0) lines.push(`¡Ojo! ${all.desconocido} votos con un valor desconocido: revisa el JSON.`);

  lines.push("", "POR PARTIDO (grupo propio + atribución por diputado de deputies.ts)");
  if (opts.parties.length === 0 && opts.deputies.length === 0) {
    lines.push("(parties.ts y deputies.ts están vacíos: sin recuento por partido)");
  } else {
    const pt = tallyByParty(json, opts.legislature, opts.parties, opts.deputies);
    lines.push(HEADER);
    for (const id of Object.keys(pt.byParty).sort()) {
      const e = pt.byParty[id];
      lines.push(tallyRow(id, e.tally, `vía ${e.via.join("+")}`));
    }
    if (pt.unattributedMixto.length > 0) {
      lines.push("Mixto sin atribuir en deputies.ts (no cuentan para ningún partido):");
      for (const d of pt.unattributedMixto) lines.push(`  - ${d.diputado}: ${d.voto}`);
    }
  }

  lines.push("", "POR DIPUTADO (grupo · voto · diputado [partido atribuido])");
  const date = parseCongresoDate(i.fecha) ?? "";
  const sorted = [...json.votaciones].sort(
    (a, b) => a.grupo.localeCompare(b.grupo, "es") || a.diputado.localeCompare(b.diputado, "es"),
  );
  for (const v of sorted) {
    const a = attributeDeputy(v.diputado, date, opts.legislature, opts.deputies);
    lines.push(row([v.grupo, v.voto, v.diputado + (a ? ` [${a.partyId}]` : "")], [14, 10, 0]));
  }
  return lines.join("\n");
}
