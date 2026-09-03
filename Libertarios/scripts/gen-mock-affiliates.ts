/**
 * Emits the synthetic-affiliate seed from the same repository the UI reads, so
 * the figures in the database match the mock figures exactly. Run:
 *   npm run seed:mock
 *
 * The SQL expands per-territory totals with `generate_series` instead of
 * shipping ~23.000 literal rows: the migration stays readable and the row
 * bodies (positions, timestamps) are derived deterministically in SQL.
 */
import { getEuropeSnapshot, getCountrySnapshot } from "@/lib/affiliates/repository";

export const SEED_BATCH = "mock-2026-09-01";

interface Target {
  country: string;
  region: string | null;
  count: number;
  growth: number;
  economic: number;
  social: number;
}

/*
 * Nota: desde que el repositorio lee de Supabase, este script genera SQL a
 * partir de lo que haya en la base, no del fichero de ejemplo. Cumplió su
 * función —producir la migración 0004— y se conserva por si hace falta volver
 * a sembrar; leer su salida antes de aplicarla.
 */
async function main() {
  const europe = await getEuropeSnapshot();
  const spain = (await getCountrySnapshot("ES"))!;

  const targets: Target[] = [
    // Spain is expanded per province so the province map has data.
    ...spain.regions
      .filter((r) => r.count > 0)
      .map((r) => ({
        country: "ES",
        region: r.code,
        count: r.count,
        growth: r.growth30d,
        economic: r.position.economic,
        social: r.position.social,
      })),
    // Every other country is a single national bucket.
    ...europe.countries
      .filter((c) => c.code !== "ES" && c.count > 0)
      .map((c) => ({
        country: c.code,
        region: null,
        count: c.count,
        growth: c.growth30d,
        economic: c.position.economic,
        social: c.position.social,
      })),
  ];

  const total = targets.reduce((a, t) => a + t.count, 0);
  const growth = targets.reduce((a, t) => a + t.growth, 0);

  const values = targets
    .map(
      (t) =>
        `    ('${t.country}', ${t.region === null ? "null" : `'${t.region}'`}, ` +
        `${t.count}, ${t.growth}, ${t.economic}, ${t.social})`,
    )
    .join(",\n");

  process.stdout.write(`-- GENERADO por scripts/gen-mock-affiliates.ts — no editar a mano.
  -- Regenerar con: npm run seed:mock
  --
  -- DATOS SINTÉTICOS. ${total.toLocaleString("es-ES")} simpatizantes ficticios
  -- (${growth.toLocaleString("es-ES")} en los últimos 30 días) repartidos por
  -- ${targets.length} territorios, con las mismas cifras que muestran los mocks
  -- de la aplicación.
  --
  -- Todo el lote lleva seed_batch = '${SEED_BATCH}'. Para eliminarlo:
  --     select public.purge_seed_batch('${SEED_BATCH}');

  -- Idempotente: reaplicar reemplaza el lote en lugar de duplicarlo.
  delete from public.affiliates where seed_batch = '${SEED_BATCH}';

  with targets (country_code, region_code, n, growth, econ, soc) as (
    values
  ${values}
  ),
  expanded as (
    select
      t.country_code,
      t.region_code,
      t.econ,
      t.soc,
      g.i,
      g.i <= t.growth as is_recent,
      -- Clave estable por fila: misma entrada, mismo resultado en cada ejecución.
      t.country_code || ':' || coalesce(t.region_code, '-') || ':' || g.i as k
    from targets t
    cross join generate_series(1, t.n) as g(i)
  ),
  rows as (
    select
      e.*,
      -- Ruido determinista en [0,1) a partir de la clave.
      (('x' || substr(md5(e.k || ':e'), 1, 8))::bit(32)::bigint & 2147483647) / 2147483647.0 as r_econ,
      (('x' || substr(md5(e.k || ':s'), 1, 8))::bit(32)::bigint & 2147483647) / 2147483647.0 as r_soc,
      (('x' || substr(md5(e.k || ':t'), 1, 8))::bit(32)::bigint & 2147483647) / 2147483647.0 as r_time
    from expanded e
  ),
  inserted as (
    insert into public.affiliates (email_hash, created_at, confirmed_at, seed_batch)
    select
      sha256(('seed:' || r.k)::bytea),
      -- Las altas "recientes" caen dentro de los últimos 30 días para que
      -- growth_30d reproduzca exactamente la cifra del mock; el resto se
      -- reparte sobre los 18 meses anteriores.
      case when r.is_recent
           then now() - (r.r_time * 29 || ' days')::interval
           else now() - interval '30 days' - (r.r_time * 540 || ' days')::interval
      end,
      now() - interval '1 day',
      '${SEED_BATCH}'
    from rows r
    returning id, email_hash
  )
  insert into public.affiliate_profiles
    (affiliate_id, country_code, region_code, economic, social, method)
  select
    i.id,
    r.country_code,
    r.region_code,
    greatest(-100, least(100, round(r.econ + (r.r_econ - 0.5) * 40)))::smallint,
    greatest(-100, least(100, round(r.soc  + (r.r_soc  - 0.5) * 40)))::smallint,
    case when r.r_time < 0.75 then 'test' else 'manual' end
  from rows r
  join inserted i on i.email_hash = sha256(('seed:' || r.k)::bytea);

  select public.refresh_affiliate_stats();
  `);
}

main();
