import type { Stance } from "../../types";

/**
 * HECHOS (WP4) — okupacion-desalojo.
 *
 * Votación ancla: XV, sesión 179, 2026-05-19, nº 1. agreeMeans: "si".
 * Recuento comprobado con `npm run afinidad:vote` el 2026-10-06 sobre el JSON de datos
 * abiertos. Partidos sin grupo propio: voto por diputado según `deputies.ts`.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 179,
  date: "2026-05-19",
  number: 1,
  title:
    "Proposición de Ley del Grupo Parlamentario Popular en el Congreso, Orgánica contra la ocupación ilegal de inmuebles y para la convivencia vecinal y la protección de la seguridad de las personas y cosas en las comunidades de propietarios.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion179/20260519/Votacion001/VOT_20260519203502.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GS: 119 no, 2 no votan.",
    },
  },
  {
    partyId: "pp",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GP: 136 sí, 1 no vota (proponente).",
    },
  },
  {
    partyId: "vox",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GVOX: 33 sí.",
    },
  },
  {
    partyId: "sumar",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GSUMAR: 26 no (Àgueda Micó ya estaba en GMx y no cuenta aquí).",
    },
  },
  {
    partyId: "podemos",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Voto por diputado en GMx (Belarra, Velarde, Sánchez Serna, Santana): 4 no.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Historial del grupo GSUMAR (ver recordNote): 26 no.",
    },
  },
  {
    partyId: "erc",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GR: 7 no.",
    },
  },
  {
    partyId: "junts",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "GJxCAT: 6 abstenciones, 1 no vota.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GEH Bildu: 6 no.",
    },
  },
  {
    partyId: "pnv",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "GV (EAJ-PNV): 5 abstenciones.",
    },
  },
  {
    partyId: "bng",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Voto de Néstor Rego Candamil (GMx): no.",
    },
  },
  {
    partyId: "cc",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Voto de Cristina Valido García (GMx): sí.",
    },
  },
  {
    partyId: "upn",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Voto de Alberto Catalán Higueras (GMx): sí.",
    },
  },
  {
    partyId: "compromis",
    questionId: "okupacion-desalojo",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Voto de Àgueda Micó (GMx desde el 3-7-2025): no.",
    },
  },
];
