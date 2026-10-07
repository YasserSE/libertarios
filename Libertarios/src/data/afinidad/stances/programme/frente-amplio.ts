import type { Stance } from "../../types";
import { questions } from "../../questions";

/**
 * Celdas de PROGRAMA de Frente Amplio. WP3.
 *
 * Coalición anunciada para el 29-N-2026 (Movimiento Sumar, IU, Más Madrid y
 * Comuns), pendiente de registro. No tiene programa publicado: todas las
 * celdas están `pendiente` y no puntúan. No se copian las de Sumar, porque el
 * programa de la coalición puede ser distinto.
 */

const NOTE = "Coalición en registro para el 29-N; programa aún no publicado (se usará el de 2026)";

export const stances: Stance[] = questions.map((q) => ({
  partyId: "frente-amplio",
  questionId: q.id,
  programme: {
    position: 0,
    status: "pendiente",
    confidence: "baja",
    quote: "",
    source: { url: "", title: "Programa electoral de Frente Amplio para las generales del 29-N-2026 (no publicado)" },
    note: NOTE,
  },
  record: null,
}));
