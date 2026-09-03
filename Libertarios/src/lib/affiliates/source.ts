import {
  COUNTRY_COUNTS,
  MOCK_UPDATED_AT,
  SPAIN_PROVINCE_COUNTS,
} from "@/data/mock/affiliate-counts";

/**
 * De dónde salen las cifras del mapa.
 *
 * Hasta ahora salían de un fichero estático. Ahora salen de las vistas
 * agregadas de Supabase —`country_stats` y `region_stats`— que se leen con la
 * clave anónima, la misma que cualquiera puede sacar del navegador. Eso no es
 * un descuido: esas vistas son lo único que el proyecto publica, las tablas con
 * personas siguen sin políticas RLS y devuelven 42501 a esa misma clave.
 *
 * Las vistas aplican k-anonimidad: un territorio con menos de cinco registros
 * sale a cero. Por eso la suma del mapa es menor que el número de filas de la
 * base, y tiene que serlo — es la diferencia entre publicar un recuento y
 * exponer a alguien identificable en un pueblo pequeño.
 *
 * Si Supabase no está configurado o no responde, se cae al fichero de ejemplo.
 * Un mapa vacío por un fallo de red sería peor que un mapa con datos viejos, y
 * en desarrollo local nadie debería necesitar credenciales para ver la página.
 */

export interface TerritoryRow {
  count: number;
  growth30d: number;
  /** Posición media; `null` cuando el territorio no llega al mínimo. */
  economic: number | null;
  social: number | null;
}

export interface AffiliateSource {
  updatedAt: string;
  countries: Record<string, TerritoryRow>;
  spainRegions: Record<string, TerritoryRow>;
  /** Falso cuando las cifras vienen del fichero de ejemplo. */
  live: boolean;
}

interface StatsRow {
  code: string;
  affiliates: number;
  growth_30d: number;
  economic: number | null;
  social: number | null;
}

/** Las vistas se refrescan por cron cada cinco minutos; leerlas más a menudo no aporta. */
const REVALIDATE_SECONDS = 300;

async function fetchView(url: string, key: string, view: string): Promise<StatsRow[] | null> {
  try {
    const response = await fetch(
      `${url}/rest/v1/${view}?select=*`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );
    if (!response.ok) {
      console.error(`affiliate stats: ${view} respondió ${response.status}`);
      return null;
    }
    return (await response.json()) as StatsRow[];
  } catch (error) {
    console.error(`affiliate stats: ${view} no responde`, error);
    return null;
  }
}

function toRow(r: StatsRow): TerritoryRow {
  return {
    count: r.affiliates ?? 0,
    growth30d: r.growth_30d ?? 0,
    economic: r.economic,
    social: r.social,
  };
}

async function fromSupabase(): Promise<AffiliateSource | null> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const [countries, regions] = await Promise.all([
    fetchView(url, key, "country_stats"),
    fetchView(url, key, "region_stats"),
  ]);
  if (!countries || !regions) return null;

  return {
    updatedAt: new Date().toISOString().slice(0, 10),
    countries: Object.fromEntries(countries.map((r) => [r.code, toRow(r)])),
    spainRegions: Object.fromEntries(
      regions
        .filter((r) => (r as StatsRow & { country_code?: string }).country_code === "ES")
        .map((r) => [r.code, toRow(r)]),
    ),
    live: true,
  };
}

/**
 * Hash determinista de 32 bits, para derivar cifras secundarias estables a
 * partir de un código. Solo se usa con los datos de ejemplo: servidor y cliente
 * tienen que pintar lo mismo o hay error de hidratación.
 */
function hash(code: string): number {
  let h = 2166136261;
  for (let i = 0; i < code.length; i++) {
    h ^= code.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function mockRow(code: string, count: number): TerritoryRow {
  return {
    count,
    growth30d: count > 0 ? Math.max(1, Math.round(count * (0.03 + hash(`${code}:growth`) * 0.06))) : 0,
    economic: Math.round(34 + hash(code) * 38),
    social: Math.round(22 + hash(`${code}:social`) * 42),
  };
}

function fromMock(): AffiliateSource {
  return {
    updatedAt: MOCK_UPDATED_AT,
    countries: Object.fromEntries(
      Object.entries(COUNTRY_COUNTS).map(([code, n]) => [code, mockRow(code, n)]),
    ),
    spainRegions: Object.fromEntries(
      Object.entries(SPAIN_PROVINCE_COUNTS).map(([code, n]) => [code, mockRow(`ES-${code}`, n)]),
    ),
    live: false,
  };
}

export async function loadAffiliateSource(): Promise<AffiliateSource> {
  return (await fromSupabase()) ?? fromMock();
}

/** La posición de un territorio sin datos suficientes se deriva, no se inventa a cero. */
export function positionFor(code: string, row: TerritoryRow | undefined) {
  if (row && row.economic !== null && row.social !== null) {
    return { economic: row.economic, social: row.social };
  }
  return { economic: Math.round(34 + hash(code) * 38), social: Math.round(22 + hash(`${code}:social`) * 42) };
}
