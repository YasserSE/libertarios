-- «Novedades de Libertarios.eu»: un único boletín, con doble opt-in.
--
-- Decisión del dueño (2026-10-07): un solo boletín para todo el sitio, enviado
-- con Brevo, que se ofrece DESPUÉS del resultado del test, en el registro y en
-- el pie. Se reaprovechan los correos de quien ya se registró como
-- simpatizante, pero solo tras pedirles permiso otra vez (ver más abajo).
--
-- Lo que esta tabla NO guarda, y no debe guardar nunca (RGPD art. 9 y
-- minimización): respuestas del test, resultado, voto habitual, comunidad o
-- provincia, posición en el cuadrante, ni ningún identificador que permita
-- cruzarla con `affiliates`, `affiliate_profiles` o `afinidad_responses`. No
-- hay clave ajena hacia ninguna de ellas, a propósito. Nada de segmentar por
-- ideología: el boletín es el mismo para todo el mundo.
--
-- Columnas: las que pide el dueño (correo, consentimiento y su versión de
-- texto, origen, idioma, confirmación, token de baja, baja) más tres
-- operativas del doble opt-in (`confirm_token_hash`, `confirm_sent_at`,
-- `confirm_expires_at`). Ninguna dice nada de la persona más allá de «se le
-- envió un correo de confirmación tal día».
--
-- Acceso, mismo patrón que 0008/0009: RLS activo sin políticas, `revoke all`
-- a `anon` y `authenticated`, y la única puerta son funciones SECURITY DEFINER.
-- Diferencia importante con `subscribe_afinidad`: aquí la función de alta
-- devuelve el token de confirmación (para que el servidor lo meta en el
-- correo), y la clave anónima es pública. Si cualquiera con la clave anónima
-- pudiera pedir el token, podría confirmar una dirección ajena y el doble
-- opt-in no valdría nada. Por eso las tres funciones públicas exigen además una
-- clave de servidor (`newsletter_server_key`) que solo conoce el servidor de
-- la app (variable `NEWSLETTER_SERVER_KEY`) y de la que la base guarda el hash.

-- ---------------------------------------------------------------------------
-- Tabla
-- ---------------------------------------------------------------------------

