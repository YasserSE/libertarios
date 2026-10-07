import type { Stance } from "../../types";

/**
 * HECHOS de «vivienda-tope-alquiler» (WP4).
 *
 * Ancla: XIV · sesión 256 · votación 173 · 2023-04-27 (agreeMeans «si»).
 * https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json
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
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GS): 120 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pp",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GP): 0 sí, 87 no, 0 abst., 1 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "vox",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GVOX): 0 sí, 50 no, 0 abst., 2 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "sumar",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "media",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Sumar no existía como partido en la XIV: según su recordNote (parties.ts, congressGroupByLegislature.XIV) se usa el voto del grupo GCUP-EC-GC (Unidas Podemos, con IU y los Comuns), en el que estaba Yolanda Díaz; por eso confianza «media». Recuento del JSON (grupo GCUP-EC-GC, comprobado con `npm run afinidad:vote`): 33 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "podemos",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GCUP-EC-GC (Unidas Podemos, compartido con IU y los Comuns), según su recordNote): 33 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "erc",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GR): 13 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "junts",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Pagès i Massó, Josep (GPlu): No; Calvo Gómez, Pilar (GPlu): No; Illamola Dausà, Mariona (GPlu): No; Nogueras i Camero, Míriam (GPlu): No): 0 sí, 4 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GEH Bildu): 5 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "pnv",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GV (EAJ-PNV)): 0 sí, 6 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "bng",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "abstencion", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Rego Candamil, Néstor (GPlu): Abstención): 0 sí, 0 no, 1 abst., 0 no vota. Abstención → 0.",
    },
  },
  {
    partyId: "cc",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "no", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Oramas González-Moro, Ana María (GMx): No): 0 sí, 1 no, 0 abst., 0 no vota. Voto «no» con agreeMeans «si» → -2.",
    },
  },
  {
    partyId: "upn",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 0,
      status: "pendiente",
      confidence: "baja",
      evidence: [],
      note: "XIV: UPN no tiene diputados atribuidos en deputies.ts. Sergio Sayas y Carlos García Adanero se eligieron por Navarra Suma (NA+, coalición UPN-PP-Cs) y UPN los expulsó en 2022; su voto no se atribuye a UPN sin fuente con fechas. Para constancia, en el JSON: Sayas López, Sergio (GMx): No; García Adanero, Carlos (GMx): No.",
    },
  },
  {
    partyId: "compromis",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (voto atribuido por diputado (deputies.ts): Baldoví Roda, Joan (GPlu): Sí): 1 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "vivienda-tope-alquiler",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "media",
      evidence: [
        { kind: "votacion", legislature: "XIV", session: 256, date: "2023-04-27", number: 173, title: "Votación del dictamen del Proyecto de Ley por el derecho a la vivienda.", groupVote: "si", url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion256/20230427/Votacion173/VOT_20230427151734.json" },
      ],
      note: "Recuento del JSON (grupo GCUP-EC-GC (Unidas Podemos), según su recordNote): 33 sí, 0 no, 0 abst., 0 no vota. Voto «sí» con agreeMeans «si» → +2. Frente Amplio no tiene historial propio: se usa el del grupo del que procede, como dice su recordNote.",
    },
  },
];
