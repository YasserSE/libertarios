-- «¿A quién votar?»: registro de uso anónimo, panel de administración y
-- retención.
--
-- Decisión del dueño: en vez de un proveedor de analítica externo, guardar los
-- eventos de uso en la propia base y montar un panel sencillo. Este fichero
-- trae tres cosas:
--
--   1. `afinidad_events`: qué se pulsa (empezar, terminar, compartir, abrir una
--      fuente…). Es un registro de USO, no de opinión: no lleva respuestas,
--      comunidad, voto habitual ni partidos (art. 9 RGPD). Tampoco IP, user
--      agent, correo ni identificador de persona o de sesión, y la hora va
--      truncada a la hora en punto.
--   2. Acceso de administración sin clave de servicio en la app: tokens de
--      administrador guardados como hash, que se canjean por una sesión corta,
--      y una función que devuelve solo agregados (k ≥ 20 en todo lo que cruce
--      voto habitual o comunidad).
--   3. Retención: `afinidad_purge()` y su cron.
--
-- Mismo patrón de acceso que 0008: RLS activo sin políticas, `revoke all` a
-- `anon` y `authenticated`, y la única puerta pública son funciones SECURITY
-- DEFINER que validan todo lo que reciben.
--
-- ¿Por qué no hay id de sesión? Un id aleatorio por pestaña permitiría medir el
-- embudo por persona (empezó → terminó → compartió), pero también encadenar
-- todos los eventos de una visita: con la hora, el idioma y la secuencia de
-- clics, una cadena larga se parece demasiado a una huella. El embudo agregado
-- (terminados / empezados por día) responde a la pregunta del dueño sin eso,
-- así que no se guarda ninguno, ni en la base ni en el navegador.

-- ---------------------------------------------------------------------------
-- Eventos
-- ---------------------------------------------------------------------------

create table if not exists public.afinidad_events (
  id               bigint generated always as identity primary key,
  event            text        not null,
  -- Solo claves de la lista blanca, valores escalares cortos. La forma exacta
  -- por evento la impone `record_afinidad_event`; el CHECK es la red de
  -- seguridad por si alguien inserta con otro rol.
  props            jsonb       not null default '{}'::jsonb,
  -- Idioma de la página (el módulo tiene es/ca/gl/eu; la portada del sitio,
  -- desde donde se pulsa «Sigue explorando», puede estar en cualquiera).
  locale           text        not null,
  dataset_version  text        not null,
  -- Hora en punto (UTC). Con minutos y segundos, un evento se podría casar con
  -- una visita concreta en los logs de cualquier sistema intermedio.
  created_at       timestamptz not null
                   default (date_trunc('hour', now() at time zone 'UTC') at time zone 'UTC'),

  constraint afinidad_events_event_chk check (event in (
    'afinidad_start',
    'afinidad_complete',
    'afinidad_open_shared',
    'afinidad_context_declared',
    'afinidad_source_open',
    'afinidad_share_whatsapp',
    'afinidad_share_x',
    'afinidad_share_telegram',
    'afinidad_share_copy',
    'afinidad_share_native',
    'afinidad_explore_cuadrante',
    'afinidad_explore_aprende',
    'afinidad_explore_medidas'
  )),
  constraint afinidad_events_props_chk check (
    jsonb_typeof(props) = 'object'
    and octet_length(props::text) <= 64
    and (props - array['anon', 'from', 'step']) = '{}'::jsonb
  ),
  constraint afinidad_events_locale_chk
    check (locale in ('es', 'ca', 'gl', 'eu', 'pt', 'fr', 'it', 'de')),
  constraint afinidad_events_version_chk
    check (dataset_version ~ '^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$'),
  constraint afinidad_events_hour_chk
    check (extract(minute from (created_at at time zone 'UTC')) = 0
           and extract(second from (created_at at time zone 'UTC')) = 0)
);

comment on table public.afinidad_events is
  'Registro de uso anónimo de «¿A quién votar?». Sin respuestas, comunidad, voto, partidos, IP, user agent, correo ni id de sesión. Hora truncada. Se purga a los 180 días.';

create index if not exists afinidad_events_created_idx on public.afinidad_events (created_at, event);

alter table public.afinidad_events enable row level security;
revoke all on public.afinidad_events from public, anon, authenticated;
revoke all on sequence public.afinidad_events_id_seq from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Escritura de eventos
-- ---------------------------------------------------------------------------

