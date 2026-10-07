import { DATASET_VERSION, type Dataset, type Stance } from "./types";
import { questions } from "./questions";
import { parties } from "./parties";
import { deputies } from "./deputies";
import { programmeStanceFiles } from "./stances/programme";
import { recordStanceFiles } from "./stances/record";
import { quoteFiles } from "./hemeroteca";
import { saidVsDidFiles } from "./dichos-hechos";

/**
 * El dataset real de «¿A quién votar? Objetivamente», unido desde los ficheros
 * de cada paquete de trabajo (ver `docs/AFINIDAD-PLAN.md` §2 y §6).
 *
 * Las celdas llegan partidas en dos: WP3 escribe el programa por partido y WP4
 * los hechos por pregunta. Aquí se juntan en una sola `Stance` por
 * partido×pregunta, que es lo que espera el motor (`score.ts`) y lo que exige
 * el esquema (una sola celda por par).
 *
 * Este fichero no valida ni descarta nada: si algo no encaja, lo deja pasar tal
 * cual para que `validateDataset` (test `afinidad-dataset.test.ts`) lo señale.
 * Romper aquí al importar tumbaría la web entera por un dato mal puesto.
 */

export interface MergeResult {
  stances: Stance[];
  /** Problemas de ensamblaje en castellano; el test de dataset exige que esté vacío. */
  problems: string[];
}

/**
 * Une celdas de programa y de hechos del mismo partido×pregunta.
 *
 * Reglas, y por qué:
 * - Un fichero de programa solo aporta `programme` y uno de hechos solo
 *   `record`. Si un fichero trae la otra mitad rellena, se avisa y la celda se
 *   deja duplicada: así el esquema la rechaza («celda duplicada») en vez de que
 *   aquí se elija en silencio cuál vale.
 * - Dos celdas de programa (o dos de hechos) para el mismo par: igual, se
 *   conservan las dos para que el esquema lo vea.
 * - Orden estable: el de los ficheros de programa y, detrás, las celdas que
 *   solo tienen hechos. El motor ordena por `Question.order`, así que el orden
 *   aquí solo importa para que el JSON abierto no cambie sin motivo.
 */
export function mergeStances(
  programme: ReadonlyArray<readonly Stance[]>,
  record: ReadonlyArray<readonly Stance[]>,
): MergeResult {
  const problems: string[] = [];
  const out: Stance[] = [];
  const byKey = new Map<string, Stance>();
  const key = (s: Stance) => `${s.partyId}|${s.questionId}`;

  for (const s of programme.flat()) {
    if (s.record !== null) problems.push(`${key(s)}: un fichero de programa trae «record»; va en stances/record/`);
    const cell: Stance = { partyId: s.partyId, questionId: s.questionId, programme: s.programme, record: null };
    if (byKey.has(key(s)) || s.record !== null) {
      if (byKey.has(key(s))) problems.push(`${key(s)}: dos celdas de programa para el mismo partido y pregunta`);
      out.push({ ...s });
      continue;
    }
    byKey.set(key(s), cell);
    out.push(cell);
  }

  const recordSeen = new Set<string>();
  for (const s of record.flat()) {
    if (s.programme !== null) problems.push(`${key(s)}: un fichero de hechos trae «programme»; va en stances/programme/`);
    if (recordSeen.has(key(s))) problems.push(`${key(s)}: dos celdas de hechos para el mismo partido y pregunta`);
    recordSeen.add(key(s));
    const existing = byKey.get(key(s));
    if (existing && existing.record === null && s.programme === null) {
      existing.record = s.record;
    } else if (!existing && s.programme === null) {
      const cell: Stance = { partyId: s.partyId, questionId: s.questionId, programme: null, record: s.record };
      byKey.set(key(s), cell);
      out.push(cell);
    } else {
      // Conflicto: se conserva por separado para que el esquema lo marque.
      out.push({ ...s });
    }
  }

  return { stances: out, problems };
}

const merged = mergeStances(programmeStanceFiles, recordStanceFiles);

/** Problemas al unir ficheros (vacío si todo encaja). Lo comprueba el test de dataset. */
export const assemblyProblems: readonly string[] = merged.problems;

export const dataset: Dataset = {
  version: DATASET_VERSION,
  parties,
  questions,
  stances: merged.stances,
  quotes: quoteFiles.flat(),
  saidVsDid: saidVsDidFiles.flat(),
  deputies,
};
