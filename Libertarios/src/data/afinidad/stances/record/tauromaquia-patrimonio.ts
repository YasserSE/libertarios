import type { Stance } from "../../types";

/**
 * HECHOS (WP4) — tauromaquia-patrimonio.
 *
 * Votación ancla: XV, sesión 135, 2025-10-07, nº 1. agreeMeans: "no".
 * Recuento comprobado con `npm run afinidad:vote` el 2026-10-06 sobre el JSON de datos
 * abiertos. Partidos sin grupo propio: voto por diputado según `deputies.ts`.
 */

const ANCHOR = {
  kind: "votacion",
  legislature: "XV",
  session: 135,
  date: "2025-10-07",
  number: 1,
  title:
    "Proposición de Ley para la derogación de la Ley 18/2013, de 12 de noviembre, para la regulación de la Tauromaquia como patrimonio cultural.",
  url: "https://www.congreso.es/webpublica/opendata/votaciones/Leg15/Sesion135/20251007/Votacion001/VOT_20251007214328.json",
} as const;

const vote = (groupVote: "si" | "no" | "abstencion" | "ausente") => [{ ...ANCHOR, groupVote }];

export const stances: Stance[] = [
  {
    partyId: "psoe",
    questionId: "tauromaquia-patrimonio",
    programme: null,
    record: {
      position: 0,
      status: "verificado",
      confidence: "alta",
      evidence: vote("abstencion"),
      note: "GS: 117 abstenciones, 3 no votan.",
    },
  },
  {
    partyId: "pp",
    questionId: "tauromaquia-patrimonio",
    programme: null,
    record: {
      position: 2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("no"),
      note: "GP: 135 no, 2 no votan. Votar no a la derogación es estar de acuerdo con el enunciado.",
    },
  },
  {
    partyId: "vox",
    questionId: "tauromaquia-patrimonio",
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
    questionId: "tauromaquia-patrimonio",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GSUMAR: 26 sí.",
    },
  },
  {
    partyId: "podemos",
    questionId: "tauromaquia-patrimonio",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Voto por diputado en GMx (Belarra, Velarde, Sánchez Serna, Santana): 4 sí.",
    },
  },
  {
    partyId: "frente-amplio",
    questionId: "tauromaquia-patrimonio",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "Historial del grupo GSUMAR (ver recordNote): 26 sí.",
    },
  },
  {
    partyId: "erc",
    questionId: "tauromaquia-patrimonio",
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
    questionId: "tauromaquia-patrimonio",
    programme: null,
    record: {
      position: -2,
      status: "verificado",
      confidence: "alta",
      evidence: vote("si"),
      note: "GJxCAT: 7 sí.",
    },
  },
  {
    partyId: "eh-bildu",
    questionId: "tauromaquia-patrimonio",
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
    questionId: "tauromaquia-patrimonio",
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
    questionId: "tauromaquia-patrimonio",
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
    questionId: "tauromaquia-patrimonio",
    programme: null,
    record: {
      position: 0,
      status: "pendiente",
      confidence: "baja",
      evidence: vote("ausente"),
      note: "no votó: Cristina Valido García (GMx), única diputada atribuida a CC, figura como «No vota» en el JSON. La ausencia no es posición (docs/AFINIDAD-DATOS.md §3): sin otra ancla, la celda queda pendiente y no puntúa.",
    },
  },
  {
    partyId: "upn",
    questionId: "tauromaquia-patrimonio",
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
    questionId: "tauromaquia-patrimonio",
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