-- Un evento. Valida nombre, propiedades (por evento), idioma y versión, y
-- lanza si algo no encaja: quien llama legítimamente (la ruta
-- `/api/afinidad/event`) ya ha limpiado la entrada, así que un fallo aquí es
-- alguien llamando a mano. Devuelve si se guardó (false = techo global
-- alcanzado). No devuelve el id.
create or replace function public.record_afinidad_event(
  p_event           text,
  p_props           jsonb,
  p_locale          text,
  p_dataset_version text
)
returns boolean
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_props   jsonb := coalesce(p_props, '{}'::jsonb);
  v_allowed text[];
begin
  if p_event is null or p_event not in (
    'afinidad_start', 'afinidad_complete', 'afinidad_open_shared',
    'afinidad_context_declared', 'afinidad_source_open',
    'afinidad_share_whatsapp', 'afinidad_share_x', 'afinidad_share_telegram',
    'afinidad_share_copy', 'afinidad_share_native',
    'afinidad_explore_cuadrante', 'afinidad_explore_aprende', 'afinidad_explore_medidas'
  ) then
    raise exception 'Evento no permitido';
  end if;
  if p_locale is null or p_locale not in ('es', 'ca', 'gl', 'eu', 'pt', 'fr', 'it', 'de') then
    raise exception 'Idioma no válido';
  end if;
  if p_dataset_version is null or p_dataset_version !~ '^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$' then
    raise exception 'Versión de dataset no válida';
  end if;

  -- Propiedades: a lo sumo una, y solo la que corresponde a cada evento.
  v_allowed := case
    when p_event like 'afinidad\_share\_%'   then array['anon']
    when p_event like 'afinidad\_explore\_%' then array['from']
    when p_event = 'afinidad_context_declared' then array['step']
    else array[]::text[]
  end;
  if jsonb_typeof(v_props) <> 'object' or octet_length(v_props::text) > 64 then
    raise exception 'Propiedades no válidas';
  end if;
  if (v_props - v_allowed) <> '{}'::jsonb then
    raise exception 'Propiedad no permitida';
  end if;
  if v_props ? 'anon' and jsonb_typeof(v_props -> 'anon') <> 'boolean' then
    raise exception 'Propiedad no válida: anon';
  end if;
  if v_props ? 'from' and (jsonb_typeof(v_props -> 'from') <> 'string'
                           or v_props ->> 'from' not in ('resultado', 'pie', 'portada')) then
    raise exception 'Propiedad no válida: from';
  end if;
  if v_props ? 'step' and (jsonb_typeof(v_props -> 'step') <> 'string'
                           or v_props ->> 'step' not in ('region', 'vote')) then
    raise exception 'Propiedad no válida: step';
  end if;

  -- Techo global (ver `afinidad_rate_take` en 0008): 3000 eventos/minuto.
  if not public.afinidad_rate_take('event', 3000) then
    return false;
  end if;

  insert into public.afinidad_events (event, props, locale, dataset_version)
  values (p_event, v_props, p_locale, p_dataset_version);
  return true;
end;
$$;

revoke all on function public.record_afinidad_event(text, jsonb, text, text) from public;
grant execute on function public.record_afinidad_event(text, jsonb, text, text) to anon, authenticated;

-- Lote de eventos de una misma página (idioma y versión comunes), para que el
-- navegador mande uno solo al cerrar la pestaña. Máximo 20 y 4 KB; todo o
-- nada: si uno no valida, no se guarda ninguno. Devuelve cuántos se guardaron.
create or replace function public.record_afinidad_events(
  p_locale          text,
  p_dataset_version text,
  p_events          jsonb
)
returns int
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_item  jsonb;
  v_saved int := 0;
begin
  if p_events is null or jsonb_typeof(p_events) <> 'array'
     or jsonb_array_length(p_events) not between 1 and 20
     or octet_length(p_events::text) > 4096 then
    raise exception 'Lote no válido';
  end if;
  for v_item in select value from jsonb_array_elements(p_events) loop
    if jsonb_typeof(v_item) <> 'object'
       or (v_item - array['e', 'p']) <> '{}'::jsonb
       or jsonb_typeof(v_item -> 'e') is distinct from 'string' then
      raise exception 'Evento con forma no válida';
    end if;
    if public.record_afinidad_event(v_item ->> 'e', v_item -> 'p', p_locale, p_dataset_version) then
      v_saved := v_saved + 1;
    end if;
  end loop;
  return v_saved;
