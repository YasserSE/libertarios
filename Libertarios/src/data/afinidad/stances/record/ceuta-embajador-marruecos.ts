import type { Stance } from "../../types";

/**
 * HECHOS de «ceuta-embajador-marruecos» (WP4).
 *
 * Ancla: XV · sesión 198 · votación 14 · 2026-09-16 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion198/20260916/Votacion014/VOT_20260916195402.json
 *
 * Recuento sacado del JSON de datos abiertos con `npm run afinidad:vote -- <url> --json`
 * el 2026-10-07. Partidos con grupo propio: voto del grupo. Partidos sin grupo
 * propio (Mixto): SOLO los diputados atribuidos en `deputies.ts` en esa fecha;
 * los demás diputados del Mixto no cuentan para nadie. Regla de mapeo y
 * disidencia: docs/AFINIDAD-DATOS.md §3. Pregunta incorporada en la revisión del 2026-10-07 (docs/AFINIDAD-PREGUNTAS.md §9).
 *
 * Mixto sin atribuir (no cuentan): Ortega Smith-Molina, Francisco Javier: Sí.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 198,
  date: "2026-09-16",
  number: 14,
  title:
    "Moción consecuencia de interpelación urgente del Grupo Parlamentario Popular en el Congreso, sobre la crisis que atraviesa la Ciudad Autónoma de Ceuta. Votación separada por puntos. Punto 3 del segundo apartado.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion198/20260916/Votacion014/VOT_20260916195402.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GS): 0 sí, 120 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "pp",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GP): 137 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "vox",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GVOX): 32 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, sin los diputados atribuidos a otros partidos en deputies.ts): 24 sí, 0 no, 0 abst., 2 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Belarra Urteaga, Ione (GMx): No; Sánchez Serna, Javier (GMx): No; Santana Perera, Noemí (GMx): No; Velarde Gómez, Martina (GMx): No): 0 sí, 4 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "erc",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GR): 0 sí, 7 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "junts",
    questionId: "ceuta-embajador-marruecos",
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
    questionId: "ceuta-embajador-marruecos",
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
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 0 sí, 0 no, 5 abst., 0 no vota. Voto «abstención» con agreeMeans «si» → 0.",
    },
  },
  {
    partyId: "bng",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "cc",
    questionId: "ceuta-embajador-marruecos",
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
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "compromis",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "ceuta-embajador-marruecos",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 24 sí, 0 no, 0 abst., 2 no vota. Voto «sí» con agreeMeans «si» → 2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
