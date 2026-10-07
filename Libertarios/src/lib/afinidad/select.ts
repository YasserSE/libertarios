import type { Party } from "@/data/afinidad/types";

/**
 * Qué partidos se enseñan en el resultado.
 *
 * Un partido con `regions` solo se presenta en esas comunidades: enseñárselo a
 * quien vota en otra sería ofrecerle una papeleta que no tiene. Los estatales
 * salen siempre. Con «ver todos» salen todos, y el JSON abierto los lleva
 * siempre, para que nadie pueda decir que se esconde a un partido.
 */

/** Regional = se presenta solo en algunas CCAA. */
export function isRegional(p: Party): boolean {
  return Array.isArray(p.regions) && p.regions.length > 0;
}

export interface SelectOptions {
  /** «Ver todos»: ignora la comunidad. */
  showAll?: boolean;
  /**
   * Partidos que se muestran pase lo que pase; típicamente el voto habitual
   * declarado, para poder compararlo aunque la persona no diera su comunidad.
   */
  include?: readonly string[];
}

/**
 * Partidos visibles para una comunidad (código INE) o sin ella. Sin comunidad
 * declarada no se adivina: se muestran solo los estatales y el botón «ver
 * todos» da acceso al resto. Conserva el orden de entrada.
 */
export function visibleParties(
  parties: readonly Party[],
  region?: string | null,
  opts: SelectOptions = {},
): Party[] {
  if (opts.showAll) return [...parties];
  const forced = new Set(opts.include ?? []);
  return parties.filter(
    (p) => !isRegional(p) || forced.has(p.id) || (!!region && p.regions!.includes(region)),
  );
}

/** Ids visibles, listos para `computeAffinity(…, partyIds)`. */
export function visiblePartyIds(
  parties: readonly Party[],
  region?: string | null,
  opts: SelectOptions = {},
): string[] {
  return visibleParties(parties, region, opts).map((p) => p.id);
}

/** Cuántos quedan ocultos, para el texto del botón «ver todos (n más)». */
export function hiddenCount(parties: readonly Party[], region?: string | null, opts: SelectOptions = {}): number {
  return parties.length - visibleParties(parties, region, { ...opts, showAll: false }).length;
}
