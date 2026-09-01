-- GENERADO por scripts/gen-mock-affiliates.ts — no editar a mano.
-- Regenerar con: npm run seed:mock
--
-- DATOS SINTÉTICOS. 3843 simpatizantes ficticios
-- (223 en los últimos 30 días) repartidos por
-- 79 territorios, con las mismas cifras que muestran los mocks
-- de la aplicación.
--
-- Todo el lote lleva seed_batch = 'mock-2026-09-01'. Para eliminarlo:
--     select public.purge_seed_batch('mock-2026-09-01');

-- Idempotente: reaplicar reemplaza el lote en lugar de duplicarlo.
delete from public.affiliates where seed_batch = 'mock-2026-09-01';

with targets (country_code, region_code, n, growth, econ, soc) as (
  values
    ('ES', '28', 520, 19, 49, 23),
    ('ES', '08', 360, 14, 68, 22),
    ('ES', '46', 190, 15, 50, 46),
    ('ES', '41', 125, 11, 49, 47),
    ('ES', '03', 112, 9, 67, 61),
    ('ES', '29', 110, 7, 49, 43),
    ('ES', '30', 78, 6, 51, 38),
    ('ES', '50', 72, 3, 50, 37),
    ('ES', '07', 66, 4, 67, 52),
    ('ES', '35', 56, 2, 50, 52),
    ('ES', '48', 54, 3, 48, 31),
    ('ES', '38', 49, 4, 50, 23),
    ('ES', '33', 45, 2, 51, 50),
    ('ES', '15', 43, 2, 48, 25),
    ('ES', '11', 42, 2, 49, 35),
    ('ES', '36', 35, 2, 50, 35),
    ('ES', '18', 34, 3, 50, 62),
    ('ES', '43', 32, 2, 50, 31),
    ('ES', '17', 29, 2, 48, 61),
    ('ES', '14', 28, 2, 48, 29),
    ('ES', '31', 27, 1, 51, 64),
    ('ES', '12', 26, 2, 49, 42),
    ('ES', '04', 25, 1, 66, 46),
    ('ES', '47', 24, 1, 50, 39),
    ('ES', '39', 23, 1, 49, 43),
    ('ES', '20', 22, 1, 50, 27),
    ('ES', '45', 22, 1, 50, 35),
    ('ES', '06', 20, 1, 67, 48),
    ('ES', '23', 18, 1, 50, 53),
    ('ES', '21', 17, 1, 50, 60),
    ('ES', '24', 16, 1, 50, 34),
    ('ES', '37', 16, 1, 50, 23),
    ('ES', '13', 15, 1, 48, 42),
    ('ES', '09', 14, 1, 68, 33),
    ('ES', '25', 14, 1, 51, 63),
    ('ES', '26', 14, 1, 50, 46),
    ('ES', '02', 13, 1, 67, 59),
    ('ES', '10', 12, 1, 49, 46),
    ('ES', '01', 11, 1, 67, 28),
    ('ES', '27', 10, 1, 50, 43),
    ('ES', '19', 9, 1, 50, 34),
    ('ES', '32', 9, 1, 51, 43),
    ('ES', '22', 8, 1, 50, 27),
    ('ES', '40', 6, 1, 49, 49),
    ('ES', '49', 6, 1, 48, 62),
    ('ES', '05', 5, 1, 67, 38),
    ('ES', '16', 5, 1, 48, 35),
    ('ES', '34', 5, 1, 50, 51),
    ('PT', null, 210, 9, 43, 49),
    ('IT', null, 165, 11, 49, 47),
    ('FR', null, 148, 11, 52, 55),
    ('DE', null, 132, 5, 43, 30),
    ('GB', null, 118, 5, 48, 55),
    ('NL', null, 78, 6, 44, 49),
    ('PL', null, 62, 3, 39, 30),
    ('BE', null, 52, 3, 38, 39),
    ('CH', null, 48, 2, 53, 62),
    ('IE', null, 41, 3, 47, 46),
    ('AT', null, 36, 2, 42, 56),
    ('SE', null, 32, 1, 48, 38),
    ('CZ', null, 29, 1, 50, 46),
    ('RO', null, 25, 1, 53, 31),
    ('GR', null, 22, 1, 50, 36),
    ('DK', null, 20, 1, 43, 64),
    ('NO', null, 18, 1, 44, 60),
    ('FI', null, 15, 1, 52, 64),
    ('HU', null, 14, 1, 50, 33),
    ('BG', null, 12, 1, 38, 38),
    ('HR', null, 10, 1, 50, 61),
    ('SK', null, 9, 1, 48, 42),
    ('LT', null, 8, 1, 53, 60),
    ('SI', null, 8, 1, 48, 49),
    ('EE', null, 7, 1, 38, 55),
    ('LV', null, 6, 1, 52, 63),
    ('LU', null, 6, 1, 52, 33),
    ('AD', null, 5, 1, 40, 45),
    ('CY', null, 5, 1, 51, 28),
    ('MT', null, 5, 1, 42, 27),
    ('RS', null, 5, 1, 50, 32)
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
    'mock-2026-09-01'
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
