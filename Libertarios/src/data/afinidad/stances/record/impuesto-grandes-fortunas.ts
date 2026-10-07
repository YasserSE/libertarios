import type { Stance } from "../../types";

/**
 * HECHOS (WP4) — impuesto-grandes-fortunas.
 *
 * Votación ancla: XIV, sesión 184, 2022-06-07, nº 1. agreeMeans: "si".
 * Recuento comprobado con `npm run afinidad:vote` el 2026-10-06 sobre el JSON de datos
 * abiertos. Partidos sin grupo propio: voto por diputado según `deputies.ts`.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XIV",
  session: 184,
  date: "2022-06-07",
  number: 1,
  title:
    "Proposición de Ley del Grupo Parlamentario Confederal de Unidas Podemos-En Comú Podem-Galicia en Común, del Impuesto sobre la titularidad, tenencia, disponibilidad, disfrute o uso de bienes o derechos por personas con grandes fortunas.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg14/Sesion184/20220607/Votacion001/VOT_20230302184835.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GS: 117 no, 3 no votan.",
    },
  },
  {
    partyId: "pp",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GP: 87 no, 1 no vota.",
    },
  },
  {
    partyId: "vox",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GVOX: 50 no, 2 no votan.",
    },
  },
  {
    partyId: "sumar",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "media",
      evidence: vote("si"),
      note: "Sumar no existía como partido en la XIV: se usa el voto del grupo GCUP-EC-GC (Unidas Podemos-En Comú Podem-Galicia en Común), del que formaban parte IU, los Comuns y Yolanda Díaz. GCUP-EC-GC: 33 sí.",
    },
  },
  {
    partyId: "podemos",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "XIV: voto del grupo GCUP-EC-GC (Unidas Podemos), compartido con IU y los Comuns (ver recordNote). GCUP-EC-GC: 33 sí (proponente).",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Coalición sin historial propio: en la XIV se usa el voto del grupo GCUP-EC-GC (Unidas Podemos), del que formaban parte IU y los Comuns (ver recordNote). GCUP-EC-GC: 33 sí.",
    },
  },
  {
    partyId: "erc",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GR: 13 sí.",
    },
  },
  {
    partyId: "junts",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "XIV: voto atribuido por diputado en el Grupo Plural (Nogueras, Illamola, Calvo, Pagès; ver deputies.ts). 3 abstenciones (Illamola, Calvo, Pagès), 1 no vota (Nogueras).",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GEH Bildu: 5 sí.",
    },
  },
  {
    partyId: "pnv",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GV (EAJ-PNV): 6 no.",
    },
  },
  {
    partyId: "bng",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "XIV: voto de Néstor Rego Candamil (GPlu): sí.",
    },
  },
  {
    partyId: "cc",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 0,
      status: "pendiente",
      confidence: "baja",
      evidence: vote("ausente"),
      note: "no votó: Ana Oramas (GMx, XIV), única diputada atribuida a CC, figura como «No vota» en el JSON. La ausencia no es posición (docs/AFINIDAD-DATOS.md §3): sin otra ancla, la celda queda pendiente y no puntúa.",
    },
  },
  {
    partyId: "compromis",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "XIV: voto de Joan Baldoví Roda (GPlu): sí.",
    },
  },
  {
    partyId: "upn",
    questionId: "impuesto-grandes-fortunas",
    programme: null,
    record: { position: 0, status: "pendiente", confidence: "baja", evidence: [], note: "Sin dato atribuible a UPN en la XIV: los dos diputados de Navarra Suma (Sergio Sayas y Carlos García Adanero, GMx) fueron elegidos en la coalición NA+ (UPN-PP-Cs) y UPN los expulsó en 2022; deputies.ts no los atribuye a UPN. Se revisará si aparece fuente con fechas." },
  },
];
