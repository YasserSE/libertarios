import type { Stance } from "../../types";

/**
 * HECHOS de «oficina-anticorrupcion» (WP4).
 *
 * Ancla: XV · sesión 131 · votación 2 · 2025-09-16 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion131/20250916/Votacion002/VOT_20250916211206.json
 *
 * Recuento sacado del JSON de datos abiertos con `npm run afinidad:vote -- <url> --json`
 * el 2026-10-07. Partidos con grupo propio: voto del grupo. Partidos sin grupo
 * propio (Mixto): SOLO los diputados atribuidos en `deputies.ts` en esa fecha;
 * los demás diputados del Mixto no cuentan para nadie. Regla de mapeo y
 * disidencia: docs/AFINIDAD-DATOS.md §3. Pregunta incorporada en la revisión del 2026-10-07 (docs/AFINIDAD-PREGUNTAS.md §9).
 *
 * Mixto sin atribuir (no cuentan): Ábalos Meco, José Luis: Sí.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 131,
  date: "2025-09-16",
  number: 2,
  title:
    "Proposición de Ley del Grupo Parlamentario Plurinacional SUMAR, de creación de la Oficina de prevención de la corrupción.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion131/20250916/Votacion002/VOT_20250916211206.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GS): 118 sí, 0 no, 0 abst., 2 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "pp",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Recuento del JSON (grupo GP): 0 sí, 136 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "vox",
    questionId: "oficina-anticorrupcion",
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
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, sin los diputados atribuidos a otros partidos en deputies.ts): 26 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Belarra Urteaga, Ione (GMx): Sí; Sánchez Serna, Javier (GMx): Sí; Santana Perera, Noemí (GMx): Sí; Velarde Gómez, Martina (GMx): Sí): 4 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "erc",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GR): 7 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "junts",
    questionId: "oficina-anticorrupcion",
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
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GEH Bildu): 6 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 5 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "bng",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "cc",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "upn",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): Abstención): 0 sí, 0 no, 1 abst., 0 no vota. Voto «abstención» con agreeMeans «si» → 0.",
    },
  },
  {
    partyId: "compromis",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "oficina-anticorrupcion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 26 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → 2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
