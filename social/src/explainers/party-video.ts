import { dvh, stance, VERDICT_LABEL } from "../data";
import type { DvhRow, GridRow } from "./types";

/**
 * Piezas comunes de los vídeos «lo que prometen y lo que votan» (formato de
 * vivienda-partidos). Las filas salen de dos sitios, y en ninguno se inventa nada:
 *  - del conjunto de datos del test (`fromDataset`), o
 *  - de `extra-votes.ts` (`fromExtra`): votaciones y citas de programa buscadas
 *    para estos vídeos, cada una con su JSON de datos abiertos del Congreso y su página.
 */
export const PARTIES = ["pp", "psoe", "vox", "sumar", "podemos"] as const;
export type PartyId = (typeof PARTIES)[number];
export type Vote = NonNullable<GridRow["vote"]>;
export type Promise = GridRow["promise"];

export type ExtraVote = {
  id: string;
  /** Lo que se votó, en una frase (sale en pantalla). */
  question: string;
  date: string;
  title: string;
  url: string;
  votes: Record<PartyId, Vote | null>;
  promises: Record<PartyId, { promise: Promise; quote?: string; source?: string }>;
};

const promiseOf = (partyId: string, q: string): Promise => {
  const p = stance(partyId, q)?.programme;
  if (!p || p.status === "sin-posicion" || !p.quote) return "sin";
  return p.position > 0 ? "favor" : p.position < 0 ? "contra" : "sin";
};
const voteOf = (partyId: string, q: string): GridRow["vote"] => stance(partyId, q)?.record?.evidence[0]?.groupVote ?? null;

/** Filas de una pregunta del test. `flip` invierte el programa cuando la votación va en sentido contrario a la pregunta. */
export const fromDataset = (q: string, cues: Partial<Record<PartyId, string>>, flip = false): GridRow[] =>
  PARTIES.map((id) => {
    const p = promiseOf(id, q);
    return { partyId: id, promise: flip && p !== "sin" ? (p === "favor" ? "contra" : "favor") : p, vote: voteOf(id, q), cue: cues[id] ?? id };
  });

export const fromExtra = (v: ExtraVote, cues: Partial<Record<PartyId, string>>): GridRow[] =>
  PARTIES.map((id) => ({ partyId: id, promise: v.promises[id].promise, vote: v.votes[id], cue: cues[id] ?? id }));

/** Una fila «dijo / hizo» con el veredicto de la web. */
export const govRow = (partyId: PartyId, dvhId: string, topic: string, counts: string, cue: string): DvhRow => ({
  partyId,
  topic,
  verdict: VERDICT_LABEL[dvh(dvhId).verdict],
  counts,
  cue,
});
