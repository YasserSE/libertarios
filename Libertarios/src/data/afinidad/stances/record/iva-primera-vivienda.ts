import type { Stance } from "../../types";

/**
 * HECHOS de «iva-primera-vivienda» (WP4).
 *
 * Ancla: XV · sesión 196 · votación 10 · 2026-09-10 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion196/20260910/Votacion010/VOT_20260910180642.json
 *
 * Recuento sacado del JSON de datos abiertos con `npm run afinidad:vote -- <url> --json`
 * el 2026-10-06. Partidos con grupo propio: voto del grupo. Partidos sin grupo
 * propio (Mixto): SOLO los diputados atribuidos en `deputies.ts` en esa fecha;
 * los demás diputados del Mixto no cuentan para nadie. Regla de mapeo y
 * disidencia: docs/AFINIDAD-DATOS.md §3. Pregunta incorporada en la segunda revisión
 * de discriminación del 2026-10-06 (docs/AFINIDAD-PREGUNTAS.md, §8).
 *
 * Mixto sin atribuir (no cuentan): Ortega Smith-Molina, Francisco Javier: Sí.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 196,
  date: "2026-09-10",
  number: 10,
  title:
    "Moción consecuencia de interpelación urgente del Grupo Parlamentario Popular en el Congreso, sobre la política en materia de vivienda del Gobierno. Votación separada por puntos. Punto 1.d.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion196/20260910/Votacion010/VOT_20260910180642.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "Recuento del JSON (grupo GS): 0 sí, 0 no, 119 abst., 2 no vota. Voto «abstención» con agreeMeans «si» → 0.",
    },
  },
  {
    partyId: "pp",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GP): 137 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "vox",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GVOX): 31 sí, 0 no, 0 abst., 1 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GSUMAR, sin los diputados atribuidos a otros partidos en deputies.ts): 0 sí, 26 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Santana Perera, Noemí (GMx): No; Velarde Gómez, Martina (GMx): No; Belarra Urteaga, Ione (GMx): No; Sánchez Serna, Javier (GMx): No): 0 sí, 4 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "erc",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GR): 6 sí, 0 no, 0 abst., 1 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "junts",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "Recuento del JSON (grupo GJxCAT): 0 sí, 0 no, 7 abst., 0 no vota. Voto «abstención» con agreeMeans «si» → 0.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GEH Bildu): 0 sí, 6 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 5 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "bng",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "cc",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): Abstención): 0 sí, 0 no, 1 abst., 0 no vota. Voto «abstención» con agreeMeans «si» → 0.",
    },
  },
  {
    partyId: "upn",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "compromis",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "iva-primera-vivienda",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 0 sí, 26 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