end;
$$;

revoke all on function public.record_afinidad_events(text, text, jsonb) from public;
grant execute on function public.record_afinidad_events(text, text, jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Administración: tokens y sesiones
-- ---------------------------------------------------------------------------

-- Tokens de administrador de larga duración (≤ 1 año). Se guarda solo el
-- SHA-256: el token tiene 244 bits aleatorios, así que un hash lento (bcrypt)
-- no añade nada y obligaría a recorrer la tabla en cada intento. Se crean y
-- revocan solo con el rol de servicio (`afinidad_admin_issue_token`,
-- `afinidad_admin_revoke_token`), desde el editor SQL de Supabase.
create table if not exists public.afinidad_admin_tokens (
  id           bigint generated always as identity primary key,
  -- Para qué dispositivo o persona es, y para revocarlo por nombre.
  label        text        not null unique,
  token_hash   bytea       not null unique,
  created_at   timestamptz not null default now(),
  expires_at   timestamptz not null,
  revoked_at   timestamptz,
  last_used_at timestamptz,

  constraint afinidad_admin_tokens_label_chk check (label ~ '^[a-z0-9][a-z0-9._-]{0,47}$'),
  constraint afinidad_admin_tokens_hash_chk check (octet_length(token_hash) = 32),
  constraint afinidad_admin_tokens_expiry_chk
    check (expires_at > created_at and expires_at <= created_at + interval '366 days')
);

-- Sesiones cortas (30 min). El token largo viaja una vez, del formulario a la
-- server action; lo que vive en la cookie es una sesión que caduca sola y que
-- se puede cerrar. Revocar el token invalida sus sesiones.
create table if not exists public.afinidad_admin_sessions (
  token_hash     bytea       primary key,
  admin_token_id bigint      not null references public.afinidad_admin_tokens (id) on delete cascade,
  created_at     timestamptz not null default now(),
  expires_at     timestamptz not null,

  constraint afinidad_admin_sessions_hash_chk check (octet_length(token_hash) = 32)
);

alter table public.afinidad_admin_tokens   enable row level security;
alter table public.afinidad_admin_sessions enable row level security;
revoke all on public.afinidad_admin_tokens, public.afinidad_admin_sessions from public, anon, authenticated;
revoke all on sequence public.afinidad_admin_tokens_id_seq from public, anon, authenticated;

-- Hash de un token presentado. Interna.
create or replace function public.afinidad_admin_hash(p_token text)
returns bytea
language sql
immutable
set search_path to 'pg_catalog', 'pg_temp'
as $$
  select sha256(convert_to(p_token, 'UTF8'));
$$;

revoke all on function public.afinidad_admin_hash(text) from public, anon, authenticated;

-- Token aleatorio con prefijo (para que los escáneres de secretos lo
-- reconozcan si acaba en un repositorio). Dos UUID v4 de `gen_random_uuid()`
-- (generador criptográfico de Postgres, sin pgcrypto): 244 bits. Interna.
create or replace function public.afinidad_admin_new_secret(p_prefix text)
returns text
language sql
volatile
set search_path to 'pg_catalog', 'pg_temp'
as $$
  select p_prefix || replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
$$;

revoke all on function public.afinidad_admin_new_secret(text) from public, anon, authenticated;

-- ¿Bloqueado? Más de 20 fallos en 15 minutos cierran la puerta a todo el
-- mundo (también al dueño) hasta que el contador baja. Con 244 bits la fuerza
-- bruta ya es imposible; esto sirve para cortar el ruido y para que un ataque
-- se note en `afinidad_rate_buckets` (ámbito `admin_fail`). Interna.
create or replace function public.afinidad_admin_locked()
returns boolean
language sql
stable
security definer
set search_path to 'public', 'pg_temp'
as $$
  select coalesce(sum(n), 0) >= 20
  from public.afinidad_rate_buckets
  where scope = 'admin_fail' and bucket > now() - interval '15 minutes';
$$;

revoke all on function public.afinidad_admin_locked() from public, anon, authenticated;

-- Id del token dueño de una sesión válida, o NULL. Cuenta el fallo. Interna.
create or replace function public.afinidad_admin_check_session(p_session text)
returns bigint
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_id bigint;
begin
  if public.afinidad_admin_locked() then
    return null;
  end if;
  if p_session is not null and p_session ~ '^afs_[0-9a-f]{64}$' then
    select s.admin_token_id into v_id
    from public.afinidad_admin_sessions s
    join public.afinidad_admin_tokens t on t.id = s.admin_token_id
    where s.token_hash = public.afinidad_admin_hash(p_session)
      and s.expires_at > now()
      and t.revoked_at is null
      and t.expires_at > now();
  end if;
  if v_id is null then
    perform public.afinidad_rate_take('admin_fail', 1000000);
  end if;
  return v_id;
end;
$$;

revoke all on function public.afinidad_admin_check_session(text) from public, anon, authenticated;

-- Canjea un token de administrador por una sesión de 30 minutos (nunca más
-- allá de la caducidad del token). Devuelve la sesión, o NULL si el token no
-- vale o hay bloqueo: la respuesta es la misma en todos los casos de fallo.
create or replace function public.afinidad_admin_login(p_token text)
returns text
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_token   public.afinidad_admin_tokens%rowtype;
  v_session text;
begin
  if public.afinidad_admin_locked() then
    return null;
  end if;
  if p_token is not null and p_token ~ '^afa_[0-9a-f]{64}$' then
    -- Se compara el hash, no el token: el tiempo de la búsqueda en el índice
    -- depende de un SHA-256 que quien ataca no controla.
    select * into v_token
    from public.afinidad_admin_tokens
    where token_hash = public.afinidad_admin_hash(p_token)
      and revoked_at is null
      and expires_at > now();
  end if;
  if v_token.id is null then
    perform public.afinidad_rate_take('admin_fail', 1000000);
    return null;
  end if;

  delete from public.afinidad_admin_sessions where expires_at <= now();
  update public.afinidad_admin_tokens set last_used_at = now() where id = v_token.id;

  v_session := public.afinidad_admin_new_secret('afs_');
  insert into public.afinidad_admin_sessions (token_hash, admin_token_id, expires_at)
  values (public.afinidad_admin_hash(v_session), v_token.id,
          least(now() + interval '30 minutes', v_token.expires_at));
  return v_session;
end;
$$;

revoke all on function public.afinidad_admin_login(text) from public;
grant execute on function public.afinidad_admin_login(text) to anon, authenticated;

-- Cierra una sesión. Siempre `void`, exista o no.
create or replace function public.afinidad_admin_logout(p_session text)
returns void
language sql
security definer
set search_path to 'public', 'pg_temp'
as $$
  delete from public.afinidad_admin_sessions
  where p_session ~ '^afs_[0-9a-f]{64}$'
    and token_hash = public.afinidad_admin_hash(p_session);
$$;

revoke all on function public.afinidad_admin_logout(text) from public;
grant execute on function public.afinidad_admin_logout(text) to anon, authenticated;

-- Emitir un token: SOLO rol de servicio (editor SQL de Supabase). Devuelve el
-- token en claro una única vez; la base guarda solo su hash.
create or replace function public.afinidad_admin_issue_token(
  p_label     text,
  p_valid_for interval default interval '30 days'
)
returns text
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_token text := public.afinidad_admin_new_secret('afa_');
begin
  if p_valid_for is null or p_valid_for <= interval '0' or p_valid_for > interval '366 days' then
    raise exception 'Validez entre 1 segundo y 366 días';
  end if;
  insert into public.afinidad_admin_tokens (label, token_hash, expires_at)
  values (p_label, public.afinidad_admin_hash(v_token), now() + p_valid_for);
  return v_token;
end;
$$;

revoke all on function public.afinidad_admin_issue_token(text, interval) from public, anon, authenticated;

-- Revocar por nombre: marca el token y borra sus sesiones al momento.
create or replace function public.afinidad_admin_revoke_token(p_label text)
returns int
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_n int;
begin
  update public.afinidad_admin_tokens set revoked_at = now()
  where label = p_label and revoked_at is null;
  get diagnostics v_n = row_count;
  delete from public.afinidad_admin_sessions s
  using public.afinidad_admin_tokens t
  where t.id = s.admin_token_id and t.label = p_label;
  return v_n;
end;
$$;

revoke all on function public.afinidad_admin_revoke_token(text) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Administración: agregados
-- ---------------------------------------------------------------------------

-- Todo lo que ve el panel, en un JSON. Devuelve NULL si la sesión no vale
-- (o hay bloqueo), sin distinguir el motivo.
--
-- Qué devuelve y con qué cuidado:
--   * Eventos: recuentos por día (Madrid), evento, idioma, versión y propiedad,
--     dentro del rango pedido (máx. 366 días). Son uso, no opinión: sin k.
--   * Respuestas: total y recuento por día y por versión (tampoco opinión).
--   * Voto habitual, comunidad y su cruce: SOLO celdas con k ≥ 20 y siempre
--     sobre todo el histórico, no sobre el rango. Si dependieran del rango,
--     restar dos consultas de días consecutivos aislaría a una persona.
--     Los «no declara» no salen como celda, para que `total − visibles` no
--     despeje las celdas pequeñas.
--   * Picos del techo global por ámbito y día, para ver si hubo abuso.
--
-- Concedida a `anon` porque la sesión ES la autorización; sin sesión válida no
-- sale nada. Es VOLATILE (cuenta fallos), así que PostgREST la llama por POST.
create or replace function public.afinidad_admin_stats(
  p_session text,
  p_from    date default null,
  p_to      date default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  k        constant int := 20;
  v_today  date := (now() at time zone 'Europe/Madrid')::date;
  v_to     date := least(coalesce(p_to, v_today), v_today);
  v_from   date := coalesce(p_from, v_to - 29);
  v_start  timestamptz;
  v_end    timestamptz;
  v_result jsonb;
begin
  if public.afinidad_admin_check_session(p_session) is null then
    return null;
  end if;
  if v_from > v_to then
    v_from := v_to;
  end if;
  if v_to - v_from > 366 then
    v_from := v_to - 366;
  end if;
  v_start := v_from::timestamp at time zone 'Europe/Madrid';
  v_end   := (v_to + 1)::timestamp at time zone 'Europe/Madrid';

  with ev as (
    select e.event, e.props, e.locale, e.dataset_version,
           (e.created_at at time zone 'Europe/Madrid')::date as day
    from public.afinidad_events e
    where e.created_at >= v_start and e.created_at < v_end
  )
  select jsonb_build_object(
    'from', v_from,
    'to', v_to,
    'k', k,
    'event_totals', coalesce((
      select jsonb_agg(jsonb_build_object('event', event, 'n', n) order by event)
      from (select event, count(*) n from ev group by event) t), '[]'::jsonb),
    'events_by_day', coalesce((
      select jsonb_agg(jsonb_build_object('day', day, 'event', event, 'n', n) order by day, event)
      from (select day, event, count(*) n from ev group by day, event) t), '[]'::jsonb),
    'events_by_locale', coalesce((
      select jsonb_agg(jsonb_build_object('locale', locale, 'event', event, 'n', n) order by locale, event)
      from (select locale, event, count(*) n from ev group by locale, event) t), '[]'::jsonb),
    'events_by_version', coalesce((
      select jsonb_agg(jsonb_build_object('version', dataset_version, 'event', event, 'n', n)
                       order by dataset_version, event)
      from (select dataset_version, event, count(*) n from ev group by dataset_version, event) t), '[]'::jsonb),
    'events_by_prop', coalesce((
      select jsonb_agg(jsonb_build_object('event', event, 'key', key, 'value', value, 'n', n)
                       order by event, key, value)
      from (select ev.event, p.key, p.value #>> '{}' as value, count(*) n
            from ev, jsonb_each(ev.props) p
            group by ev.event, p.key, p.value #>> '{}') t), '[]'::jsonb),
    'responses', jsonb_build_object(
      'total', (select count(*) from public.afinidad_responses),
      'by_day', coalesce((
        select jsonb_agg(jsonb_build_object('day', created_day, 'n', n) order by created_day)
        from (select created_day, count(*) n from public.afinidad_responses
              where created_day between v_from and v_to group by created_day) t), '[]'::jsonb),
      'by_version', coalesce((
        select jsonb_agg(jsonb_build_object('version', dataset_version, 'n', n) order by dataset_version)
        from (select dataset_version, count(*) n from public.afinidad_responses
              group by dataset_version) t), '[]'::jsonb),
      'by_usual_vote', coalesce((
        select jsonb_agg(jsonb_build_object('usual_vote', usual_vote, 'n', n) order by n desc, usual_vote)
        from (select usual_vote, count(*) n from public.afinidad_responses
              where usual_vote is not null group by usual_vote having count(*) >= k) t), '[]'::jsonb),
      'by_region', coalesce((
        select jsonb_agg(jsonb_build_object('region', region, 'n', n) order by region)
        from (select region, count(*) n from public.afinidad_responses
              where region is not null group by region having count(*) >= k) t), '[]'::jsonb),
      'by_region_vote', coalesce((
        select jsonb_agg(jsonb_build_object('region', region, 'usual_vote', usual_vote, 'n', n)
                         order by region, n desc)
        from (select region, usual_vote, count(*) n from public.afinidad_responses
              where region is not null and usual_vote is not null
              group by region, usual_vote having count(*) >= k) t), '[]'::jsonb)
    ),
    'rate_peaks', coalesce((
      select jsonb_agg(jsonb_build_object('scope', scope, 'day', day, 'max_per_minute', m)
                       order by day, scope)
      from (select scope, (bucket at time zone 'Europe/Madrid')::date as day, max(n) m
            from public.afinidad_rate_buckets
            group by scope, (bucket at time zone 'Europe/Madrid')::date) t), '[]'::jsonb)
  ) into v_result;

  return v_result;
end;
$$;

revoke all on function public.afinidad_admin_stats(text, date, date) from public;
grant execute on function public.afinidad_admin_stats(text, date, date) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Retención
-- ---------------------------------------------------------------------------

-- Plazos (ver docs/DATABASE.md §8, «Retención»):
--   * eventos: 180 días;
--   * respuestas anónimas: 730 días por defecto (PROPUESTA pendiente de que
--     el dueño la confirme; `p_response_days => null` desactiva su purga);
--   * contadores del techo global: 2 días (solo sirven para ver picos);
--   * sesiones de admin caducadas: al momento; tokens caducados o revocados:
--     a los 30 días (se conservan un tiempo para saber qué se revocó);
--   * avisos dados de baja: 30 días tras la baja.
-- Devuelve cuántas filas borró de cada tabla. Solo rol de servicio / cron.
create or replace function public.afinidad_purge(
  p_event_days    int default 180,
  p_response_days int default 730
)
returns jsonb
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_events    int;
  v_responses int := 0;
  v_buckets   int;
  v_sessions  int;
  v_tokens    int;
  v_notify    int;
begin
  if p_event_days is null or p_event_days < 1 then
    raise exception 'Plazo de eventos no válido';
  end if;

  delete from public.afinidad_events where created_at < now() - make_interval(days => p_event_days);
  get diagnostics v_events = row_count;

  if p_response_days is not null then
    if p_response_days < 1 then
      raise exception 'Plazo de respuestas no válido';
    end if;
    delete from public.afinidad_responses
    where created_day < (now() at time zone 'Europe/Madrid')::date - p_response_days;
    get diagnostics v_responses = row_count;
  end if;

  delete from public.afinidad_rate_buckets where bucket < now() - interval '2 days';
  get diagnostics v_buckets = row_count;

  delete from public.afinidad_admin_sessions where expires_at <= now();
  get diagnostics v_sessions = row_count;

  delete from public.afinidad_admin_tokens
  where coalesce(revoked_at, expires_at) < now() - interval '30 days';
  get diagnostics v_tokens = row_count;

  delete from public.afinidad_notify where unsubscribed_at < now() - interval '30 days';
  get diagnostics v_notify = row_count;

  return jsonb_build_object(
    'events', v_events, 'responses', v_responses, 'rate_buckets', v_buckets,
    'admin_sessions', v_sessions, 'admin_tokens', v_tokens, 'notify', v_notify
  );
end;
$$;

revoke all on function public.afinidad_purge(int, int) from public, anon, authenticated;

-- Cada noche a las 03:17 UTC. pg_cron ya se instala en 0006.
create extension if not exists pg_cron with schema extensions;

select cron.unschedule('afinidad-purge')
where exists (select 1 from cron.job where jobname = 'afinidad-purge');

select cron.schedule(
  'afinidad-purge',
  '17 3 * * *',
  $$select public.afinidad_purge();$$
);
