import {
  DATASET_VERSION,
  type AnswerContext,
  type Answers,
  type Question,
  type UserPosition,
  USER_POSITIONS,
} from "@/data/afinidad/types";
import { INE_REGION } from "./schema";

/**
 * Las respuestas en la URL, para compartir sin base de datos (patrón de
 * `PolicyQuiz`).
 *
 * `?r=<valores>.<importancia>&v=<versión>[&ca=<CCAA>][&vh=<partido>]`
 *
 *   * **valores**: un carácter por pregunta, en el orden de `order`: `0`–`3`
 *     son −2, −1, +1, +2 (escala de 4 puntos, sin punto medio); `s` es
 *     «saltar».
 *   * **importancia**: máscara de bits en base 36; el bit i es la pregunta i.
 *     Así 15 toggles caben en 1–3 caracteres.
 *   * **v**: versión del dataset. Si ha cambiado desde que se compartió, el
 *     resultado se recalcula con los datos nuevos y la página lo avisa.
 *   * **ca / vh**: contexto opcional (comunidad, voto habitual). Si la persona
 *     eligió «Prefiero no decirlo», simplemente no aparecen.
 *
 * Decodificar es defensivo: un enlace cortado, editado a mano o de otra
 * versión del cuestionario devuelve `null` en vez de un resultado inventado.
 */

export const PARAM_ANSWERS = "r";
export const PARAM_VERSION = "v";
export const PARAM_REGION = "ca";
export const PARAM_USUAL_VOTE = "vh";

const SKIP = "s";
const SEP = ".";
// Por encima de 52 bits la máscara dejaría de ser exacta en un `number`.
const MAX_QUESTIONS = 52;
const VERSION_RE = /^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$/;
const PARTY_ID_RE = /^[a-z0-9-]{1,32}$/;
const MASK_RE = /^[0-9a-z]{1,11}$/;

const ordered = (questions: readonly Question[]) => [...questions].sort((a, b) => a.order - b.order);

/** Solo el valor de `r`. Lo no respondido se codifica como saltado. */
export function encodeAnswers(answers: Answers, questions: readonly Question[]): string {
  const qs = ordered(questions);
  if (qs.length > MAX_QUESTIONS) throw new Error("demasiadas preguntas para la máscara de importancia");
  let values = "";
  let mask = 0;
  qs.forEach((q, i) => {
    const a = answers[q.id];
    const code = a && a !== "skip" ? USER_POSITIONS.indexOf(a.value) : -1;
    if (a && a !== "skip" && code >= 0) {
      values += String(code);
      if (a.important) mask += 2 ** i;
    } else {
      values += SKIP;
    }
  });
  return `${values}${SEP}${mask.toString(36)}`;
}

/** Lee `r`; `null` si no corresponde exactamente a este cuestionario. */
export function decodeAnswers(raw: string | null | undefined, questions: readonly Question[]): Answers | null {
  if (typeof raw !== "string") return null;
  const qs = ordered(questions);
  if (qs.length === 0 || qs.length > MAX_QUESTIONS) return null;
  const parts = raw.split(SEP);
  if (parts.length !== 2) return null;
  const [values, maskRaw] = parts;
  if (values.length !== qs.length || !MASK_RE.test(maskRaw)) return null;
  const mask = parseInt(maskRaw, 36);
  if (!Number.isSafeInteger(mask) || mask < 0 || mask >= 2 ** qs.length) return null;
  // Rechaza ceros a la izquierda: la misma respuesta debe tener un único enlace.
  if (mask.toString(36) !== maskRaw) return null;

  const out: Answers = {};
  for (let i = 0; i < qs.length; i++) {
    const c = values[i];
    const important = Math.floor(mask / 2 ** i) % 2 === 1;
    if (c === SKIP) {
      // El codificador nunca marca importante una pregunta saltada: si llega
      // así, el enlace está manipulado o corrupto.
      if (important) return null;
      out[qs[i].id] = "skip";
      continue;
    }
    if (c < "0" || c > "3") return null;
    out[qs[i].id] = { value: USER_POSITIONS[Number(c)] as UserPosition, important };
  }
  return out;
}

export interface ResultState {
  answers: Answers;
  context?: AnswerContext;
}

/** Parámetros completos del enlace de resultado. */
export function encodeResultParams(
  state: ResultState,
  questions: readonly Question[],
  version: string = DATASET_VERSION,
): URLSearchParams {
  const p = new URLSearchParams();
  p.set(PARAM_ANSWERS, encodeAnswers(state.answers, questions));
  p.set(PARAM_VERSION, version);
  const region = state.context?.region;
  if (region && INE_REGION.test(region)) p.set(PARAM_REGION, region);
  const vote = state.context?.usualVote;
  if (vote && PARTY_ID_RE.test(vote)) p.set(PARAM_USUAL_VOTE, vote);
  return p;
}

export interface DecodedResult {
  answers: Answers;
  context: AnswerContext;
  /** Versión con la que se compartió; `null` si el enlace no la traía. */
  version: string | null;
  /** La versión no coincide con la actual: recalcular y avisar. */
  stale: boolean;
}

type ParamSource =
  | URLSearchParams
  | { get(name: string): string | null }
  | Record<string, string | string[] | undefined>;

function read(params: ParamSource, key: string): string | null {
  if (typeof (params as URLSearchParams).get === "function") return (params as URLSearchParams).get(key);
  const v = (params as Record<string, string | string[] | undefined>)[key];
  if (Array.isArray(v)) return v[0] ?? null;
  return typeof v === "string" ? v : null;
}

/**
 * Lee el enlace de resultado. Acepta `URLSearchParams` o el objeto
 * `searchParams` de una página. Si las respuestas no son válidas devuelve
 * `null`; un contexto inválido se descarta sin invalidar el resto, porque es
 * opcional y no cambia la afinidad.
 *
 * @param partyIds si se pasa, el voto habitual debe ser uno de ellos.
 */
export function decodeResultParams(
  params: ParamSource,
  questions: readonly Question[],
  opts: { currentVersion?: string; partyIds?: readonly string[] } = {},
): DecodedResult | null {
  const answers = decodeAnswers(read(params, PARAM_ANSWERS), questions);
  if (!answers) return null;

  const rawVersion = read(params, PARAM_VERSION);
  const version = rawVersion && VERSION_RE.test(rawVersion) ? rawVersion : null;
  const current = opts.currentVersion ?? DATASET_VERSION;

  const context: AnswerContext = {};
  const region = read(params, PARAM_REGION);
  if (region && INE_REGION.test(region)) context.region = region;
  const vote = read(params, PARAM_USUAL_VOTE);
  if (vote && PARTY_ID_RE.test(vote) && (!opts.partyIds || opts.partyIds.includes(vote))) context.usualVote = vote;

  return { answers, context, version, stale: version !== current };
}
