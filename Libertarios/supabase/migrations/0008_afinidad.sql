-- «¿A quién votar? Objetivamente»: respuestas anónimas y lista de avisos.
--
-- Nada de esto toca el registro de simpatizantes. Son dos tablas aparte, con
-- funciones aparte, por dos razones:
--
--   * Quien hace el test no se ha registrado como simpatizante de nada, y el
--     módulo promete no afiliación. Mezclar sus datos con `affiliates` (o
--     reutilizar `register_affiliate`) rompería esa promesa en la propia base.
--   * Las respuestas son opinión política (art. 9 RGPD). Se guardan sin nada
--     que permita volver a una persona: ni correo, ni IP, ni user agent, ni
--     hora exacta. La lista de avisos sí tiene correo, y por eso no tiene
--     ninguna respuesta ni ningún enlace a ellas.
--
-- Acceso: RLS activo y sin políticas en las dos tablas, y `revoke all` a `anon`
-- y `authenticated`. La única vía de escritura pública son dos funciones
-- SECURITY DEFINER que validan la entrada. La lectura de agregados es interna
-- (solo `service_role`); publicar cualquier cifra exige k ≥ 20 y respetar la
-- veda de sondeos del art. 69.7 LOREG, que el código comprueba con
-- `isPublicationEmbargoed()` (`src/lib/afinidad/aggregate-rules.ts`).

-- ---------------------------------------------------------------------------
-- Respuestas anónimas
-- ---------------------------------------------------------------------------

create table if not exists public.afinidad_responses (
  id               bigint generated always as identity primary key,
  -- Las respuestas van por posición (orden de `Question.order`), no por id de
  -- pregunta: la versión del dataset dice qué pregunta es cada posición, y así
  -- un cambio de cuestionario nunca mezcla respuestas de versiones distintas.
  dataset_version  text       not null,
  -- −2, −1, 1, 2 (escala de 4 puntos sin punto medio) o NULL si se saltó.
  answers          smallint[] not null,
  -- «Esto me importa», misma longitud que `answers`.
  important        boolean[]  not null,
  -- Código INE de comunidad autónoma (01–19), solo si la persona lo declaró.
  region           text,
  -- Id del partido al que suele votar, solo si lo declaró.
  usual_vote       text,
  -- Día, no instante: con la hora exacta y los logs de cualquier sistema
  -- intermedio se podría casar una fila con una visita concreta. La hora de
  -- Madrid porque la veda y el calendario electoral se cuentan en ella.
  created_day      date       not null default ((now() at time zone 'Europe/Madrid')::date),

  constraint afinidad_responses_version_chk
    check (dataset_version ~ '^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$'),
  constraint afinidad_responses_len_chk
    check (cardinality(answers) between 1 and 52
           and cardinality(important) = cardinality(answers)
           and array_ndims(answers) = 1 and array_ndims(important) = 1),
  constraint afinidad_responses_values_chk
    -- `<@` no casa los NULL (saltadas), así que se quitan antes de comparar.
    check (array_remove(answers, null) <@ array[-2, -1, 1, 2]::smallint[]),
  constraint afinidad_responses_region_chk
    check (region is null or region ~ '^(0[1-9]|1[0-9])$'),
  constraint afinidad_responses_vote_chk
    check (usual_vote is null or usual_vote ~ '^[a-z0-9-]{1,32}$')
);

comment on table public.afinidad_responses is
  'Respuestas anónimas del test «¿A quién votar?». Sin correo, IP, user agent ni hora. Solo se publican agregados con k ≥ 20 y fuera de la veda del art. 69.7 LOREG.';
comment on column public.afinidad_responses.created_day is
  'Fecha truncada a día (Europe/Madrid). No añadir columnas de hora: es lo que impide casar filas con visitas.';

create index if not exists afinidad_responses_version_idx
  on public.afinidad_responses (dataset_version, usual_vote);

-- ---------------------------------------------------------------------------
-- «Avísame cuando cambien los programas»
-- ---------------------------------------------------------------------------

