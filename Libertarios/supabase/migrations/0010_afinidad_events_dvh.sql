-- «¿A quién votar?»: eventos de «Dijeron vs. hicieron».
--
-- Amplía la lista blanca de 0009 con dos eventos:
--   - afinidad_dvh_open:  abrir la página /a-quien-votar/dijeron-vs-hicieron.
--   - afinidad_share_dvh: copiar el enlace de una entrada.
-- Ninguno lleva propiedades: ni el partido ni la entrada (dirían qué le
-- interesa a quien mira, que es opinión política). Por eso `afinidad_share_dvh`
-- se excluye a mano de la regla `afinidad_share_%` → `anon`.
--
-- Migración aparte, en vez de editar 0009, para que se pueda aplicar encima de
-- 0009 esté ya aplicada o no. La lista de aquí es la que compara el test con
-- `AFINIDAD_EVENTS` de `src/lib/afinidad/events.ts`.

alter table public.afinidad_events drop constraint if exists afinidad_events_event_chk;
alter table public.afinidad_events
  add constraint afinidad_events_event_chk check (event in (
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
    'afinidad_explore_medidas',
    'afinidad_dvh_open',
    'afinidad_share_dvh'
  ));

-- Misma función que en 0009, con la lista ampliada y la excepción de
-- `afinidad_share_dvh`. `create or replace` conserva los permisos, pero se
-- repiten abajo para que esta migración se lea sola.
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
    'afinidad_explore_cuadrante', 'afinidad_explore_aprende', 'afinidad_explore_medidas',
    'afinidad_dvh_open', 'afinidad_share_dvh'
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
  -- `afinidad_share_dvh` va primero: no admite ninguna.
  v_allowed := case
    when p_event = 'afinidad_share_dvh'      then array[]::text[]
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
