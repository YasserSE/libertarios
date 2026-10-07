/**
 * Validador de fuentes del dataset de afinidad (WP5).
 *
 *   npm run afinidad:verify                 # comprueba todo y escribe el informe
 *   npm run afinidad:verify -- --offline    # sin red: solo esquema, pendientes y contested
 *   npm run afinidad:verify -- --concurrency=2
 *
 * Qué comprueba, y por qué:
 * - Cada URL de una celda que puntúa (verificado/contested) y de cada cita de
 *   hemeroteca responde. Una fuente que no se puede abrir no es una fuente.
 * - Cada votación (anclas de las preguntas y evidencias de hechos): el JSON de
 *   datos abiertos existe y su cabecera (`informacion.sesion`, `numeroVotacion`,
 *   `fecha`) coincide con lo que dice el dataset; y el voto anotado del partido
 *   coincide con el recuento de ese JSON (por grupo, o por diputado en el Mixto
 *   usando `deputies.ts`). Es la comprobación que convierte «verificado» en
 *   algo que una máquina puede repetir.
 * - La cita del programa aparece en el documento cuando es HTML. En PDF NO se
 *   comprueba: no hay extractor de texto de PDF instalado y la regla es no
 *   añadir dependencias. Se informa como «omitido».
 *   TODO: si el repo incorpora un extractor de PDF (p. ej. pdfjs-dist), buscar
 *   la cita normalizada en el texto de `source.page` aquí, en `checkQuoteInDocument`.
 *
 * Escribe `docs/AFINIDAD-VERIFICACION.md` y sale con código 1 si hay algo roto
 * en una celda que puntúa o en una votación ancla: esas son las que cambian el
 * resultado que ve la gente.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { dataset, assemblyProblems } from "@/data/afinidad";
import type { DeputyAttribution, Party, Question, Stance, Status, VoteEvidence } from "@/data/afinidad/types";
import { SCORING_STATUSES, validateDataset } from "@/lib/afinidad/schema";
import {
  checkVoteInfo,
  findVoteFiles,
  isCongresoVoteJson,
  listingUrl,
  majority,
  tallyByParty,
  partyGroupIn,
  SHARED_GROUPS,
  type CongresoVoteJson,
  type VoteRef,
} from "./lib/congreso-vote";
import { PoliteFetcher, type FetchOutcome } from "./lib/polite-fetch";

const REPORT_PATH = "docs/AFINIDAD-VERIFICACION.md";

type Level = "roto" | "aviso" | "omitido";
type Scope = "programa" | "hechos" | "ancla" | "hemeroteca";

interface Finding {
  level: Level;
  scope: Scope;
  partyId: string;
  questionId: string;
  status?: Status;
  url: string;
  message: string;
}

const args = process.argv.slice(2);
const OFFLINE = args.includes("--offline");
const concurrencyArg = Number(args.find((a) => a.startsWith("--concurrency="))?.split("=")[1]);
const http = new PoliteFetcher({ concurrency: Number.isFinite(concurrencyArg) && concurrencyArg > 0 ? concurrencyArg : 4 });

const findings: Finding[] = [];
let checkedUrls = 0;
let checkedVotes = 0;

const scores = (s: Status) => (SCORING_STATUSES as readonly string[]).includes(s);

// ─── URLs ──────────────────────────────────────────────────────────────────

/**
 * Clasifica una respuesta. 401/403/429 no son «roto»: muchos servidores
 * rechazan a cualquier cliente que no sea un navegador, y eso no significa que
 * el documento haya desaparecido; se avisa para que lo abra una persona.
 */
function classify(r: FetchOutcome): { level: Level | "ok"; message: string } {
  if (r.blockedByRobots) return { level: "aviso", message: "no comprobado: robots.txt lo prohíbe" };
  if (r.ok) return { level: "ok", message: "" };
  if ([401, 403, 429].includes(r.status))
    return { level: "aviso", message: `el servidor no deja comprobarlo (HTTP ${r.status}); ábrelo a mano` };
  if (r.status) return { level: "roto", message: `HTTP ${r.status}` };
  return { level: "roto", message: `sin respuesta (${r.error ?? "error de red"})` };
}

async function checkUrl(
  base: Omit<Finding, "level" | "message" | "url">,
  url: string,
  what: string,
  brokenLevel: Level = "roto",
): Promise<FetchOutcome> {
  const r = await http.alive(url);
  checkedUrls++;
  const c = classify(r);
  if (c.level !== "ok")
    findings.push({ ...base, url, level: c.level === "roto" ? brokenLevel : c.level, message: `${what}: ${c.message}` });
  return r;
}