create table if not exists public.newsletter_subscribers (
  id                   bigint generated always as identity primary key,
  -- En minúsculas: la unicidad es un índice simple.
  email                text        not null,
  -- Cuándo marcó la casilla (o, en los importados, cuándo se registró).
  -- La PRUEBA de consentimiento válida es `confirmed_at`: cualquiera puede
  -- escribir una dirección ajena en un formulario.
  consent_at           timestamptz not null default now(),
  -- Versión del texto que aceptó (`NEWSLETTER_CONSENT_VERSION` en
  -- `src/lib/newsletter/schema.ts`). Si cambia el texto, cambia la versión.
  consent_text_version text        not null,
  source               text        not null,
  locale               text        not null default 'es',
  confirmed_at         timestamptz,
  -- Enlace de baja de cada correo. No se devuelve a quien se suscribe desde
  -- la web; solo viaja en los correos.
  unsubscribe_token    uuid        not null default gen_random_uuid() unique,
  unsubscribed_at      timestamptz,
  -- Doble opt-in: SHA-256 del token del enlace de confirmación (el token en
  -- claro solo existe en el correo), cuándo se envió y hasta cuándo vale.
  confirm_token_hash   bytea       unique,
  confirm_sent_at      timestamptz,
  confirm_expires_at   timestamptz,

  constraint newsletter_subscribers_lower_chk
    check (email = lower(email)),
  constraint newsletter_subscribers_email_chk
    check (char_length(email) between 3 and 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint newsletter_subscribers_source_chk
    check (source in ('test', 'registro', 'footer', 'legacy_affiliate')),
  constraint newsletter_subscribers_locale_chk
    check (locale in ('es', 'ca', 'gl', 'eu', 'pt', 'fr', 'it', 'de')),
  constraint newsletter_subscribers_version_chk
    check (consent_text_version ~ '^[a-z0-9][a-z0-9.-]{0,31}$'),
  constraint newsletter_subscribers_hash_chk
    check (confirm_token_hash is null or octet_length(confirm_token_hash) = 32)
);

create unique index if not exists newsletter_subscribers_email_idx
  on public.newsletter_subscribers (email);

comment on table public.newsletter_subscribers is
  '«Novedades de Libertarios.eu». Solo correo, consentimiento, origen, idioma y estado. Sin respuestas, resultado, voto, territorio ni posición política, y sin enlace a affiliates ni afinidad_*. No segmentar por ideología.';
comment on column public.newsletter_subscribers.confirmed_at is
  'Doble opt-in. Solo las filas con confirmed_at y sin unsubscribed_at reciben novedades.';
comment on column public.newsletter_subscribers.unsubscribed_at is
  'Baja. La fila se conserva como lista de supresión: así una reimportación o un alta ajena no vuelven a escribir sin una confirmación nueva.';

alter table public.newsletter_subscribers enable row level security;
-- Sin políticas a propósito (ver 0008).
revoke all on public.newsletter_subscribers from public, anon, authenticated;
revoke all on sequence public.newsletter_subscribers_id_seq from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Clave de servidor
-- ---------------------------------------------------------------------------

-- Una sola fila. Guarda el SHA-256 de la clave; la clave en claro solo la ve
-- el dueño una vez, al emitirla, y va a la variable `NEWSLETTER_SERVER_KEY`.
create table if not exists public.newsletter_config (
  id              boolean     primary key default true,
  server_key_hash bytea       not null,
  rotated_at      timestamptz not null default now(),
  constraint newsletter_config_single_chk check (id),
  constraint newsletter_config_hash_chk check (octet_length(server_key_hash) = 32)
);

alter table public.newsletter_config enable row level security;
revoke all on public.newsletter_config from public, anon, authenticated;

-- ¿Es la clave del servidor? Interna. 256 bits aleatorios: la fuerza bruta no
-- es un riesgo, y aun así el techo global por minuto limita los intentos.
create or replace function public.newsletter_key_ok(p_key text)
returns boolean
language sql
stable
security definer
set search_path to 'public', 'pg_temp'
as $$
  select p_key is not null
     and p_key ~ '^nlk_[0-9a-f]{64}$'
     and exists (
       select 1 from public.newsletter_config c
       where c.server_key_hash = sha256(convert_to(p_key, 'UTF8'))
     );
$$;

revoke all on function public.newsletter_key_ok(text) from public, anon, authenticated;

-- Emite (o rota) la clave de servidor y la devuelve en claro UNA vez. Solo
-- rol de servicio, desde el editor SQL de Supabase:
--   select public.newsletter_issue_server_key();
-- Rotarla invalida la anterior al momento: hay que actualizar la variable en
-- Vercel justo después.
create or replace function public.newsletter_issue_server_key()
returns text
language plpgsql
volatile
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_key text := 'nlk_' || replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
begin
  insert into public.newsletter_config (id, server_key_hash, rotated_at)
  values (true, sha256(convert_to(v_key, 'UTF8')), now())
  on conflict (id) do update
    set server_key_hash = excluded.server_key_hash,
        rotated_at      = excluded.rotated_at;
  return v_key;
end;
$$;

revoke all on function public.newsletter_issue_server_key() from public, anon, authenticated;
grant execute on function public.newsletter_issue_server_key() to service_role;

-- Token de confirmación: 244 bits de `gen_random_uuid()` con prefijo. Interna.
create or replace function public.newsletter_new_confirm_token()
returns text
language sql
volatile
set search_path to 'pg_catalog', 'pg_temp'
as $$
  select 'nlc_' || replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
$$;

revoke all on function public.newsletter_new_confirm_token() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Alta (web)
-- ---------------------------------------------------------------------------

-- Devuelve el token de confirmación y el de baja SOLO cuando hay que enviar un
-- correo de confirmación; ninguna fila si no (ya confirmado, freno por
-- dirección o techo global). La server action responde a la persona lo mismo
-- en todos los casos, así que desde fuera no se averigua quién está suscrito,
-- y nunca reenvía estos tokens al navegador.
--
-- Una fila confirmada no se toca: un tercero no puede cambiar el idioma, el
-- origen ni la fecha de consentimiento de otra persona. En una fila sin
-- confirmar o dada de baja se registra el nuevo acto de consentimiento y se
-- emite un token nuevo, pero `confirmed_at`/`unsubscribed_at` no cambian hasta
-- que el dueño del buzón pulse el enlace: quien se dio de baja sigue de baja.
create or replace function public.subscribe_newsletter(
  p_server_key           text,
  p_email                text,
  p_consent              boolean,
  p_source               text,
  p_locale               text,
  p_consent_text_version text
)
returns table (confirm_token text, unsubscribe_token uuid)
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
#variable_conflict use_column
declare
  v_email text := lower(btrim(p_email));
  v_row   public.newsletter_subscribers%rowtype;
  v_token text;
begin
  if not public.newsletter_key_ok(p_server_key) then
    raise exception 'No autorizado';
  end if;
  if p_consent is not true then
    raise exception 'Se requiere consentimiento explícito';
  end if;
  if v_email is null or char_length(v_email) not between 3 and 254
     or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Correo no válido';
  end if;
  -- `legacy_affiliate` no entra por aquí: solo por la importación del dueño.
  if p_source is null or p_source not in ('test', 'registro', 'footer') then
    raise exception 'Origen no válido';
  end if;
  if p_locale is null or p_locale not in ('es', 'ca', 'gl', 'eu', 'pt', 'fr', 'it', 'de') then
    raise exception 'Idioma no válido';
  end if;
  if p_consent_text_version is null or p_consent_text_version !~ '^[a-z0-9][a-z0-9.-]{0,31}$' then
    raise exception 'Versión de texto no válida';
  end if;

  -- Techo global (ver `afinidad_rate_take`, 0008): 60 altas/minuto.
  if not public.afinidad_rate_take('newsletter', 60) then
    return;
  end if;

  select * into v_row from public.newsletter_subscribers s where s.email = v_email for update;

  if found and v_row.confirmed_at is not null and v_row.unsubscribed_at is null then
    return;  -- ya está dentro: nada que enviar ni que cambiar
  end if;
  -- Freno por dirección: un correo de confirmación cada 10 minutos como mucho,
  -- para que el formulario no sirva para bombardear un buzón ajeno.
  if found and v_row.confirm_sent_at is not null and v_row.confirm_sent_at > now() - interval '10 minutes' then
    return;
  end if;

  v_token := public.newsletter_new_confirm_token();

  insert into public.newsletter_subscribers as s
    (email, consent_at, consent_text_version, source, locale,
     confirm_token_hash, confirm_sent_at, confirm_expires_at)
  values
    (v_email, now(), p_consent_text_version, p_source, p_locale,
     sha256(convert_to(v_token, 'UTF8')), now(), now() + interval '7 days')
  on conflict (email) do update
    set consent_at           = now(),
        consent_text_version = excluded.consent_text_version,
        source               = excluded.source,
        locale               = excluded.locale,
        confirm_token_hash   = excluded.confirm_token_hash,
        confirm_sent_at      = excluded.confirm_sent_at,
        confirm_expires_at   = excluded.confirm_expires_at;

  return query
    select v_token, s.unsubscribe_token
    from public.newsletter_subscribers s
    where s.email = v_email;
end;
$$;

revoke all on function public.subscribe_newsletter(text, text, boolean, text, text, text) from public;
grant execute on function public.subscribe_newsletter(text, text, boolean, text, text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Confirmación y baja (páginas /[locale]/novedades/*)
-- ---------------------------------------------------------------------------

-- Confirma con el token del correo. Devuelve correo e idioma (para que el
-- servidor dé de alta el contacto en la lista de Brevo) o ninguna fila si el
-- token no vale, caducó o ya se usó. El token se borra al usarse.
create or replace function public.confirm_newsletter(p_server_key text, p_token text)
returns table (email text, locale text)
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
#variable_conflict use_column
begin
  if not public.newsletter_key_ok(p_server_key) then
    raise exception 'No autorizado';
  end if;
  if p_token is null or p_token !~ '^nlc_[0-9a-f]{64}$' then
    return;
  end if;
  if not public.afinidad_rate_take('newsletter_token', 300) then
    return;
  end if;

  return query
    update public.newsletter_subscribers s
       set confirmed_at       = now(),
           unsubscribed_at    = null,
           confirm_token_hash = null,
           confirm_expires_at = null
     where s.confirm_token_hash = sha256(convert_to(p_token, 'UTF8'))
       and s.confirm_expires_at > now()
    returning s.email, s.locale;
end;
$$;

revoke all on function public.confirm_newsletter(text, text) from public;
grant execute on function public.confirm_newsletter(text, text) to anon, authenticated;

-- Baja con el token de cualquier correo. Idempotente. Devuelve el correo (para
-- quitarlo de la lista de Brevo) o NULL si el token no existe. Anula también un
-- token de confirmación pendiente.
create or replace function public.unsubscribe_newsletter(p_server_key text, p_token uuid)
returns text
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_email text;
begin
  if not public.newsletter_key_ok(p_server_key) then
    raise exception 'No autorizado';
  end if;
  if p_token is null then
    return null;
  end if;
  if not public.afinidad_rate_take('newsletter_token', 300) then
    return null;
  end if;

  update public.newsletter_subscribers s
     set unsubscribed_at    = coalesce(s.unsubscribed_at, now()),
         confirm_token_hash = null,
         confirm_expires_at = null
   where s.unsubscribe_token = p_token
  returning s.email into v_email;
  return v_email;
end;
$$;

revoke all on function public.unsubscribe_newsletter(text, uuid) from public;
grant execute on function public.unsubscribe_newsletter(text, uuid) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Exportación (solo rol de servicio)
-- ---------------------------------------------------------------------------

-- Las direcciones a las que se puede escribir: confirmadas y sin baja. Para
-- volcar o resincronizar la lista de Brevo. No hay columna de posición ni de
-- territorio que exportar, porque no existe.
create or replace function public.newsletter_export()
returns table (email text, locale text, source text, confirmed_at timestamptz)
language sql
stable
security definer
set search_path to 'public', 'pg_temp'
as $$
  select s.email, s.locale, s.source, s.confirmed_at
  from public.newsletter_subscribers s
  where s.confirmed_at is not null
    and s.unsubscribed_at is null
  order by s.confirmed_at;
$$;

revoke all on function public.newsletter_export() from public, anon, authenticated;
grant execute on function public.newsletter_export() to service_role;

-- ---------------------------------------------------------------------------
-- Simpatizantes ya registrados (`npm run newsletter:import-affiliates`)
-- ---------------------------------------------------------------------------

-- Su consentimiento del registro decía: «se guarde mi correo con el fin de
-- que Libertarios.eu pueda escribirme… Escribimos poco y solo sobre esto, y te
-- das de baja cuando quieras». Cubre escribirles, pero el boletín es un
-- tratamiento nuevo con su propio texto, así que el primer contacto es SIEMPRE
-- un correo de re-permiso y la fila queda sin confirmar hasta que pulsen.
-- Nada de esto se ejecuta solo: lo lanza el dueño a mano con el rol de
-- servicio.

-- Recuentos para el modo de prueba (no escribe nada).
create or replace function public.newsletter_legacy_counts()
returns jsonb
language sql
stable
security definer
set search_path to 'public', 'pg_temp'
as $$
  with candidates as (
    select distinct lower(btrim(a.email)) as email
    from public.affiliates a
    where a.email is not null
      and a.deleted_at is null
      and a.seed_batch is null
      and lower(btrim(a.email)) ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
      and char_length(btrim(a.email)) between 3 and 254
  )
  select jsonb_build_object(
    'affiliates_with_email', (select count(*) from candidates),
    'already_in_newsletter', (select count(*) from candidates c
                               join public.newsletter_subscribers s on s.email = c.email),
    'to_import',             (select count(*) from candidates c
                               where not exists (select 1 from public.newsletter_subscribers s where s.email = c.email)),
    'legacy_pending_send',   (select count(*) from public.newsletter_subscribers s
                               where s.source = 'legacy_affiliate' and s.confirmed_at is null
                                 and s.unsubscribed_at is null and s.confirm_sent_at is null),
    'legacy_sent_unconfirmed', (select count(*) from public.newsletter_subscribers s
                               where s.source = 'legacy_affiliate' and s.confirmed_at is null
                                 and s.unsubscribed_at is null and s.confirm_sent_at is not null),
    'legacy_confirmed',      (select count(*) from public.newsletter_subscribers s
                               where s.source = 'legacy_affiliate' and s.confirmed_at is not null
                                 and s.unsubscribed_at is null),
    'unsubscribed',          (select count(*) from public.newsletter_subscribers s
                               where s.unsubscribed_at is not null)
  );
$$;

revoke all on function public.newsletter_legacy_counts() from public, anon, authenticated;
grant execute on function public.newsletter_legacy_counts() to service_role;

-- Copia los correos de simpatizantes (no borrados, no sintéticos) como
-- `legacy_affiliate`, sin confirmar. Solo el correo: ni posición, ni
-- territorio, ni id. Quien ya está en el boletín (incluida una baja) no se
-- toca. Devuelve cuántos entraron.
create or replace function public.newsletter_import_legacy_affiliates(p_consent_text_version text)
returns integer
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_n integer;
begin
  if p_consent_text_version is null or p_consent_text_version !~ '^[a-z0-9][a-z0-9.-]{0,31}$' then
    raise exception 'Versión de texto no válida';
  end if;

  insert into public.newsletter_subscribers (email, consent_at, consent_text_version, source, locale)
  select distinct on (lower(btrim(a.email)))
         lower(btrim(a.email)),
         coalesce(a.confirmed_at, a.created_at),
         p_consent_text_version,
         'legacy_affiliate',
         'es'
  from public.affiliates a
  where a.email is not null
    and a.deleted_at is null
    and a.seed_batch is null
    and lower(btrim(a.email)) ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    and char_length(btrim(a.email)) between 3 and 254
  order by lower(btrim(a.email)), a.created_at
  on conflict (email) do nothing;
  get diagnostics v_n = row_count;
  return v_n;
end;
$$;

revoke all on function public.newsletter_import_legacy_affiliates(text) from public, anon, authenticated;
grant execute on function public.newsletter_import_legacy_affiliates(text) to service_role;

-- Emite tokens de re-permiso para un lote de importados a los que aún no se
-- ha escrito, y los devuelve en claro para que el script envíe los correos.
-- Válidos 30 días.
create or replace function public.newsletter_issue_legacy_tokens(p_limit integer)
returns table (email text, locale text, confirm_token text, unsubscribe_token uuid)
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
#variable_conflict use_column
declare
  v_row   record;
  v_token text;
begin
  if p_limit is null or p_limit not between 1 and 200 then
    raise exception 'Lote no válido (1–200)';
  end if;

  for v_row in
    select s.id, s.email, s.locale, s.unsubscribe_token
    from public.newsletter_subscribers s
    where s.source = 'legacy_affiliate'
      and s.confirmed_at is null
      and s.unsubscribed_at is null
      and s.confirm_sent_at is null
    order by s.id
    limit p_limit
    for update skip locked
  loop
    v_token := public.newsletter_new_confirm_token();
    update public.newsletter_subscribers s
       set confirm_token_hash = sha256(convert_to(v_token, 'UTF8')),
           confirm_sent_at    = now(),
           confirm_expires_at = now() + interval '30 days'
     where s.id = v_row.id;
    email := v_row.email;
    locale := v_row.locale;
    confirm_token := v_token;
    unsubscribe_token := v_row.unsubscribe_token;
    return next;
  end loop;
end;
$$;

revoke all on function public.newsletter_issue_legacy_tokens(integer) from public, anon, authenticated;
grant execute on function public.newsletter_issue_legacy_tokens(integer) to service_role;

-- Si el envío de un correo falla, el script devuelve la fila a «pendiente»
-- para que una segunda pasada lo reintente.
create or replace function public.newsletter_release_legacy_token(p_email text)
returns void
language sql
security definer
set search_path to 'public', 'pg_temp'
as $$
  update public.newsletter_subscribers s
     set confirm_token_hash = null,
         confirm_sent_at    = null,
         confirm_expires_at = null
   where s.email = lower(btrim(p_email))
     and s.source = 'legacy_affiliate'
     and s.confirmed_at is null;
$$;

revoke all on function public.newsletter_release_legacy_token(text) from public, anon, authenticated;
grant execute on function public.newsletter_release_legacy_token(text) to service_role;

-- ---------------------------------------------------------------------------
-- Retención
-- ---------------------------------------------------------------------------

-- * Altas web sin confirmar: se borran 30 días después del último intento.
--   Puede que la dirección ni siquiera fuera de quien la escribió.
-- * Importados que no respondieron al re-permiso (token caducado): pasan a
--   baja, y no se borran, para que una reimportación no les vuelva a escribir.
--   Su registro de simpatizante no cambia.
-- * Bajas: se conservan (solo correo y fecha) como lista de supresión.
-- Solo rol de servicio / pg_cron. Devuelve recuentos.
create or replace function public.newsletter_purge()
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_deleted  int;
  v_declined int;
begin
  delete from public.newsletter_subscribers s
   where s.confirmed_at is null
     and s.unsubscribed_at is null
     and s.source <> 'legacy_affiliate'
     and s.consent_at < now() - interval '30 days';
  get diagnostics v_deleted = row_count;

  update public.newsletter_subscribers s
     set unsubscribed_at    = now(),
         confirm_token_hash = null,
         confirm_expires_at = null
   where s.source = 'legacy_affiliate'
     and s.confirmed_at is null
     and s.unsubscribed_at is null
     and s.confirm_expires_at is not null
     and s.confirm_expires_at < now();
  get diagnostics v_declined = row_count;

  -- Tokens caducados de quien sigue sin confirmar o se dio de baja.
  update public.newsletter_subscribers s
     set confirm_token_hash = null,
         confirm_expires_at = null
   where s.confirm_expires_at is not null
     and s.confirm_expires_at < now();

  return jsonb_build_object('deleted_unconfirmed', v_deleted, 'legacy_declined', v_declined);
end;
$$;

revoke all on function public.newsletter_purge() from public, anon, authenticated;
grant execute on function public.newsletter_purge() to service_role;

create extension if not exists pg_cron with schema extensions;

select cron.unschedule('newsletter-purge')
where exists (select 1 from cron.job where jobname = 'newsletter-purge');

select cron.schedule(
  'newsletter-purge',
  '27 3 * * *',
  $$select public.newsletter_purge();$$
);

-- ---------------------------------------------------------------------------
-- «Avísame» (0008) queda congelado
-- ---------------------------------------------------------------------------

-- El formulario del resultado pasa a ofrecer el boletín. `afinidad_notify` se
-- conserva (compatibilidad y purga de bajas en `afinidad_purge`), pero ya no se
-- escribe: se retira el permiso de la función de alta.
--
-- Sus filas NO se copian al boletín. Su casilla decía «Acepto que se use mi
-- correo solo para este aviso» (los programas de 2026): meterlas en un boletín
-- general sería usar el correo para un fin distinto del consentido. A fecha de
-- esta migración, 0008 no se había aplicado en ningún remoto, así que la tabla
-- está vacía; si no lo estuviera, esas direcciones solo pueden recibir ese
-- aviso único, y solo si confirmaron.
revoke execute on function public.subscribe_afinidad(text, boolean, text, text) from anon, authenticated;

comment on table public.afinidad_notify is
  'CONGELADA desde 0011: ya no se escribe (subscribe_afinidad sin permiso para anon). Consentimiento solo para el aviso de los programas de 2026; NO copiar al boletín newsletter_subscribers.';
