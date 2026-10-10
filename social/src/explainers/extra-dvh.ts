import { VERDICT_LABEL } from "../data";
import type { PartyId } from "./party-video";
import type { DvhRow } from "./types";

/**
 * «Dijo / hizo» que no están en el test, buscados para los vídeos por temas
 * (2026-10-10) y comprobados en la fuente primaria. Mismas etiquetas que la web.
 */
export type ExtraDvh = { partyId: PartyId; said: string; saidSource: string; did: string; didSource: string; verdict: "cumple" | "parcial" | "contradice" | "no-hecho" };

export const EXTRA_DVH = {
  "psoe-listas-espera-2023": {
    partyId: "psoe",
    said: "Acabaremos con las listas de espera, estableciendo por ley unos tiempos máximos de espera en el SNS de 120 días para intervenciones quirúrgicas…",
    saidSource: "PSOE, programa 23-J 2023, p. 201 (y acuerdo de coalición 2023, p. 25)",
    did: "Ningún proyecto de ley con tiempos máximos en la XV legislatura. Espera media para operarse: 128 días (dic-2023) y 122 días (dic-2025).",
    didSource: "Congreso, proyectos de ley de la XV (datos abiertos) · Ministerio de Sanidad, SISLE dic-2025 (rectificado), p. 6",
    verdict: "no-hecho",
  },
  "sumar-muface-2023": {
    partyId: "sumar",
    said: "Integraremos a dicha población [MUFACE-MUGEJU-ISFAS], de forma paulatina, escalonada y programada, bajo la prestación sanitaria del sistema sanitario público.",
    saidSource: "Sumar, programa 23-J 2023, p. 92",
    did: "MUFACE firmó con Adeslas y Asisa el concierto de asistencia sanitaria del 1-5-2025 al 31-12-2027, de más de 4.800 millones.",
    didSource: "Ministerio para la Transformación Digital y de la Función Pública, nota de prensa 30-4-2025",
    verdict: "no-hecho",
  },
  "sumar-cie-2023": {
    partyId: "sumar",
    said: "Cierre de los Centros de Internamiento para Extranjeros (CIEs) en todo el territorio nacional.",
    saidSource: "Sumar, programa 23-J 2023, p. 105",
    did: "La Orden INT/63/2026 crea un nuevo CIE en Algeciras, que sustituye al anterior y a su anexo de Tarifa.",
    didSource: "BOE-A-2026-2827 (7-2-2026)",
    verdict: "no-hecho",
  },
  "sumar-regularizacion-2023": {
    partyId: "sumar",
    said: "Reforma de la LOEX […] que introduzca un procedimiento de regularización permanente.",
    saidSource: "Sumar, programa 23-J 2023, p. 104",
    did: "Sin reforma de la LOEX. El RD 316/2026 aprueba una regularización única (llegada antes del 1-1-2026, solicitudes hasta el 30-6-2026); la ILP de 2024 no llegó a votarse.",
    didSource: "BOE-A-2026-8284 · Congreso, expediente 120/000004",
    verdict: "parcial",
  },
} satisfies Record<string, ExtraDvh>;

export const extraRow = (id: keyof typeof EXTRA_DVH, topic: string, counts: string, cue: string): DvhRow => {
  const e = EXTRA_DVH[id];
  return { partyId: e.partyId, topic, verdict: VERDICT_LABEL[e.verdict], counts, cue };
};