// ─── Cita en el documento ──────────────────────────────────────────────────

/** Normaliza para comparar texto: sin acentos, sin comillas tipográficas, espacios simples. */
const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[«»“”"'‘’]/g, "")
    .replace(/[­]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const htmlToText = (html: string) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&(laquo|raquo|ldquo|rdquo|lsquo|rsquo);/g, '"')
    // Webs como boe.es escriben «Bolet&iacute;n»: como `norm` quita los acentos,
    // basta con quedarse con la letra base de la entidad.
    .replace(/&([a-zA-Z])(acute|grave|uml|circ|tilde|cedil);/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

async function checkQuoteInDocument(base: Omit<Finding, "level" | "message" | "url">, url: string, quote: string) {
  const isPdfUrl = /\.pdf(\?|#|$)/i.test(url);
  if (isPdfUrl) {
    findings.push({
      ...base,
      url,
      level: "omitido",
      message: "cita no comprobada: es un PDF y no hay extractor de texto de PDF instalado (TODO)",
    });
    return;
  }
  const r = await http.get(url);
  if (!r.ok || !r.body) return; // el fallo de la URL ya se informó en checkUrl
  const type = r.contentType ?? "";
  if (/pdf/i.test(type)) {
    findings.push({
      ...base,
      url,
      level: "omitido",
      message: "cita no comprobada: el servidor devuelve PDF y no hay extractor de texto de PDF instalado (TODO)",
    });
    return;
  }
  if (!/html|text\/plain|xml/i.test(type)) {
    findings.push({ ...base, url, level: "omitido", message: `cita no comprobada: tipo de documento ${type || "desconocido"}` });
    return;
  }
  const text = norm(htmlToText(new TextDecoder().decode(r.body)));
  if (!text.includes(norm(quote)))
    findings.push({
      ...base,
      url,
      level: "aviso",
      message: "la cita literal no aparece en el texto de la página (¿cambió la web, o la cita no es literal?)",
    });
}

// ─── Votaciones ────────────────────────────────────────────────────────────

type ResolvedVote =
  | { kind: "json"; url: string; json: CongresoVoteJson }
  | { kind: "sin-json"; files: string[] }
  | { kind: "no-existe" }
  | { kind: "error"; message: string };

const voteCache = new Map<string, Promise<ResolvedVote>>();

/**
 * Encuentra y descarga el JSON de una votación. Si la URL ya apunta al
 * `VOT_….json`, se usa; si apunta al directorio (lo normal en el dataset), se
 * busca en la página de datos abiertos del día, que es lo único que lista los
 * ficheros.
 */
function resolveVote(ref: VoteRef, url: string): Promise<ResolvedVote> {
  const key = /\.json(\?|$)/i.test(url) ? url : `${ref.legislature}|${ref.session}|${ref.date}|${ref.number}`;
  let p = voteCache.get(key);
  if (!p) {
    p = (async (): Promise<ResolvedVote> => {
      let jsonUrl = url;
      if (!/\.json(\?|$)/i.test(url)) {
        const page = await http.get(listingUrl(ref));
        if (!page.ok || !page.body)
          return { kind: "error", message: `no se pudo abrir la página de datos abiertos del día (${page.status || page.error})` };
        const files = findVoteFiles(new TextDecoder().decode(page.body), ref);
        if (!files.json) {
          const other = [files.pdf, files.png, files.xml].filter((x): x is string => !!x);
          return other.length ? { kind: "sin-json", files: other } : { kind: "no-existe" };
        }
        jsonUrl = files.json;
      }
      const r = await http.get(jsonUrl);
      if (!r.ok || !r.body) return { kind: "error", message: `JSON ${jsonUrl}: ${r.status || r.error}` };
      let json: unknown;
      try {
        json = JSON.parse(new TextDecoder().decode(r.body));
      } catch {
        return { kind: "error", message: `JSON ${jsonUrl}: no es JSON válido` };
      }
      if (!isCongresoVoteJson(json)) return { kind: "error", message: `JSON ${jsonUrl}: no tiene forma de votación` };
      return { kind: "json", url: jsonUrl, json };
    })();
    voteCache.set(key, p);
  }
  return p;
}

/** Devuelve el JSON si la votación existe y su cabecera coincide; si no, anota el problema. */
async function checkVoteExists(
  base: Omit<Finding, "level" | "message" | "url">,
  ref: VoteRef,
  url: string,
  brokenLevel: Level,
): Promise<CongresoVoteJson | null> {
  checkedVotes++;
  const v = await resolveVote(ref, url);
  const push = (level: Level, message: string) => findings.push({ ...base, url, level, message });
  if (v.kind === "error") {
    push(brokenLevel, v.message);
    return null;
  }
  if (v.kind === "no-existe") {
    push(brokenLevel, `la votación no aparece en los datos abiertos de ese día (${listingUrl(ref)})`);
    return null;
  }
  if (v.kind === "sin-json") {
    push("aviso", `el Congreso no publica JSON de esta votación (¿por llamamiento?); comprobar a mano: ${v.files.join(" ")}`);
    return null;
  }
  const mismatch = checkVoteInfo(v.json, ref);
  if (mismatch.length) {
    push(brokenLevel, `el JSON no es la votación anotada: ${mismatch.join("; ")}`);
    return null;
  }
  return v.json;
}

const VOTE_TO_POSITION = { si: 2, no: -2, abstencion: 0 } as const;

async function checkVoteEvidence(
  stance: Stance,
  ev: VoteEvidence,
  status: Status,
  question: Question | undefined,
  party: Party | undefined,
  deps: readonly DeputyAttribution[],
  evidenceCount: number,
) {
  const base = { scope: "hechos" as const, partyId: stance.partyId, questionId: stance.questionId, status };
  const level: Level = scores(status) ? "roto" : "aviso";
  const json = await checkVoteExists(base, ev, ev.url, level);
  if (!json) return;

  const { byParty } = tallyByParty(json, ev.legislature, party ? [party] : [], deps);
  const entry = byParty[stance.partyId];
  if (!entry || entry.tally.total === 0) {
    if (ev.groupVote !== "ausente")
      findings.push({
        ...base,
        url: ev.url,
        level,
        message:
          `ningún diputado de ${stance.partyId} en el JSON` +
          // Grupo de ESA legislatura; si es el Mixto/Plural solo cuentan los diputados atribuidos.
          (party && partyGroupIn(party, ev.legislature) && !SHARED_GROUPS.includes(partyGroupIn(party, ev.legislature)!)
            ? ` (grupo «${partyGroupIn(party, ev.legislature)}»)`
            : " (sin grupo propio en esa legislatura: falta su atribución en deputies.ts)") +
          `, pero el dataset anota «${ev.groupVote}»`,
      });
    return;
  }
  const m = majority(entry.tally);
  const t = entry.tally;
  const counts = `sí ${t.si} · no ${t.no} · abst ${t.abstencion} · no vota ${t.ausente}`;
  if (m.vote === "empate") {
    findings.push({ ...base, url: ev.url, level: "aviso", message: `empate en el recuento (${counts}); decisión humana con nota` });
    return;
  }
  if (m.vote !== ev.groupVote) {
    findings.push({
      ...base,
      url: ev.url,
      level,
      message: `el dataset anota «${ev.groupVote}» y el JSON da «${m.vote}» (${counts}, vía ${entry.via.join("+")})`,
    });
    return;
  }
  // Coherencia posición↔voto con la regla de AFINIDAD-DATOS.md §3. Solo con
  // una evidencia y si coincide con un ancla: con varias, ±1 es legítimo.
  const anchor = question?.anchors.find((a) => a.session === ev.session && a.number === ev.number && a.date === ev.date);
  const cell = stance.record;
  if (anchor && cell && evidenceCount === 1 && m.vote !== "ausente") {
    const raw = VOTE_TO_POSITION[m.vote];
    let expected = anchor.agreeMeans === "si" ? raw : -raw;
    if (!m.strong && expected !== 0) expected = Math.sign(expected); // disidencia: mayoría < 2/3 → ±1
    if (cell.status === "verificado" && cell.position !== expected)
      findings.push({
        ...base,
        url: ev.url,
        level: "aviso",
        message: `posición ${cell.position} pero la regla de mapeo da ${expected} (voto «${m.vote}», agreeMeans «${anchor.agreeMeans}»${m.strong ? "" : ", mayoría < 2/3"}); revisa la nota`,
      });
  }
}

// ─── Recorrido del dataset ─────────────────────────────────────────────────

async function verifyNetwork() {
  const partyById = new Map(dataset.parties.map((p) => [p.id, p]));
  const questionById = new Map(dataset.questions.map((q) => [q.id, q]));
  const deps = dataset.deputies ?? [];
  const jobs: Promise<unknown>[] = [];

  // Anclas: si una está mal, todas las celdas de hechos de esa pregunta lo están.
  for (const q of dataset.questions)
    for (const a of q.anchors)
      jobs.push(checkVoteExists({ scope: "ancla", partyId: "—", questionId: q.id }, a, a.url, "roto"));

  for (const s of dataset.stances) {
    const p = s.programme;
    if (p && scores(p.status)) {
      const base = { scope: "programa" as const, partyId: s.partyId, questionId: s.questionId, status: p.status };
      jobs.push(
        (async () => {
          const r = await checkUrl(base, p.source.url, "programa");
          if (r.ok && p.quote.trim()) await checkQuoteInDocument(base, p.source.url, p.quote);
        })(),
      );
      // El archivo de Wayback es la red de seguridad; si falla, se avisa, no bloquea.
      if (p.source.archiveUrl) jobs.push(checkUrl(base, p.source.archiveUrl, "copia en archive.org", "aviso"));
    }
    const r = s.record;
    if (r && scores(r.status)) {
      for (const ev of r.evidence) {
        const base = { scope: "hechos" as const, partyId: s.partyId, questionId: s.questionId, status: r.status };
        if (ev.kind === "votacion")
          jobs.push(
            checkVoteEvidence(s, ev, r.status, questionById.get(s.questionId), partyById.get(s.partyId), deps, r.evidence.length),
          );
        else jobs.push(checkUrl(base, ev.url, ev.kind === "boe" ? "BOE" : ev.chamber));
      }
    }
  }

  // Hemeroteca: no puntúa, así que lo roto se lista pero no bloquea.
  for (const q of dataset.quotes ?? []) {
    const base = { scope: "hemeroteca" as const, partyId: q.partyId, questionId: q.questionId };
    jobs.push(checkUrl(base, q.source.url, `cita de ${q.speaker} (${q.date})`));
    if (q.videoUrl) jobs.push(checkUrl(base, q.videoUrl, "vídeo", "aviso"));
    if (q.source.archiveUrl) jobs.push(checkUrl(base, q.source.archiveUrl, "copia en archive.org", "aviso"));
  }

  // «Dijeron vs. hicieron»: tampoco puntúa, así que va con la hemeroteca (no
  // bloquea). En `questionId` se pone el id de la entrada para encontrarla.
  for (const e of dataset.saidVsDid ?? []) {
    const base = { scope: "hemeroteca" as const, partyId: e.partyId, questionId: `dvh:${e.id}` };
    jobs.push(checkUrl(base, e.said.source.url, `dijeron: ${e.said.speaker} (${e.said.date})`));
    if (e.said.videoUrl) jobs.push(checkUrl(base, e.said.videoUrl, "vídeo", "aviso"));
    for (const ev of e.did.evidence)
      jobs.push(checkUrl(base, ev.url, `hicieron: ${ev.kind === "boe" ? ev.reference : ev.title}`));
  }

  await Promise.all(jobs);
}

// ─── Informe ───────────────────────────────────────────────────────────────

const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
const link = (u: string) => (u ? `<${u}>` : "—");

function bySort<T extends { partyId: string; questionId: string }>(xs: T[]): T[] {
  const qOrder = new Map(dataset.questions.map((q) => [q.id, q.order]));
  return [...xs].sort(
    (a, b) =>
      a.partyId.localeCompare(b.partyId) ||
      (qOrder.get(a.questionId) ?? 999) - (qOrder.get(b.questionId) ?? 999) ||
      a.questionId.localeCompare(b.questionId),
  );
}

function findingTable(xs: Finding[]): string[] {
  if (xs.length === 0) return ["Ninguno.", ""];
  const out = ["| Partido | Pregunta | Qué | Estado | Problema | URL |", "|---|---|---|---|---|---|"];
  for (const f of bySort(xs))
    out.push(`| ${f.partyId} | ${f.questionId} | ${f.scope} | ${f.status ?? "—"} | ${esc(f.message)} | ${link(f.url)} |`);
  out.push("");
  return out;
}

interface CellRow {
  partyId: string;
  questionId: string;
  lens: "programa" | "hechos";
  detail: string;
}

function cellsWithStatus(status: Status): CellRow[] {
  const rows: CellRow[] = [];
  for (const s of dataset.stances) {
    if (s.programme?.status === status)
      rows.push({
        partyId: s.partyId,
        questionId: s.questionId,
        lens: "programa",
        detail:
          status === "contested"
            ? `codificador ${s.programme.position}, revisor ${s.programme.reviewer?.position ?? "?"}`
            : s.programme.note ?? "",
      });
    if (s.record?.status === status)
      rows.push({ partyId: s.partyId, questionId: s.questionId, lens: "hechos", detail: s.record.note ?? "" });
  }
  return bySort(rows);
}

/** Agrupa por partido: así cada equipo de WP3 ve su lista de huecos de un vistazo. */
function cellSection(rows: CellRow[]): string[] {
  if (rows.length === 0) return ["Ninguna.", ""];
  const out: string[] = [];
  for (const partyId of Array.from(new Set(rows.map((r) => r.partyId)))) {
    const mine = rows.filter((r) => r.partyId === partyId);
    out.push(`### ${partyId} (${mine.length})`, "", "| Pregunta | Lente | Nota |", "|---|---|---|");
    for (const r of mine) out.push(`| ${r.questionId} | ${r.lens} | ${esc(r.detail) || "—"} |`);
    out.push("");
  }
  return out;
}

function report(schemaErrors: string[]): string {
  const blocking = findings.filter((f) => f.level === "roto" && f.scope !== "hemeroteca");
  const brokenQuotes = findings.filter((f) => f.level === "roto" && f.scope === "hemeroteca");
  const warnings = findings.filter((f) => f.level === "aviso");
  const skipped = findings.filter((f) => f.level === "omitido");
  const pending = cellsWithStatus("pendiente");
  const contested = cellsWithStatus("contested");
  const noPosition = cellsWithStatus("sin-posicion");
  const today = new Date().toISOString().slice(0, 10);

  const L: string[] = [
    "# Afinidad — verificación de fuentes",
    "",
    `> GENERADO por \`npm run afinidad:verify\` (scripts/verify-afinidad-sources.ts) el ${today}. No editar a mano.`,
    `> Dataset ${dataset.version}: ${dataset.parties.length} partidos, ${dataset.questions.length} preguntas, ` +
      `${dataset.stances.length} celdas, ${(dataset.quotes ?? []).length} citas de hemeroteca.`,
    "",
    "## Resumen",
    "",
    `- Modo: ${OFFLINE ? "**sin red** (`--offline`): no se ha abierto ninguna URL" : `${checkedUrls} URLs y ${checkedVotes} votaciones comprobadas`}.`,
    `- Esquema: ${schemaErrors.length ? `**${schemaErrors.length} errores**` : "válido"}.`,
    `- **Rotas en celdas que puntúan o anclas: ${blocking.length}** (hacen fallar el script).`,
    `- Rotas en hemeroteca (no puntúa): ${brokenQuotes.length}.`,
    `- Avisos (comprobar a mano): ${warnings.length}.`,
    `- Comprobaciones omitidas: ${skipped.length}.`,
    `- Celdas pendientes: ${pending.length} · contested: ${contested.length} · sin posición: ${noPosition.length}.`,
    "",
  ];
  if (schemaErrors.length) {
    L.push("## Errores de esquema", "", ...schemaErrors.map((e) => `- ${esc(e)}`), "");
  }
  L.push("## Rotas — celdas que puntúan y votaciones ancla", "", ...findingTable(blocking));
  L.push("## Rotas — hemeroteca", "", ...findingTable(brokenQuotes));
  L.push("## Avisos", "", ...findingTable(warnings));
  L.push(
    "## Omitidas",
    "",
    "La cita literal de programas en PDF no se comprueba: no hay extractor de texto de PDF instalado y no se añaden dependencias. " +
      "TODO: con un extractor, buscar la cita en la página indicada (`scripts/verify-afinidad-sources.ts`, `checkQuoteInDocument`).",
    "",
    ...findingTable(skipped),
  );
  L.push("## Contested — por partido", "", ...cellSection(contested));
  L.push("## Pendientes — por partido", "", ...cellSection(pending));
  L.push("## Sin posición — por partido", "", ...cellSection(noPosition));
  return L.join("\n");
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const v = validateDataset(dataset);
  const schemaErrors = [...assemblyProblems, ...(v.ok ? [] : v.errors)];

  if (!OFFLINE) await verifyNetwork();

  const out = resolve(process.cwd(), REPORT_PATH);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, report(schemaErrors) + "\n");

  const blocking = findings.filter((f) => f.level === "roto" && f.scope !== "hemeroteca");
  console.log(
    `Informe en ${REPORT_PATH}: ${blocking.length} rotas que bloquean, ` +
      `${findings.filter((f) => f.level === "aviso").length} avisos, ${schemaErrors.length} errores de esquema.`,
  );
  if (dataset.stances.length === 0) console.log("El dataset está vacío: no hay celdas que comprobar todavía.");
  for (const f of blocking) console.error(`ROTO ${f.partyId}/${f.questionId} (${f.scope}): ${f.message} — ${f.url}`);
  if (blocking.length > 0 || schemaErrors.length > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
