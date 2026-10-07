import type { Stance } from "../../types";

/**
 * HECHOS de «gasto-defensa» (WP4).
 *
 * Ancla: XV · sesión 185 · votación 26 · 2026-06-11 (agreeMeans «no»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json
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
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GS): 0 sí, 121 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2.",
    },
  },
  {
    partyId: "pp",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GP): 0 sí, 134 no, 0 abst., 3 no vota. Voto «no» con agreeMeans «no» → +2.",
    },
  },
  {
    partyId: "vox",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GVOX): 0 sí, 33 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR (sin los diputados atribuidos a otros partidos en deputies.ts)): 26 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Santana Perera, Noemí (GMx): Sí; Velarde Gómez, Martina (GMx): Sí; Belarra Urteaga, Ione (GMx): Sí; Sánchez Serna, Javier (GMx): Sí): 4 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2.",
    },
  },
  {
    partyId: "erc",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GR): 7 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2.",
    },
  },
  {
    partyId: "junts",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GJxCAT): 0 sí, 7 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GEH Bildu): 6 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 0 sí, 5 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2.",
    },
  },
  {
    partyId: "bng",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2.",
    },
  },
  {
    partyId: "cc",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2.",
    },
  },
  {
    partyId: "upn",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «no» → +2.",
    },
  },
  {
    partyId: "compromis",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "gasto-defensa",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "media",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 185, date: "2026-06-11", number: 26, title: "Moción consecuencia de interpelación urgente del Grupo Parlamentario Mixto (Sr. Rego Candamil), relativa a la reversión de las decisiones sobre el incremento del gasto militar para favorecer la inversión social en la actual situación de crisis económica. Votación separada por puntos: punto 1.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion185/20260611/Votacion026/VOT_20260611145733.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 26 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «no» → -2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
