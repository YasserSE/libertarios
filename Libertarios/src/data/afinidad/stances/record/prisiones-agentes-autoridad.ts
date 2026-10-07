import type { Stance } from "../../types";

/**
 * HECHOS de «prisiones-agentes-autoridad» (WP4).
 *
 * Ancla: XV · sesión 185 · votación 39 · 2026-06-11 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion039/VOT_20260611145750.json
 *
 * Recuento sacado del JSON de datos abiertos con `npm run afinidad:vote -- <url> --json`
 * el 2026-10-06. Partidos con grupo propio: voto del grupo. Partidos sin grupo
 * propio (Mixto): SOLO los diputados atribuidos en `deputies.ts` en esa fecha;
 * los demás diputados del Mixto no cuentan para nadie. Regla de mapeo y
 * disidencia: docs/AFINIDAD-DATOS.md §3. Pregunta incorporada en la revisión
 * de discriminación del 2026-10-06 (docs/AFINIDAD-PREGUNTAS.md).
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 185,
  date: "2026-06-11",
  number: 39,
  title:
    "Proposición de Ley Orgánica por la que se modifica el artículo ochenta de la Ley Orgánica 1/1979, de 26 de septiembre, General Penitenciaria, para reconocer, a efectos legales, el carácter de agentes de la autoridad a los funcionarios de la Administración Penitenciaria. Votación de conjunto, por tener la misma carácter orgánico.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion039/VOT_20260611145750.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GS): 120 sí, 1 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pp",
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GP): 135 sí, 0 no, 0 abst., 2 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "vox",
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GVOX): 33 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, sin los diputados atribuidos a otros partidos en deputies.ts): 21 sí, 2 no, 1 abst., 2 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "prisiones-agentes-autoridad",
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
    questionId: "prisiones-agentes-autoridad",
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
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GJxCAT): 7 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "prisiones-agentes-autoridad",
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
    questionId: "prisiones-agentes-autoridad",
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
    questionId: "prisiones-agentes-autoridad",
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
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "upn",
    questionId: "prisiones-agentes-autoridad",
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
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GMx): Abstención): 0 sí, 0 no, 1 abst., 0 no vota. Voto «abstención» con agreeMeans «si» → 0.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "prisiones-agentes-autoridad",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 21 sí, 2 no, 1 abst., 2 no vota. Voto «sí» con agreeMeans «si» → +2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
