import type { Stance } from "../../types";

/**
 * Democracia Ourensana — celdas de PROGRAMA (WP3).
 *
 * PENDIENTE: no se ha localizado un programa electoral oficial de Democracia
 * Ourensana. Buscado el 2026-10-06: «Democracia Ourensana programa electoral
 * eleccións galegas 2024», «Democracia Ourensana web oficial programa
 * electoral autonómicas Galicia 2024 Jácome», y los dominios
 * democraciaourensana.org / ourensana.org (no responden). Solo aparecen
 * noticias de prensa sobre la campaña, que no valen como fuente de posición.
 * Ninguna celda puntúa hasta que aparezca el programa.
 */

const QUESTIONS = [
  "vivienda-tope-alquiler",
  "irpf-inflacion",
  "jornada-37-5",
  "amnistia",
  "nuclear",
  "gasto-defensa",
  "impuesto-grandes-fortunas",
  "okupacion-desalojo",
  "iva-primera-vivienda",
  "inmigracion-competencias-cataluna",
  "tauromaquia-patrimonio",
  "prostitucion-abolicion",
  "impuesto-banca",
  "oficina-anticorrupcion",
  "ceuta-embajador-marruecos",
] as const;

const NOTE =
  "Pendiente: no se ha localizado un programa electoral oficial de Democracia Ourensana (búsqueda web del 2026-10-06 para las autonómicas gallegas de 2024 y webs del partido sin respuesta). La prensa no sirve como fuente de posición.";

export const stances: Stance[] = QUESTIONS.map((questionId) => ({
  partyId: "democracia-ourensana",
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
