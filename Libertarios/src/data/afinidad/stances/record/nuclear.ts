import type { Stance } from "../../types";

/**
 * HECHOS de «nuclear» (WP4).
 *
 * Ancla: XV · sesión 119 · votación 1 · 2025-06-17 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json
 *
 * Recuento sacado del JSON de datos abiertos con `npm run afinidad:vote -- <url> --json`
 * el 2026-10-06. Partidos con grupo propio: voto del grupo. Partidos sin grupo
 * propio (Mixto/Plural): SOLO los diputados atribuidos en `deputies.ts` en esa
 * fecha; los demás diputados del Mixto (p. ej. Ábalos, NA+, Teruel Existe) no
 * cuentan para nadie. Regla de mapeo y disidencia: docs/AFINIDAD-DATOS.md §3.
 * Partidos sin escaño en esa fecha: no tienen celda.
 */
export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GS): 0 sí, 117 no, 0 abst., 2 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "pp",
    questionId: "nuclear",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GP): 137 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "vox",
    questionId: "nuclear",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GVOX): 33 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR (sin los diputados atribuidos a otros partidos en deputies.ts)): 0 sí, 25 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Velarde Gómez, Martina (GMx): No; Belarra Urteaga, Ione (GMx): No; Sánchez Serna, Javier (GMx): No; Santana Perera, Noemí (GMx): No vota): 0 sí, 3 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "erc",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GR): 0 sí, 7 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "junts",
    questionId: "nuclear",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "abstencion", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GJxCAT): 0 sí, 0 no, 7 abst., 0 no vota. Abstención → 0.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GEH Bildu): 0 sí, 6 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 0 sí, 5 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "bng",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "cc",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "upn",
    questionId: "nuclear",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "compromis",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GSUMAR): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "nuclear",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "media",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 119, date: "2025-06-17", number: 1, title: "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, para garantizar la aportación de la energía nuclear en la descarbonización del sistema energético.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion119/20250617/Votacion001/VOT_20250617203251.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 0 sí, 25 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
