import type { Answers, Question } from "@/data/afinidad/types";

/**
 * Orientación económica de la propia persona, para personalizar la invitación
 * al test del cuadrante al final del resultado (`QuadrantInvite`).
 *
 * Reglas que no se negocian (decisión del dueño):
 * - Solo con las respuestas de la persona a las preguntas de impuestos. Nunca
 *   con la afinidad a partidos ni con el voto habitual: la firma solo recibe
 *   respuestas y preguntas, así que no puede ver partidos aunque quiera.
 * - Se calcula en el navegador y no se guarda ni se envía a ningún sitio (el
 *   evento del clic lleva solo `from`, como el resto de «Sigue explorando»).
 */

/**
 * Pregunta → sentido. +1 si estar de acuerdo con la afirmación es pedir menos
 * impuestos (más libertad económica); −1 si es pedir más impuestos o más
 * intervención. Enunciados de `src/data/afinidad/questions.ts`:
 */
export const ECONOMIC_ITEMS: Readonly<Record<string, 1 | -1>> = {
  // «Los tramos del IRPF deben actualizarse cada año con la inflación.»
  // Deflactar evita la subida encubierta del tipo efectivo: menos impuesto.
  "irpf-inflacion": 1,
  // «Debe existir un impuesto estatal específico sobre los patrimonios de más
  // de 10 millones de euros.» Un impuesto nuevo: más impuestos.
  "impuesto-grandes-fortunas": -1,
  // «Debe subirse el impuesto a la gran banca: duplicar el gravamen temporal…»
  // Subir un impuesto: más impuestos.
  "impuesto-banca": -1,
  // «El IVA de la compra de la primera vivienda nueva debe bajar del 10 % al
  // 4 %.» Bajar un impuesto: menos impuestos.
  "iva-primera-vivienda": 1,
};

/** Respuestas sobre impuestos que hacen falta para decir algo. */
export const MIN_LEAN_ITEMS = 2;
/** Media (de −1 a +1) a partir de la cual se habla de una orientación. */
export const LEAN_THRESHOLD = 0.25;

export type EconomicLean = "libertad" | "intervencion" | "mixto" | "unknown";

export interface EconomicLeanResult {
  lean: EconomicLean;
  /** Respuestas sobre impuestos que han contado (las saltadas no). */
  answered: number;
}

/**
 * Media de `sentido × respuesta / 2` sobre las preguntas de `ECONOMIC_ITEMS`
 * respondidas y presentes en el cuestionario. Saltar no cuenta (ni como 0).
 * Con menos de `MIN_LEAN_ITEMS`, «unknown».
 */
export function economicLean(
  answers: Answers,
  questions: readonly Pick<Question, "id">[],
): EconomicLeanResult {
  let sum = 0;
  let answered = 0;
  for (const q of questions) {
    const direction = ECONOMIC_ITEMS[q.id];
    if (direction === undefined) continue;
    const a = answers[q.id];
    if (!a || a === "skip") continue;
    sum += (direction * a.value) / 2;
    answered++;
  }
  if (answered < MIN_LEAN_ITEMS) return { lean: "unknown", answered };
  const score = sum / answered;
  const lean = score >= LEAN_THRESHOLD ? "libertad" : score <= -LEAN_THRESHOLD ? "intervencion" : "mixto";
  return { lean, answered };
}
