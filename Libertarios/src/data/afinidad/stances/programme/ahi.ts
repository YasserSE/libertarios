import type { Stance } from "../../types";

/**
 * Agrupación Herreña Independiente — celdas de PROGRAMA (WP3).
 *
 * PENDIENTE: no se ha localizado un programa electoral oficial publicado por
 * AHI. Buscado el 2026-10-06: «Agrupación Herreña Independiente AHI programa
 * electoral 2023 Parlamento de Canarias pdf». Según la prensa (rtvc.es), en
 * 2023 AHI y Nueva Canarias presentaron listas únicas en El Hierro; no se ha
 * comprobado si hubo un programa conjunto, así que NO se reutiliza el de NC-BC.
 * Ninguna celda puntúa hasta que aparezca el programa.
 */

const QUESTIONS = ["vivienda-tope-alquiler","irpf-inflacion","jornada-37-5","amnistia","nuclear","gasto-defensa","impuesto-grandes-fortunas","okupacion-desalojo","iva-primera-vivienda","inmigracion-competencias-cataluna","tauromaquia-patrimonio","prostitucion-abolicion","impuesto-banca","oficina-anticorrupcion","ceuta-embajador-marruecos"] as const;

const NOTE =
  "Pendiente: no se ha localizado un programa electoral oficial de AHI (búsqueda web del 2026-10-06). En 2023 concurrió en listas únicas con NC en El Hierro según la prensa; no se usa el programa de NC-BC sin confirmar que fuera común.";

export const stances: Stance[] = QUESTIONS.map((questionId) => ({
  partyId: "ahi",
  questionId,
  programme: {
    position: 0,
    status: "pendiente",
    confidence: "media",
    quote: "",
    source: { url: "", title: "" },
    note: NOTE,
  },
  record: null,
}));
