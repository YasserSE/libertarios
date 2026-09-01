/**
 * Domain types for the affiliate (simpatizante) data layer.
 *
 * These shapes intentionally mirror what a real API / database query would
 * return, so swapping the mock repository for a live one is a one-file change.
 * See `docs/DATABASE.md` for the corresponding relational schema.
 */

/** ISO 3166-1 alpha-2, uppercase. e.g. "ES", "FR". */
export type CountryCode = string;

/** Slug used in URLs: /pais/<slug>. e.g. "espana", "francia". */
export type CountrySlug = string;

export interface CountryMeta {
  code: CountryCode;
  /** ISO 3166-1 alpha-3, matches most TopoJSON `properties.iso_a3`. */
  alpha3: string;
  /** ISO 3166-1 numeric, matches world-atlas TopoJSON `geo.id`. */
  numeric: string;
  /** Display name in Spanish. */
  name: string;
  /** Name as it appears in the world-atlas TopoJSON, for fallback matching. */
  geoName: string;
  slug: CountrySlug;
  flag: string;
  /** Population in millions, for per-capita normalisation. */
  populationM: number;
  /** True when we ship a subdivision (province/region) map for this country. */
  hasRegionMap: boolean;
}

export interface RegionMeta {
  /** Stable subdivision code. For Spain: the 2-digit INE province code. */
  code: string;
  name: string;
  country: CountryCode;
  /** Parent grouping — for Spain, the autonomous community. */
  parent: string;
}

/** A point on the political quadrant. Both axes run -100 (state) .. +100 (liberty). */
export interface QuadrantPosition {
  economic: number;
  social: number;
}

export interface AffiliateCount {
  /** Country code, or subdivision code when `level` is "region". */
  code: string;
  count: number;
  /** New affiliates in the last 30 days. */
  growth30d: number;
  /** Mean quadrant position of the affiliates counted here. */
  position: QuadrantPosition;
}

export interface CountryStats extends AffiliateCount {
  meta: CountryMeta;
  /** Affiliates per million inhabitants — comparable across country sizes. */
  perMillion: number;
}

export interface RegionStats extends AffiliateCount {
  meta: RegionMeta;
  /** Share of the parent country's total, 0..1. */
  share: number;
}

export interface AffiliateSnapshot {
  /** ISO timestamp of when these figures were computed. */
  updatedAt: string;
  total: number;
  growth30d: number;
  countries: CountryStats[];
  /** Mean quadrant position across every affiliate in the snapshot. */
  position: QuadrantPosition;
}

export interface CountrySnapshot extends CountryStats {
  /** Empty when the country has no subdivision map. */
  regions: RegionStats[];
  /** Rank by absolute count among all countries, 1-based. */
  rank: number;
}
