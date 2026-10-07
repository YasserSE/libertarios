import type { Stance } from "../../types";

/**
 * HECHOS (WP4) — inmigracion-competencias-cataluna.
 *
 * Votación ancla: XV, sesión 133, 2025-09-23, nº 1. agreeMeans: "no".
 * Recuento comprobado con `npm run afinidad:vote` el 2026-10-06 sobre el JSON de datos
 * abiertos. Partidos sin grupo propio: voto por diputado según `deputies.ts`.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 133,
  date: "2025-09-23",
  number: 1,
  title:
    "Proposición de Ley de los Grupos Parlamentarios Socialista y Junts per Catalunya, Orgánica de delegación en la Comunidad Autónoma de Cataluña de competencias estatales en materia de inmigración.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion133/20250923/Votacion001/VOT_20250923211048.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GS: 120 sí (coproponente). Votar sí a la delegación es estar en contra del enunciado.",
    },
  },
  {
    partyId: "pp",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GP: 137 no.",
    },
  },
  {
    partyId: "vox",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GVOX: 33 no.",
    },
  },
  {
    partyId: "sumar",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GSUMAR: 24 sí, 2 no (Alberto Ibáñez Mezquita y Jorge Pueyo Sanz). Mayoría de más de dos tercios: la división no cambia la celda.",
    },
  },
  {
    partyId: "podemos",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Voto por diputado en GMx (Belarra, Velarde, Sánchez Serna, Santana): 4 no.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Historial del grupo GSUMAR (ver recordNote): 24 sí, 2 no (Alberto Ibáñez Mezquita y Jorge Pueyo Sanz). Mayoría de más de dos tercios.",
    },
  },
  {
    partyId: "erc",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GR: 7 sí.",
    },
  },
  {
    partyId: "junts",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GJxCAT: 7 sí (coproponente).",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GEH Bildu: 6 sí.",
    },
  },
  {
    partyId: "pnv",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GV (EAJ-PNV): 5 sí.",
    },
  },
  {
    partyId: "bng",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Voto de Néstor Rego Candamil (GMx): sí.",
    },
  },
  {
    partyId: "cc",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Voto de Cristina Valido García (GMx): sí.",
    },
  },
  {
    partyId: "upn",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "Voto de Alberto Catalán Higueras (GMx): no.",
    },
  },
  {
    partyId: "compromis",
    questionId: "inmigracion-competencias-cataluna",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Voto de Àgueda Micó (GMx): sí.",
    },
  },
];
