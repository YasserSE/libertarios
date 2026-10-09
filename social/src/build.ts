/**
 * Convierte los datos de un partido en la lista de «beats» del Reel y en el
 * guion de la voz en off. Lo que se dice en voz es lo mismo que sale en
 * pantalla, dicho en llano.
 */
import { CHAPTERS, type Chapter } from "./chapters";
import { party as getParty, question, stance, dvh, VERDICT_LABEL, type Party, type SaidVsDid } from "./data";
import { DVH_MAP, type DvhPick } from "./dvh-map";
import { PROGRAMME_VOICE } from "./voice";
import voManifest from "./vo-manifest.json";

export const FPS = 30;

export type Programme =
  | { kind: "quote"; quote: string; source: string }
  | { kind: "none"; reason: string };

export type Vote = {
  label: string;
  date: string;
  vote: "si" | "no" | "abstencion" | "no-vota";
};

export type Votes = { kind: "votes"; votes: Vote[] } | { kind: "none"; reason: string };

export type Dvh = DvhPick & {
  saidDate: string;
  didDate: string;
  gap: string;
  verdict: SaidVsDid["verdict"];
  verdictLabel: string;
};

export type Beat =
  | { type: "hook"; script: string }
  | { type: "programme"; chapter: number; programme: Programme; script: string }
  | { type: "vote"; chapter: number; programme: Programme; votes: Votes; script: string }
  | { type: "dvh"; chapter: number; dvh: Dvh; script: string }
  | { type: "ending"; script: string };

export type Reel = { party: Party; chapters: Chapter[]; beats: Beat[] };

