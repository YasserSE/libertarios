-- Ajusta el alta al formulario real y la deja lista para recibir registros.
--
-- El formulario recoge una franja de edad, no una fecha, así que guardar un
-- `birth_year` inventado a partir de ella sería fabricar precisión que no
-- existe. Se guarda la franja tal cual.
--
-- No se persiste la orientación sexual aunque el formulario la pregunte: es
-- categoría especial del art. 9 del RGPD y no tiene ningún uso en lo que este
-- proyecto publica. Recoger datos que no se usan es riesgo sin contrapartida.

alter table public.affiliate_profiles
  add column if not exists age_range text;

comment on column public.affiliate_profiles.age_range is
  'Franja declarada (18-24, 25-34, …). Menos identificable que una fecha de nacimiento.';

-- Alta de simpatizante. Sustituye a la versión anterior añadiendo la franja de
-- edad y el consentimiento explícito, que para datos de opinión política (art.
-- 9 RGPD) tiene que ser afirmativo y verificable.
create or replace function public.register_affiliate(
  p_email_hash  bytea,
  p_country     char(2),
  p_economic    smallint,
  p_social      smallint,
  p_method      text,
  p_consent     boolean,
  p_region      text     default null,
  p_age_range   text     default null,
  p_gender      text     default null
)
returns void
language plpgsql
security definer
set search_path = public
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

  -- Alta o reactivación. `confirmed_at` se fija aquí porque todavía no hay
  -- proveedor de correo: es opt-in simple con casilla explícita. Cuando se
  -- conecte el envío de email, quitar esta línea y confirmar desde el enlace.
  insert into public.affiliates (email_hash, confirmed_at)
  values (p_email_hash, now())
  on conflict (email_hash) do update
    set deleted_at = null,
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

-- La firma cambió, así que la anterior queda huérfana: se retira para que no
-- exista una vía de alta sin comprobación de consentimiento.
drop function if exists public.register_affiliate(bytea, char, smallint, smallint, text, text, smallint, text);

revoke all on function public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text) from public;
grant execute on function public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text) to anon, authenticated;
