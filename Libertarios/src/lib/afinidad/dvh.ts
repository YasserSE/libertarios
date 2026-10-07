import type { SaidVsDid } from "@/data/afinidad/types";

/**
 * Utilidades puras de «Dijeron vs. hicieron»: orden, recuentos, filtros y
 * enlaces. Sin React, para que las usen igual la tarjeta del resultado, la
 * página propia, la ficha de partido y la imagen OG.
 *
 * Nada de aquí puntúa ni ordena partidos: solo ordena entradas por fecha.
 */

export type DvhVerdict = SaidVsDid["verdict"];
/** Orden fijo de las etiquetas en recuentos y filtros (el del tipo). */
export const DVH_VERDICTS: readonly DvhVerdict[] = ["cumple", "contradice", "parcial", "no-hecho"];

/** Ruta de la página propia, sin idioma. */
export const DVH_PATH = "/a-quien-votar/dijeron-vs-hicieron";

/** Parámetros de la URL de la página propia (para enlazar con un filtro puesto). */
export const DVH_PARAMS = { party: "partido", verdict: "etiqueta", topic: "tema" } as const;

/** Entradas por partido en la tarjeta del resultado; el resto, en la ficha. */
export const DVH_CARD_MAX = 3;

/** Ancla de una entrada en la ficha de partido (y en la página propia). */
export const dvhAnchor = (id: string) => `dvh-${id}`;

/** Enlace a una entrada dentro de la ficha de su partido. */
export const dvhPartyHref = (locale: string, e: Pick<SaidVsDid, "id" | "partyId">) =>
  `/${locale}/a-quien-votar/partidos/${e.partyId}#${dvhAnchor(e.id)}`;

/**
 * Más reciente primero, por la fecha de lo que dijeron; a igual fecha, por id
 * para que el orden no dependa del orden de los ficheros. Un criterio
 * mecánico a propósito: elegir «las más llamativas» sería opinar.
 */
export function sortByDate(entries: readonly SaidVsDid[]): SaidVsDid[] {
  return [...entries].sort((a, b) => b.said.date.localeCompare(a.said.date) || a.id.localeCompare(b.id));
}

export function entriesForParty(entries: readonly SaidVsDid[] | undefined, partyId: string): SaidVsDid[] {
  return sortByDate((entries ?? []).filter((e) => e.partyId === partyId));
}

export type DvhCounts = Record<DvhVerdict, number> & { total: number };

/** Recuento por etiqueta; siempre con todas las claves, aunque sean 0. */
export function countVerdicts(entries: readonly SaidVsDid[]): DvhCounts {
  const out: DvhCounts = { cumple: 0, contradice: 0, parcial: 0, "no-hecho": 0, total: 0 };
  for (const e of entries) {
    out[e.verdict] += 1;
    out.total += 1;
  }
  return out;
}

export interface DvhFilter {
  party?: string;
  verdict?: DvhVerdict;
  topic?: string;
}

/** Filtra y ordena por fecha. Un filtro vacío no filtra. */
export function filterEntries(entries: readonly SaidVsDid[], f: DvhFilter): SaidVsDid[] {
  return sortByDate(
    entries.filter(
      (e) =>
        (!f.party || e.partyId === f.party) &&
        (!f.verdict || e.verdict === f.verdict) &&
        (!f.topic || e.topic === f.topic),
    ),
  );
}

/** Temas presentes, sin repetir, en orden alfabético. */
export function topicsOf(entries: readonly SaidVsDid[]): string[] {
  return Array.from(new Set(entries.map((e) => e.topic))).sort((a, b) => a.localeCompare(b, "es"));
}

export const isDvhVerdict = (v: unknown): v is DvhVerdict =>
  typeof v === "string" && (DVH_VERDICTS as readonly string[]).includes(v);

/** Recorta un texto por palabras para la imagen OG, sin partir palabras. */
export function snippet(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const at = cut.lastIndexOf(" ");
  return `${(at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,.;:]+$/, "")}…`;
}

/** Enlace a la página propia filtrada por un partido. */
export const dvhPartyFilterHref = (locale: string, partyId: string) =>
  `/${locale}${DVH_PATH}?${DVH_PARAMS.party}=${encodeURIComponent(partyId)}`;

/** Enlace para compartir una entrada: la ficha con `?dvh=` (imagen OG propia) y el ancla. */
export const dvhShareHref = (locale: string, e: Pick<SaidVsDid, "id" | "partyId">) =>
  `/${locale}/a-quien-votar/partidos/${e.partyId}?dvh=${encodeURIComponent(e.id)}#${dvhAnchor(e.id)}`;

/** Imagen OG de una entrada. */
export const dvhOgHref = (locale: string, id: string) =>
  `/api/og/afinidad?dvh=${encodeURIComponent(id)}&l=${encodeURIComponent(locale)}`;