const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export const shortDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d}-${MONTHS[m - 1]}-${y}`;
};

const NUM = ["cero", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"];
const say = (n: number) => NUM[n] ?? String(n);

/** «11 días después», «2 años después»… a partir de dos fechas ISO. */
export const gapBetween = (from: string, to: string) => {
  const days = Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
  if (days < 60) return { short: `${days} días después`, spoken: `${say(days)} días después` };
  const months = Math.round(days / 30.44);
  if (months < 24) return { short: `${months} meses después`, spoken: `${say(months)} meses después` };
  const years = Math.round(days / 365.25);
  return { short: `${years} años después`, spoken: `${say(years)} años después` };
};

/** El voto siempre se dice junto a lo que se votaba: un «sí» suelto engaña. */
const VOTE_SPOKEN: Record<Vote["vote"], string> = {
  si: "votó sí a",
  no: "votó no a",
  abstencion: "se abstuvo en",
  "no-vota": "no votó en",
};

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Partidos que se nombran con artículo («el PP», «el PSOE»); el resto va sin él («a Vox»). */
const WITH_ARTICLE = new Set(["pp", "psoe"]);
const article = (p: Party) => (WITH_ARTICLE.has(p.id) ? `el ${p.short}` : p.short);

function programmeOf(p: Party, ch: Chapter): Programme {
  const s = stance(p.id, ch.questionId)?.programme;
  const year = s?.source.year ? ` de ${s.source.year}` : "";
  const europe = /europeas/i.test(s?.source.title ?? "");
  if (!s || s.status === "sin-posicion" || !s.quote) {
    return { kind: "none", reason: `Su programa${europe ? " europeo" : ""}${year} no se pronuncia sobre esto.` };
  }
  const page = s.source.page ? ` · p. ${s.source.page}` : "";
  return {
    kind: "quote",
    quote: s.quote,
    source: `Programa ${europe ? "europeo" : "electoral"} ${p.short} ${s.source.year ?? ""}${page}`.replace(/\s+·/, " ·"),
  };
}

function votesOf(p: Party, ch: Chapter): Votes {
  const r = stance(p.id, ch.questionId)?.record;
  if (!r || r.evidence.length === 0) return { kind: "none", reason: "No tenía escaño en esa votación." };
  const votes = r.evidence
    .filter((e) => e.kind === "votacion")
    .map((e) => {
      const label = ch.voteLabel[e.url];
      if (!label) throw new Error(`Falta voteLabel para ${e.url} (capítulo ${ch.key})`);
      return { label, date: e.date, vote: e.groupVote };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  return { kind: "votes", votes };
}

function dvhOf(p: Party, ch: Chapter): Dvh | null {
  const pick = DVH_MAP[p.id]?.[ch.key];
  if (!pick) return null;
  const e = dvh(pick.id);
  if (e.partyId !== p.id) throw new Error(`${pick.id} no es de ${p.id}`);
  return {
    ...pick,
    saidDate: e.said.date,
    didDate: e.did.date,
    gap: gapBetween(e.said.date, e.did.date).short,
    verdict: e.verdict,
    verdictLabel: VERDICT_LABEL[e.verdict],
  };
}

export function buildReel(partyId: string): Reel {
  const p = getParty(partyId);
  const the = article(p);
  const beats: Beat[] = [
    {
      type: "hook",
      script: `Si el 29 de noviembre votas ${the.startsWith("el ") ? `al ${p.short}` : `a ${p.short}`}… ¿qué te cambia? Mira lo que promete, lo que vota y lo que hizo.`,
    },
  ];

  CHAPTERS.forEach((ch, i) => {
    question(ch.questionId); // falla pronto si la pregunta ya no existe
    const programme = programmeOf(p, ch);
    const votes = votesOf(p, ch);

    beats.push({
      type: "programme",
      chapter: i,
      programme,
      script:
        programme.kind === "quote"
          ? `${ch.title}. ${PROGRAMME_VOICE[p.id]?.[ch.key] ?? "Esto promete en su programa."}`
          : `${ch.title}. Su programa no dice nada sobre esto.`,
    });

    const v0 = votes.kind === "votes" ? votes.votes[0] : null;
    beats.push({
      type: "vote",
      chapter: i,
      programme,
      votes,
      script: v0
        ? `Y en el Congreso ${VOTE_SPOKEN[v0.vote]} ${lowerFirst(v0.label)}.`
        : `En el Congreso no votó: no tenía escaño.`,
    });

    const d = dvhOf(p, ch);
    if (d) {
      const gap = gapBetween(d.saidDate, d.didDate).spoken;
      beats.push({
        type: "dvh",
        chapter: i,
        dvh: d,
        script: d.voice,
      });
    }
  });

  beats.push({
    type: "ending",
    script: "¿Y tú, con quién coincides de verdad? Haz el test gratis en libertarios punto eu. Tienes el enlace en la bio.",
  });

  return { party: p, chapters: CHAPTERS, beats };
}

/* ── Tiempos ────────────────────────────────────────────────────────────
 * La voz solo nombra cada pieza; el dato literal está en pantalla. Cada beat
 * dura lo que sea mayor: decir su guion (~2,9 palabras/s) o leer lo que
 * enseña (~4,2 palabras/s), más una pausa. Con voz grabada, los cortes saldrán
 * de la transcripción palabra a palabra.
 */
const WPS = 2.9;
const READ_WPS = 6;
const MIN_SECONDS: Record<Beat["type"], number> = { hook: 3, programme: 2.4, vote: 2.6, dvh: 5, ending: 4.5 };

export const words = (s: string) => s.replace(/[«»]/g, "").split(/\s+/).filter(Boolean);

const screenText = (b: Beat): string => {
  switch (b.type) {
    case "programme":
      return b.programme.kind === "quote" ? b.programme.quote : b.programme.reason;
    case "vote":
      return b.votes.kind === "votes" ? b.votes.votes.map((v) => v.label).join(" ") : b.votes.reason;
    case "dvh":
      return `${b.dvh.said} ${b.dvh.did}`;
    default:
      return "";
  }
};

/* ── Voz en off (npm run tts -- <partido>) ─────────────────────────────── */

export type VoClip = { file: string; seconds: number; words: { word: string; t: number }[] };

/** Respiro antes y después de cada frase de voz (s). */
export const VO_LEAD = 0.12;
const VO_TAIL = 0.3;

/**
 * Clips de voz del partido, o null si no hay o si el guion cambió después de
 * generarlos (entonces hay que volver a pasar `npm run tts`).
 */
export const clipsFor = (id: string, scripts: string[]): VoClip[] | null => {
  const clips = (voManifest as Record<string, VoClip[]>)[id];
  if (!clips || clips.length !== scripts.length) return null;
  const fresh = scripts.every((sc, i) => clips[i].words.map((w) => w.word).join(" ") === words(sc).join(" "));
  return fresh ? clips : null;
};

export const voFor = (r: Reel) => clipsFor(r.party.id, r.beats.map((b) => b.script));

/** Duración de un beat que solo depende de su voz (vídeo de presentación). */
export const voiceFrames = (script: string, clip: VoClip | null | undefined, min: number) =>
  Math.round(Math.max(min, clip ? VO_LEAD + clip.seconds + VO_TAIL : words(script).length / WPS + 0.9) * FPS);

export const beatFrames = (b: Beat, clip?: VoClip | null) =>
  Math.round(
    Math.max(
      MIN_SECONDS[b.type],
      clip ? VO_LEAD + clip.seconds + VO_TAIL : words(b.script).length / WPS + 0.9,
      words(screenText(b)).length / READ_WPS + 0.5,
    ) * FPS,
  );

export const reelFrames = (r: Reel) => {
  const vo = voFor(r);
  return r.beats.reduce((n, b, i) => n + beatFrames(b, vo?.[i]), 0);
};
