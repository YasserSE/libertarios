import type { Stance } from "../../types";

/**
 * HECHOS de «amnistia» (WP4).
 *
 * Ancla: XV · sesión 30 · votación 1 · 2024-03-14 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json
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
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GS): 120 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pp",
    questionId: "amnistia",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GP): 0 sí, 137 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "vox",
    questionId: "amnistia",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GVOX): 0 sí, 33 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR (sin los diputados atribuidos a otros partidos en deputies.ts)): 26 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Santana Perera, Noemí (GMx): Sí; Velarde Gómez, Martina (GMx): Sí; Belarra Urteaga, Ione (GMx): Sí; Sánchez Serna, Javier (GMx): Sí): 4 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "erc",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GR): 7 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "junts",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GJxCAT): 7 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GEH Bildu): 6 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 5 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "bng",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "cc",
    questionId: "amnistia",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "upn",
    questionId: "amnistia",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "compromis",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GSUMAR): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "amnistia",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "media",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 30, date: "2024-03-14", number: 1, title: "Proposición de Ley Orgánica de amnistía para la normalización institucional, política y social en Cataluña. Votación del nuevo dictamen.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion030/20240314/Votacion001/VOT_20240314135323.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 26 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
