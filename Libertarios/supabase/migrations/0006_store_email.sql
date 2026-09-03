-- Guardar la dirección de correo, no solo su hash.
--
-- Hasta aquí el diseño era deliberadamente irreversible: `email_hash` es
-- SHA-256(pepper + correo) y no hay forma de volver atrás. Servía para
-- deduplicar sin poder identificar a nadie, y era lo que sostenía la promesa
-- de anonimato del sitio.
--
-- El proyecto necesita poder escribir a quien se registra, así que la dirección
-- pasa a guardarse. Eso cambia la naturaleza del dato: deja de ser un recuento
-- anónimo y pasa a ser un fichero de datos personales. Consecuencias que van
-- con este cambio y no son opcionales:
--
--   * El texto del formulario y la política de privacidad tienen que decirlo.
--     Guardar un correo sin declararlo no es un descuido de estilo, es un
--     incumplimiento del RGPD.
--   * `email_hash` se conserva. Sigue siendo la clave única —es lo que impide
--     el registro doble— y permite seguir contando sin leer direcciones.
--   * La columna queda fuera de todo lo que se publica: las vistas agregadas
--     no la tocan y las tablas base siguen sin políticas RLS, así que la clave
--     anónima no puede leerla. Solo llega por `service_role`.

alter table public.affiliates
  add column if not exists email text;

comment on column public.affiliates.email is
  'Dirección de correo en claro, para comunicaciones. Dato personal: nunca sale en vistas agregadas ni es legible con la clave anónima.';

-- La función recibe ahora la dirección. Se mantiene el hash como clave de
-- conflicto para no romper la deduplicación de quien ya estaba registrado.
create or replace function public.register_affiliate(
  p_email_hash  bytea,
  p_country     char(2),
  p_economic    smallint,
  p_social      smallint,
  p_method      text,
  p_consent     boolean,
  p_region      text default null,
  p_age_range   text default null,
  p_gender      text default null,
  p_email       text default null
)
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_id uuid;
begin
  if p_consent is not true then
    raise exception 'Se requiere consentimiento explícito para registrar la posición política';
  end if;

  if p_method not in ('test', 'manual') then
    raise exception 'Método de posicionamiento no válido';
  end if;

  insert into public.affiliates (email_hash, email, confirmed_at)
  values (p_email_hash, p_email, now())
  on conflict (email_hash) do update
    set deleted_at   = null,
        -- Si vuelve a registrarse, se refresca la dirección; y si esta vez no
        -- llega ninguna, se conserva la que hubiera.
        email        = coalesce(excluded.email, public.affiliates.email),
        confirmed_at = coalesce(public.affiliates.confirmed_at, now())
  returning id into v_id;

  insert into public.affiliate_profiles as ap
    (affiliate_id, country_code, region_code, economic, social, method, age_range, gender)
  values
    (v_id, p_country, p_region, p_economic, p_social, p_method, p_age_range, p_gender)
  on conflict (affiliate_id) do update set
    country_code = excluded.country_code,
    region_code  = excluded.region_code,
    economic     = excluded.economic,
    social       = excluded.social,
    method       = excluded.method,
    age_range    = excluded.age_range,
    gender       = excluded.gender,
    updated_at   = now();
end;
$$;

drop function if exists public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text);

revoke all on function public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text, text) from public;
grant execute on function public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text, text) to anon, authenticated;

-- Las vistas agregadas son materializadas, así que un registro nuevo no aparece
-- en el mapa hasta que se refrescan. `anon` no puede refrescarlas —y no debe—,
-- y `refresh materialized view concurrently` no puede correr dentro de una
-- transacción, así que tampoco vale hacerlo dentro de `register_affiliate`.
-- Queda un cron cada cinco minutos.
create extension if not exists pg_cron with schema extensions;

select cron.unschedule('refresh-affiliate-stats')
where exists (select 1 from cron.job where jobname = 'refresh-affiliate-stats');

select cron.schedule(
  'refresh-affiliate-stats',
  '*/5 * * * *',
  $$select public.refresh_affiliate_stats();$$
);