create table if not exists public.afinidad_notify (
  id               bigint generated always as identity primary key,
  email            text        not null,
  -- Momento en que marcó la casilla. Es la prueba del consentimiento, así que
  -- se refresca si vuelve a suscribirse.
  consent_at       timestamptz not null default now(),
  locale           text        not null default 'es',
  -- Versión del dataset que vio: permite avisar solo de lo que cambió después.
  dataset_version  text        not null,
  -- Para el enlace de baja de un clic de cada correo. No se devuelve nunca a
  -- quien se suscribe: si no, un tercero podría dar de baja a otro.
  unsubscribe_token uuid       not null default gen_random_uuid() unique,
  unsubscribed_at  timestamptz,
  -- Doble opt-in. `subscribe_afinidad` es pública: cualquiera puede apuntar
  -- una dirección ajena. Hasta que el dueño del correo pulse el enlace de
  -- confirmación (pendiente: no hay proveedor de correo) solo se le puede
  -- enviar ese correo de confirmación, nunca un aviso.
  confirmed_at     timestamptz,

  -- Se guarda ya en minúsculas: así la unicidad es un índice simple y
  -- «Ana@x.es» y «ana@x.es» no son dos suscripciones.
  constraint afinidad_notify_lower_chk
    check (email = lower(email)),
  constraint afinidad_notify_email_chk
    check (char_length(email) between 3 and 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint afinidad_notify_locale_chk
    check (locale in ('es', 'ca', 'gl', 'eu')),
  constraint afinidad_notify_version_chk
    check (dataset_version ~ '^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$')
);

-- Un correo, una fila.
create unique index if not exists afinidad_notify_email_idx
  on public.afinidad_notify (email);

comment on table public.afinidad_notify is
  'Lista de avisos del módulo «¿A quién votar?». SEPARADA de affiliates: suscribirse no es registrarse como simpatizante. Sin respuestas del test.';

-- ---------------------------------------------------------------------------
-- Acceso: nadie lee ni escribe las tablas con la clave pública
-- ---------------------------------------------------------------------------

alter table public.afinidad_responses enable row level security;
alter table public.afinidad_notify    enable row level security;
-- Sin políticas a propósito: con RLS activo y ninguna política, `anon` no ve
-- ni una fila aunque alguien concediera privilegios por error.
revoke all on public.afinidad_responses, public.afinidad_notify from public, anon, authenticated;
-- Las columnas identity crean secuencias, y en Supabase los privilegios por
-- defecto se las conceden a `anon`. PostgREST no las expone, pero no hay
-- motivo para que la clave pública tenga `usage`/`update` sobre ellas.
revoke all on sequence public.afinidad_responses_id_seq, public.afinidad_notify_id_seq
  from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Tope global de escrituras por minuto
-- ---------------------------------------------------------------------------

-- Las funciones de escritura están concedidas a `anon`, así que cualquiera con
-- la clave pública puede llamarlas en bucle. Postgres no ve la IP de quien
-- llama (a través de PostgREST ve la del servidor de Vercel, y las cabeceras
-- `x-forwarded-for` son falsificables), así que el límite por persona vive en
-- la aplicación y aquí solo hay un techo global por minuto y por ámbito: no
-- impide el ruido, pero acota cuánto puede crecer la base en un ataque.
-- Pasado el techo, la escritura se descarta en silencio.
--
-- Una fila por (ámbito, minuto) con un contador; nada más. Se purga a los dos
-- días (`afinidad_purge`, 0009).
create table if not exists public.afinidad_rate_buckets (
  scope  text        not null,
  bucket timestamptz not null,
  n      integer     not null default 0,
  primary key (scope, bucket),
  constraint afinidad_rate_buckets_scope_chk check (scope ~ '^[a-z_]{1,32}$')
);

alter table public.afinidad_rate_buckets enable row level security;
revoke all on public.afinidad_rate_buckets from public, anon, authenticated;

-- Suma uno al minuto actual del ámbito y dice si sigue por debajo del techo.
-- Interna: solo la llaman otras funciones SECURITY DEFINER.
create or replace function public.afinidad_rate_take(p_scope text, p_cap int)
returns boolean
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_n int;
begin
  insert into public.afinidad_rate_buckets as b (scope, bucket, n)
  values (p_scope, date_trunc('minute', now()), 1)
  on conflict (scope, bucket) do update set n = b.n + 1
  returning b.n into v_n;
  return v_n <= p_cap;
end;
$$;

revoke all on function public.afinidad_rate_take(text, int) from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Escritura: respuesta anónima
-- ---------------------------------------------------------------------------

-- Inserta y no devuelve nada: ni el id. Devolverlo permitiría a quien envía
-- reconocer «su» fila en un volcado futuro.
create or replace function public.record_afinidad_response(
  p_dataset_version text,
  p_answers         smallint[],
  p_important       boolean[],
  p_region          text default null,
  p_usual_vote      text default null
)
returns void
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_answered int;
begin
  -- Se valida aquí aunque la server action ya lo haga, y aunque los CHECK lo
  -- repitan: la función está concedida a `anon`, así que cualquiera con la
  -- clave pública puede llamarla sin pasar por la web.
  if p_dataset_version is null or p_dataset_version !~ '^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$' then
    raise exception 'Versión de dataset no válida';
  end if;
  if p_answers is null or p_important is null
     or array_ndims(p_answers) is distinct from 1
     or array_ndims(p_important) is distinct from 1
     or cardinality(p_answers) not between 1 and 52
     or cardinality(p_important) <> cardinality(p_answers) then
    raise exception 'Respuestas con forma no válida';
  end if;
  if exists (select 1 from unnest(p_answers) a where a is not null and a not in (-2, -1, 1, 2)) then
    raise exception 'Valor de respuesta fuera de escala';
  end if;
  if exists (select 1 from unnest(p_important) i where i is null) then
    raise exception 'Importancia no válida';
  end if;
  -- Importante solo donde hay respuesta: el codificador nunca marca una
  -- pregunta saltada; si llega así, la entrada está manipulada.
  if exists (
    select 1 from unnest(p_answers, p_important) as t(a, i) where a is null and i
  ) then
    raise exception 'Importancia en una pregunta saltada';
  end if;
  -- Mismo mínimo que el resultado (`MIN_ANSWERS` en score.ts): una respuesta
  -- sin resultado no dice nada útil y solo añade ruido.
  select count(*) into v_answered from unnest(p_answers) a where a is not null;
  if v_answered < 8 then
    raise exception 'Demasiadas preguntas sin responder';
  end if;
  if p_region is not null and p_region !~ '^(0[1-9]|1[0-9])$' then
    raise exception 'Comunidad autónoma no válida';
  end if;
  if p_usual_vote is not null and p_usual_vote !~ '^[a-z0-9-]{1,32}$' then
    raise exception 'Partido no válido';
  end if;

  -- Techo global: 600 respuestas/minuto son ~860 000 al día, muy por encima
  -- de cualquier pico realista. Por encima, se descarta sin error.
  if not public.afinidad_rate_take('response', 600) then
    return;
  end if;

  insert into public.afinidad_responses (dataset_version, answers, important, region, usual_vote)
  values (p_dataset_version, p_answers, p_important, p_region, p_usual_vote);
end;
$$;

revoke all on function public.record_afinidad_response(text, smallint[], boolean[], text, text) from public;
grant execute on function public.record_afinidad_response(text, smallint[], boolean[], text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Escritura: suscripción a avisos
-- ---------------------------------------------------------------------------

-- Devuelve `void` tanto si la dirección es nueva como si ya estaba: una
-- respuesta distinta permitiría averiguar si un correo concreto está suscrito.
create or replace function public.subscribe_afinidad(
  p_email           text,
  p_consent         boolean,
  p_locale          text,
  p_dataset_version text
)
returns void
language plpgsql
security definer
set search_path to 'public', 'pg_temp'
as $$
declare
  v_email text := lower(btrim(p_email));
begin
  if p_consent is not true then
    raise exception 'Se requiere consentimiento explícito';
  end if;
  if v_email is null or char_length(v_email) not between 3 and 254
     or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Correo no válido';
  end if;
  if p_locale is null or p_locale not in ('es', 'ca', 'gl', 'eu') then
    raise exception 'Idioma no válido';
  end if;
  if p_dataset_version is null or p_dataset_version !~ '^[0-9A-Za-z][0-9A-Za-z.-]{0,31}$' then
    raise exception 'Versión de dataset no válida';
  end if;

  if not public.afinidad_rate_take('subscribe', 60) then
    return;
  end if;

  -- Volver a suscribirse renueva el consentimiento y anula una baja previa:
  -- es un acto afirmativo nuevo. El token de baja se conserva.
  insert into public.afinidad_notify (email, consent_at, locale, dataset_version)
  values (v_email, now(), p_locale, p_dataset_version)
  on conflict (email) do update
    set consent_at      = now(),
        locale          = excluded.locale,
        dataset_version = excluded.dataset_version,
        -- Cualquiera puede llamar a esta función con un correo ajeno: reactivar
        -- a quien se dio de baja exige que vuelva a confirmar desde su buzón.
        confirmed_at    = case when afinidad_notify.unsubscribed_at is null
                               then afinidad_notify.confirmed_at end,
        unsubscribed_at = null;
end;
$$;

revoke all on function public.subscribe_afinidad(text, boolean, text, text) from public;
grant execute on function public.subscribe_afinidad(text, boolean, text, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Lectura interna: agregados con k ≥ 20
-- ---------------------------------------------------------------------------

-- Recuento de respuestas por valor para una pregunta (posición 1-based en el
-- array), opcionalmente filtrado por voto habitual. Las celdas con menos de 20
-- personas no salen: ni a cero ni a «<20», simplemente no están, y quien
-- publique debe decir «datos insuficientes».
--
-- NO se concede a `anon` ni a `authenticated`: es para análisis interno con
-- `service_role`. Antes de publicar cualquier cifra hay que comprobar
-- `isPublicationEmbargoed()` (veda del art. 69.7 LOREG, 24–29 nov 2026) y
-- avisar de que no es una muestra representativa.
create or replace function public.afinidad_aggregates(
  p_question        int,
  p_usual_vote      text default null,
  p_dataset_version text default null
)
returns table (
  dataset_version text,
  question        int,
  usual_vote      text,
  answer          smallint,
  important       boolean,
  n               bigint
)
language sql
stable
security definer
set search_path to 'public', 'pg_temp'
as $$
  select r.dataset_version,
         p_question,
         r.usual_vote,
         r.answers[p_question],
         r.important[p_question],
         count(*) as n
  from public.afinidad_responses r
  where p_question between 1 and cardinality(r.answers)
    and (p_dataset_version is null or r.dataset_version = p_dataset_version)
    and (p_usual_vote is null or r.usual_vote = p_usual_vote)
  group by r.dataset_version, r.usual_vote, r.answers[p_question], r.important[p_question]
  having count(*) >= 20;
$$;

revoke all on function public.afinidad_aggregates(int, text, text) from public, anon, authenticated;
