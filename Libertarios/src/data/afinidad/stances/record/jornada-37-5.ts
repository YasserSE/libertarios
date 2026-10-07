import type { Stance } from "../../types";

/**
 * HECHOS de «jornada-37-5» (WP4).
 *
 * Ancla 1: XV · sesión 130 · votación 10 · 2025-09-10 (agreeMeans «no»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json
 * Ancla 2: XV · sesión 23 · votación 2 · 2024-02-22 (agreeMeans «si»), PNL del GSUMAR
 * para reducir la jornada máxima legal (BOCG-15-D-96: diálogo social y 38,5 h en
 * 2024 como primer paso). Añadida el 2026-10-06 (docs/AFINIDAD-PREGUNTAS.md §8): no
 * contradice a la primera en ningún partido; PP y Junts, en contra en la primera y
 * abstención en la segunda, pasan de −2 a −1.
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
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GS): 0 sí, 119 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GS): 119 sí, 0 no, 0 abst., 2 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "pp",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: -1,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "abstencion", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GP): 137 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GP): 0 sí, 0 no, 136 abst., 1 no vota → «abstención». No votó igual en las dos anclas (en contra en la primera, abstención en la segunda): -1 (docs/AFINIDAD-DATOS.md §3, varias anclas).",
    },
  },
  {
    partyId: "vox",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GVOX): 33 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GVOX): 0 sí, 32 no, 0 abst., 1 no vota → «no», coincide con la primera.",
    },
  },
  {
    partyId: "sumar",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR (sin los diputados atribuidos a otros partidos en deputies.ts)): 0 sí, 26 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GSUMAR): 26 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "podemos",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Velarde Gómez, Martina (GMx): No; Belarra Urteaga, Ione (GMx): No; Sánchez Serna, Javier (GMx): No; Santana Perera, Noemí (GMx): No): 0 sí, 4 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; diputados atribuidos: Sánchez Serna, Javier (GMx): Sí; Belarra Urteaga, Ione (GMx): Sí; Santana Perera, Noemí (GMx): Sí; Velarde Gómez, Martina (GMx): Sí): 4 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "erc",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GR): 0 sí, 7 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GR): 7 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "junts",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: -1,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "abstencion", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GJxCAT): 7 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GJxCAT): 0 sí, 0 no, 6 abst., 1 no vota → «abstención». No votó igual en las dos anclas (en contra en la primera, abstención en la segunda): -1 (docs/AFINIDAD-DATOS.md §3, varias anclas).",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GEH Bildu): 0 sí, 5 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GEH Bildu): 6 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "pnv",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 0 sí, 5 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GV (EAJ-PNV)): 4 sí, 0 no, 0 abst., 1 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "bng",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; diputados atribuidos: Rego Candamil, Néstor (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "cc",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; diputados atribuidos: Valido García, Cristina (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "upn",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; diputados atribuidos: Catalán Higueras, Alberto (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota → «no», coincide con la primera.",
    },
  },
  {
    partyId: "compromis",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; diputados atribuidos: Micó Micó, Àgueda (GSUMAR): Sí): 1 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "jornada-37-5",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "media",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 130, date: "2025-09-10", number: 10, title: "Votación conjunta de las enmiendas a la totalidad de devolución al Proyecto de Ley para la reducción de la duración máxima de la jornada ordinaria de trabajo y la garantía del registro de jornada y el derecho a la desconexión, presentadas por los Grupos Parlamentarios Junts per Catalunya, VOX y Popular en el Congreso.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion130/20250910/Votacion010/VOT_20250910213544.json" },
        { kind: "votacion", legislature: "XV", session: 23, date: "2024-02-22", number: 2, title: "Proposición no de Ley del Grupo Parlamentario SUMAR, relativa a la reducción de la jornada máxima legal de trabajo ordinario.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion023/20240222/Votacion002/VOT_20240222110733.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 0 sí, 26 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote. Segunda ancla (PNL del GSUMAR, 22-2-2024, sesión 23, votación 2; agreeMeans «si»; grupo GSUMAR): 26 sí, 0 no, 0 abst., 0 no vota → «sí», coincide con la primera.",
    },
  },
];
