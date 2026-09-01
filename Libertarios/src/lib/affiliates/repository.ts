import { EUROPE_COUNTRIES, getCountryByCode } from "@/data/geo/europe-countries";
import { SPAIN_PROVINCES } from "@/data/geo/spain-provinces";
import {
  COUNTRY_COUNTS,
  MOCK_UPDATED_AT,
  SPAIN_PROVINCE_COUNTS,
} from "@/data/mock/affiliate-counts";
import type {
  AffiliateSnapshot,
  CountrySnapshot,
  CountryStats,
  QuadrantPosition,
  RegionStats,
} from "./types";

/**
 * Read model for affiliate aggregates.
 *
 * Everything the maps render goes through here. The current implementation is
 * synchronous and mock-backed; the functions are shaped so they can become
 * `async` fetches against the schema in `docs/DATABASE.md` without any caller
 * having to change how it reads the data.
 */

/**
 * Deterministic 32-bit hash. Used to derive stable secondary figures (growth,
 * mean quadrant position) from a code, so server and client render identically
 * and no hydration mismatch is possible. A real backend stores these columns.
 */
function hash(code: string): number {
  let h = 2166136261;
  for (let i = 0; i < code.length; i++) {
    h ^= code.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

/** Mean quadrant position, libertarian-leaning with per-territory spread. */
function derivePosition(code: string): QuadrantPosition {
  const a = hash(code);
  const b = hash(`${code}:social`);
  return {
    economic: Math.round(34 + a * 38),
    social: Math.round(22 + b * 42),
  };
}

/** Registrations in the trailing 30 days: 3–9% of the standing total. */
function deriveGrowth(code: string, count: number): number {
  return Math.max(1, Math.round(count * (0.03 + hash(`${code}:growth`) * 0.06)));
}

const SPAIN_TOTAL = Object.values(SPAIN_PROVINCE_COUNTS).reduce((a, b) => a + b, 0);

/** Count-weighted mean of a set of quadrant positions. */
function meanPosition(rows: { count: number; position: QuadrantPosition }[]): QuadrantPosition {
  const total = rows.reduce((a, r) => a + r.count, 0);
  if (total === 0) return { economic: 0, social: 0 };
  const economic = rows.reduce((a, r) => a + r.position.economic * r.count, 0) / total;
  const social = rows.reduce((a, r) => a + r.position.social * r.count, 0) / total;
  return { economic: Math.round(economic), social: Math.round(social) };
}

function buildSpainRegions(): RegionStats[] {
  return SPAIN_PROVINCES.map((meta) => {
    const count = SPAIN_PROVINCE_COUNTS[meta.code] ?? 0;
    return {
      code: meta.code,
      meta,
      count,
      growth30d: count > 0 ? deriveGrowth(meta.code, count) : 0,
      position: derivePosition(`ES-${meta.code}`),
      share: SPAIN_TOTAL > 0 ? count / SPAIN_TOTAL : 0,
    };
  }).sort((a, b) => b.count - a.count);
}

// Regions are built first: a country that has them is the sum of its parts, and
// deriving its totals any other way is how the mock ends up contradicting
// itself (and the database, where the aggregate can only ever be the sum).
const REGIONS_BY_COUNTRY: Record<string, RegionStats[]> = {
  ES: buildSpainRegions(),
};

function buildCountries(): CountryStats[] {
  return EUROPE_COUNTRIES.map((meta) => {
    const regions = REGIONS_BY_COUNTRY[meta.code];

    const count = regions
      ? regions.reduce((a, r) => a + r.count, 0)
      : (COUNTRY_COUNTS[meta.code] ?? 0);
    const growth30d = regions
      ? regions.reduce((a, r) => a + r.growth30d, 0)
      : count > 0
        ? deriveGrowth(meta.code, count)
        : 0;
    const position = regions ? meanPosition(regions) : derivePosition(meta.code);

    return {
      code: meta.code,
      meta,
      count,
      growth30d,
      position,
      // Kept at one decimal: see formatPerMillion for why integers lie here.
      perMillion: count > 0 ? Math.round((count / meta.populationM) * 10) / 10 : 0,
    };
  }).sort((a, b) => b.count - a.count);
}

const COUNTRIES = buildCountries();
const COUNTRY_INDEX = new Map(COUNTRIES.map((c, i) => [c.code, { stats: c, rank: i + 1 }]));

/** Europe-wide aggregate: every country with at least one affiliate. */
export function getEuropeSnapshot(): AffiliateSnapshot {
  const active = COUNTRIES.filter((c) => c.count > 0);
  return {
    updatedAt: MOCK_UPDATED_AT,
    total: active.reduce((a, c) => a + c.count, 0),
    growth30d: active.reduce((a, c) => a + c.growth30d, 0),
    countries: COUNTRIES,
    position: meanPosition(active),
  };
}

/** One country plus its subdivisions, or undefined for an unknown code. */
export function getCountrySnapshot(code: string): CountrySnapshot | undefined {
  const entry = COUNTRY_INDEX.get(code.toUpperCase());
  if (!entry) return undefined;
  return {
    ...entry.stats,
    rank: entry.rank,
    regions: REGIONS_BY_COUNTRY[entry.stats.code] ?? [],
  };
}

export function getCountrySnapshotBySlug(slug: string): CountrySnapshot | undefined {
  const meta = EUROPE_COUNTRIES.find((c) => c.slug === slug.toLowerCase());
  return meta ? getCountrySnapshot(meta.code) : undefined;
}

/** Countries with affiliates, ranked by absolute count. */
export function getRankedCountries(): CountryStats[] {
  return COUNTRIES.filter((c) => c.count > 0);
}

export { getCountryByCode };
