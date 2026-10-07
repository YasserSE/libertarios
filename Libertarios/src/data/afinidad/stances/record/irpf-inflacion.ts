import type { Stance } from "../../types";

/**
 * HECHOS de «irpf-inflacion» (WP4).
 *
 * Ancla: XV · sesión 34 · votación 12 · 2024-04-09 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json
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
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GS): 0 sí, 118 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "pp",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GP): 135 sí, 1 no, 0 abst., 1 no vota. Voto «sí» con agreeMeans «si» → +2. Disidencia minoritaria (1 de 136); la mayoría supera los dos tercios y no cambia la celda.",
    },
  },
  {
    partyId: "vox",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GVOX): 33 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR (sin los diputados atribuidos a otros partidos en deputies.ts)): 0 sí, 24 no, 0 abst., 2 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Santana Perera, Noemí (GMx): No; Belarra Urteaga, Ione (GMx): No; Sánchez Serna, Javier (GMx): No; Velarde Gómez, Martina (GMx): No vota): 0 sí, 3 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "erc",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GR): 0 sí, 7 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "junts",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "abstencion", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GJxCAT): 0 sí, 0 no, 7 abst., 0 no vota. Abstención → 0.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GEH Bildu): 0 sí, 4 no, 1 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2. Disidencia minoritaria (1 de 5); la mayoría supera los dos tercios y no cambia la celda.",
    },
  },
  {
    partyId: "pnv",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "abstencion", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 0 sí, 0 no, 5 abst., 0 no vota. Abstención → 0.",
    },
  },
  {
    partyId: "bng",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "abstencion", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GMx): Abstención): 0 sí, 0 no, 1 abst., 0 no vota. Abstención → 0.",
    },
  },
  {
    partyId: "cc",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Valido García, Cristina (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "upn",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Catalán Higueras, Alberto (GMx): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "compromis",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Micó Micó, Àgueda (GSUMAR): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "irpf-inflacion",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "media",
      evidence: [
        { kind: "votacion", legislature: "XV", session: 34, date: "2024-04-09", number: 12, title: "Proposición no de Ley del Grupo Parlamentario Popular en el Congreso, para deflactar el IRPF ajustándolo a la inflación para ayudar a las familias.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion034/20240409/Votacion012/VOT_20240409210642.json" },
      ],
      note: "Recuento del JSON (grupo GSUMAR, según su recordNote (sin los diputados atribuidos a otros partidos en deputies.ts)): 0 sí, 24 no, 0 abst., 2 no vota. Voto «no» con agreeMeans «si» → -2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
