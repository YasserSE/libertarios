import { EUROPE_COUNTRIES, getCountryByCode } from "@/data/geo/europe-countries";
import { SPAIN_PROVINCES } from "@/data/geo/spain-provinces";
import { loadAffiliateSource, positionFor, type AffiliateSource } from "./source";
import type {
  AffiliateSnapshot,
  CountrySnapshot,
  CountryStats,
  QuadrantPosition,
  RegionStats,
} from "./types";

/**
 * Modelo de lectura de los agregados.
 *
 * Todo lo que pintan los mapas pasa por aquí. La fuente está detrás de
 * `loadAffiliateSource`, que lee las vistas agregadas de Supabase y se cae al
 * fichero de ejemplo si no hay credenciales o la base no responde.
 *
 * La regla que sostiene la coherencia del conjunto: **un país que tiene
 * subdivisiones es la suma de sus partes**. Derivar el total del país por otra
 * vía es exactamente como el mapa acaba contradiciéndose a sí mismo, y ya pasó
 * una vez: España mostraba un crecimiento en la portada y otro distinto en su
 * propia página. Con k-anonimidad importa todavía más, porque las provincias
 * por debajo del mínimo salen a cero y el total del país tiene que reflejar esa
 * misma supresión, no esquivarla.
 */

/** Media de posiciones ponderada por número de registros. */
function meanPosition(rows: { count: number; position: QuadrantPosition }[]): QuadrantPosition {
  const total = rows.reduce((a, r) => a + r.count, 0);
  if (total === 0) return { economic: 0, social: 0 };
  const economic = rows.reduce((a, r) => a + r.position.economic * r.count, 0) / total;
  const social = rows.reduce((a, r) => a + r.position.social * r.count, 0) / total;
  return { economic: Math.round(economic), social: Math.round(social) };
}

function buildSpainRegions(source: AffiliateSource): RegionStats[] {
  const total = Object.values(source.spainRegions).reduce((a, r) => a + r.count, 0);
  return SPAIN_PROVINCES.map((meta) => {
    const row = source.spainRegions[meta.code];
    const count = row?.count ?? 0;
    return {
      code: meta.code,
      meta,
      count,
      growth30d: row?.growth30d ?? 0,
      position: positionFor(`ES-${meta.code}`, row),
      share: total > 0 ? count / total : 0,
    };
  }).sort((a, b) => b.count - a.count);
}

function buildCountries(source: AffiliateSource, spain: RegionStats[]): CountryStats[] {
  const regionsByCountry: Record<string, RegionStats[]> = { ES: spain };

  return EUROPE_COUNTRIES.map((meta) => {
    const regions = regionsByCountry[meta.code];
    const row = source.countries[meta.code];

    const count = regions ? regions.reduce((a, r) => a + r.count, 0) : (row?.count ?? 0);
    const growth30d = regions
      ? regions.reduce((a, r) => a + r.growth30d, 0)
      : (row?.growth30d ?? 0);
    const position = regions
      ? meanPosition(regions.filter((r) => r.count > 0))
      : positionFor(meta.code, row);

    return {
      code: meta.code,
      meta,
      count,
      growth30d,
      position,
      // Con un decimal: ver formatPerMillion para por qué el entero miente aquí.
      perMillion: count > 0 ? Math.round((count / meta.populationM) * 10) / 10 : 0,
    };
  }).sort((a, b) => b.count - a.count);
}

interface Model {
  source: AffiliateSource;
  countries: CountryStats[];
  index: Map<string, { stats: CountryStats; rank: number }>;
  regionsByCountry: Record<string, RegionStats[]>;
}

async function buildModel(): Promise<Model> {
  const source = await loadAffiliateSource();
  const spain = buildSpainRegions(source);
  const countries = buildCountries(source, spain);
  return {
    source,
    countries,
    index: new Map(countries.map((c, i) => [c.code, { stats: c, rank: i + 1 }])),
    regionsByCountry: { ES: spain },
  };
}

/** Agregado de toda Europa: cada país con al menos un registro. */
export async function getEuropeSnapshot(): Promise<AffiliateSnapshot> {
  const model = await buildModel();
  const active = model.countries.filter((c) => c.count > 0);
  return {
    updatedAt: model.source.updatedAt,
    total: active.reduce((a, c) => a + c.count, 0),
    growth30d: active.reduce((a, c) => a + c.growth30d, 0),
    countries: model.countries,
    position: meanPosition(active),
  };
}

/** Un país con sus subdivisiones, o `undefined` si el código no existe. */
export async function getCountrySnapshot(code: string): Promise<CountrySnapshot | undefined> {
  const model = await buildModel();
  const entry = model.index.get(code.toUpperCase());
  if (!entry) return undefined;
  return {
    ...entry.stats,
    rank: entry.rank,
    regions: model.regionsByCountry[entry.stats.code] ?? [],
  };
}

export async function getCountrySnapshotBySlug(slug: string): Promise<CountrySnapshot | undefined> {
  const meta = EUROPE_COUNTRIES.find((c) => c.slug === slug.toLowerCase());
  return meta ? getCountrySnapshot(meta.code) : undefined;
}

/** Países con registros, ordenados por número absoluto. */
export async function getRankedCountries(): Promise<CountryStats[]> {
  const model = await buildModel();
  return model.countries.filter((c) => c.count > 0);
}

export { getCountryByCode };
