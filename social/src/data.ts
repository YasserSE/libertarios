/**
 * Lectura del conjunto de datos publicado del test «¿A quién votar?».
 * Fuente única: el JSON que genera `npm run afinidad:json` en Libertarios/.
 * Aquí no se edita ni se completa nada: si falta un dato, falta en el vídeo.
 */
import datos from "../../Libertarios/public/afinidad/datos-2026.10.2.json";

export type Source = { url: string; title: string; year?: number; page?: string; date?: string };

export type Party = { id: string; name: string; short: string; color: string; initials: string };

export type Anchor = {
  legislature: string;
  session: number;
  date: string;
  number: number;
  title: string;
  url: string;
  agreeMeans: "si" | "no";
};

export type Question = { id: string; label: string; text: { es: string }; anchors: Anchor[] };

export type VoteEvidence = {
  kind: "votacion";
  date: string;
  title: string;
  groupVote: "si" | "no" | "abstencion" | "no-vota";
  url: string;
  number: number;
  session: number;
};

export type Stance = {
  partyId: string;
  questionId: string;
  programme: null | {
    position: number;
    status: "verificado" | "contested" | "pendiente" | "sin-posicion";
    quote: string;
    source: Source;
    note?: string;
  };
  record: null | {
    position: number;
    status: string;
    evidence: VoteEvidence[];
    note?: string;
  };
};

export type SaidVsDid = {
  id: string;
  partyId: string;
  questionId?: string;
  topic: string;
  said: { speaker: string; role: string; date: string; text: string; source: Source };
  did: {
    date: string;
    summary: string;
    evidence: { kind: string; reference?: string; title: string; url: string; date?: string }[];
  };
  verdict: "cumple" | "contradice" | "parcial" | "no-hecho";
  note?: string;
};

const data = (datos as unknown as { data: Record<string, unknown> }).data;

export const DATA_VERSION = (datos as unknown as { version: string }).version;
export const parties = data.parties as Party[];
export const questions = data.questions as Question[];
export const stances = data.stances as Stance[];
export const saidVsDid = data.saidVsDid as SaidVsDid[];

export const party = (id: string): Party => {
  const p = parties.find((x) => x.id === id);
  if (!p) throw new Error(`Partido desconocido: ${id}`);
  return p;
};

export const question = (id: string): Question => {
  const q = questions.find((x) => x.id === id);
  if (!q) throw new Error(`Pregunta desconocida: ${id}`);
  return q;
};

export const stance = (partyId: string, questionId: string): Stance | undefined =>
  stances.find((s) => s.partyId === partyId && s.questionId === questionId);

export const dvh = (id: string): SaidVsDid => {
  const e = saidVsDid.find((x) => x.id === id);
  if (!e) throw new Error(`Entrada «dijeron vs. hicieron» desconocida: ${id}`);
  return e;
};

/**
 * Etiquetas de veredicto: copiadas literalmente de
 * Libertarios/src/i18n/afinidad/dvh.ts (es). Describen la relación entre la
 * cita y el hecho, nunca a quien habla.
 */
export const VERDICT_LABEL: Record<SaidVsDid["verdict"], string> = {
  cumple: "Cumple",
  contradice: "Contradice",
  parcial: "Parcial",
  "no-hecho": "No lo hicieron",
};
