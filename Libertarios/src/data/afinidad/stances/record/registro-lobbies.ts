import type { Stance } from "../../types";

/**
 * HECHOS de «registro-lobbies» (WP4).
 *
 * Ancla: XV · sesión 198 · votación 16 · 2026-09-16 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion198/20260916/Votacion016/VOT_20260916195406.json
 *
 * Recuento sacado del JSON de datos abiertos con `npm run afinidad:vote -- <url> --json`
 * el 2026-10-06. Partidos con grupo propio: voto del grupo. Partidos sin grupo
 * propio (Mixto): SOLO los diputados atribuidos en `deputies.ts` en esa fecha;
 * los demás diputados del Mixto no cuentan para nadie. Regla de mapeo y
 * disidencia: docs/AFINIDAD-DATOS.md §3. Pregunta incorporada en la revisión
 * de discriminación del 2026-10-06 (docs/AFINIDAD-PREGUNTAS.md).
 *
 * Mixto sin atribuir (no cuentan): Ortega Smith-Molina, Francisco Javier: No.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 198,
  date: "2026-09-16",
  number: 16,
  title:
    "Real Decreto-ley 21/2026, de 25 de agosto, de transparencia e integridad de las actividades de los grupos de interés.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion198/20260916/Votacion016/VOT_20260916195406.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GS): 120 sí, 0 no, 0 abst., 1 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pp",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GP): 0 sí, 137 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "vox",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GVOX): 0 sí, 32 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, sin los diputados atribuidos a otros partidos en deputies.ts): 19 sí, 1 no, 3 abst., 3 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Santana Perera, Noemí (GMx): Abstención; Velarde Gómez, Martina (GMx): Abstención; Belarra Urteaga, Ione (GMx): Abstención; Sánchez Serna, Javier (GMx): Abstención): 0 sí, 0 no, 4 abst., 0 no vota. Voto «abstención» con agreeMeans «si» → 0.",
    },
  },
  {
    partyId: "erc",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GR): 7 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "junts",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GJxCAT): 0 sí, 7 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GEH Bildu): 6 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "registro-lobbies",
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
    questionId: "registro-lobbies",
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
    questionId: "registro-lobbies",
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
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "compromis",
    questionId: "registro-lobbies",
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
    questionId: "registro-lobbies",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 19 sí, 1 no, 3 abst., 3 no vota. Voto «sí» con agreeMeans «si» → +2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
