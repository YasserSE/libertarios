-- Volver a ver el resultado: un identificador propio por registro.
--
-- Hasta aquí el resultado del test vivía solo en la memoria de la pestaña. Si
-- la persona cerraba, cambiaba de móvil o borraba el historial, su posición se
-- perdía aunque estuviera guardada en la base: no había ninguna forma de pedir
-- «enséñame lo mío».
--
-- Lo obvio sería un formulario de «recupera tu resultado con tu correo». No se
-- hace, y no por comodidad: la posición política es categoría especial del art.
-- 9 del RGPD, y una consulta por correo sin verificar convierte el sitio en un
-- buscador donde cualquiera teclea la dirección de un conocido y lee su
-- ideología. Mientras no haya proveedor de correo con el que verificar la
-- dirección (enlace mágico), la recuperación va por capacidad: un token
-- aleatorio que solo tiene quien se registró.
--
--   * Es aleatorio, no derivado del correo. Así no se puede ir de un token a
--     una dirección, ni de una dirección a un token.
--   * Es único y revocable: basta un `update` para invalidar un enlace filtrado
--     sin tocar el resto del registro.
--   * Se conserva entre altas repetidas, para que un enlace guardado hace meses
--     siga funcionando cuando alguien repite el test.

alter table public.affiliates
  add column if not exists result_token uuid not null default gen_random_uuid();

create unique index if not exists affiliates_result_token_idx
  on public.affiliates (result_token);

comment on column public.affiliates.result_token is
  'Capacidad de lectura del propio resultado. Aleatoria, no derivada del correo y revocable con un update.';

-- ---------------------------------------------------------------------------
-- El alta devuelve el token
-- ---------------------------------------------------------------------------

-- Cambia el tipo de retorno (void -> uuid), y eso `create or replace` no lo
-- admite: hay que retirar la anterior antes de crear la nueva.
drop function if exists public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text, text);

create function public.register_affiliate(
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
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_id    uuid;
  v_token uuid;
begin
  if p_consent is not true then
    raise exception 'Se requiere consentimiento explícito para registrar la posición política';
  end if;

  if p_method not in ('test', 'manual') then
    raise exception 'Método de posicionamiento no válido';
  end if;

  -- `result_token` no aparece en el `do update`: quien ya estaba registrado
  -- conserva el suyo, y el enlace que guardó sigue abriendo su resultado.
  insert into public.affiliates (email_hash, email, confirmed_at)
  values (p_email_hash, p_email, now())
  on conflict (email_hash) do update
    set deleted_at   = null,
        email        = coalesce(excluded.email, public.affiliates.email),
        confirmed_at = coalesce(public.affiliates.confirmed_at, now())
  returning id, result_token into v_id, v_token;

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

  return v_token;
end;
$$;

revoke all on function public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text, text) from public;
grant execute on function public.register_affiliate(bytea, char, smallint, smallint, text, boolean, text, text, text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Lectura del propio resultado
-- ---------------------------------------------------------------------------

-- Devuelve la posición de un registro a partir de su token. Lo que **no**
-- devuelve es igual de importante: ni el correo, ni el hash, ni el id interno.
-- Un token filtrado expone una posición política, no una identidad.
create or replace function public.result_by_token(p_token uuid)
returns table (
  economic     smallint,
  social       smallint,
  country_code char(2),
  region_code  text,
  method       text,
  updated_at   timestamptz,
  created_at   timestamptz
)
language sql
security definer
set search_path to 'public'
as $$
  select p.economic, p.social, p.country_code, p.region_code, p.method,
         p.updated_at, a.created_at
  from public.affiliates a
  join public.affiliate_profiles p on p.affiliate_id = a.id
  where a.result_token = p_token
    and a.deleted_at is null;
$$;

revoke all on function public.result_by_token(uuid) from public;
grant execute on function public.result_by_token(uuid) to anon, authenticated;
