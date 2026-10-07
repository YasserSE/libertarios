import type { Stance } from "../../types";

/**
 * HECHOS de «impuesto-banca» (WP4).
 *
 * Ancla: XV · sesión 34 · votación 2 · 2024-04-09 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion002/VOT_20240409210632.json
 *
 * Recuento sacado del JSON de datos abiertos con `npm run afinidad:vote -- <url> --json`
 * el 2026-10-06. Partidos con grupo propio: voto del grupo. Partidos sin grupo
 * propio (Mixto): SOLO los diputados atribuidos en `deputies.ts` en esa fecha;
 * los demás diputados del Mixto no cuentan para nadie. Regla de mapeo y
 * disidencia: docs/AFINIDAD-DATOS.md §3. Pregunta incorporada en la revisión
 * de discriminación del 2026-10-06 (docs/AFINIDAD-PREGUNTAS.md).
 *
 * Mixto sin atribuir (no cuentan): Ábalos Meco, José Luis: No.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 34,
  date: "2024-04-09",
  number: 2,
  title:
    "Proposición de Ley del Grupo Parlamentario Mixto, para una correcta imposición de los beneficios caídos del cielo de la gran banca.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion002/VOT_20240409210632.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GS): 0 sí, 118 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "pp",
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GP): 0 sí, 135 no, 0 abst., 2 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "vox",
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GVOX): 0 sí, 33 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, sin los diputados atribuidos a otros partidos en deputies.ts): 24 sí, 0 no, 0 abst., 2 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Santana Perera, Noemí (GMx): Sí; Belarra Urteaga, Ione (GMx): Sí; Sánchez Serna, Javier (GMx): Sí; Velarde Gómez, Martina (GMx): No vota): 3 sí, 0 no, 0 abst., 1 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "erc",
    questionId: "impuesto-banca",
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
    questionId: "impuesto-banca",
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
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GEH Bildu): 5 sí, 0 no, 0 abst., 1 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 0 sí, 5 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "bng",
    questionId: "impuesto-banca",
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
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "upn",
    questionId: "impuesto-banca",
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
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GSUMAR): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "impuesto-banca",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 24 sí, 0 no, 0 abst., 2 no vota. Voto «sí» con agreeMeans «si» → +2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
