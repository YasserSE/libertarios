-- Marca de procedencia para poder distinguir —y borrar— los datos de ejemplo
-- sin tocar un solo registro real.
--
-- `seed_batch IS NULL`  → alta real de una persona.
-- `seed_batch = '...'`  → fila sintética, borrable en bloque.

alter table public.affiliates
  add column if not exists seed_batch text;

comment on column public.affiliates.seed_batch is
  'NULL para altas reales. Identificador de lote para datos sintéticos, borrables con purge_seed_batch().';

create index if not exists affiliates_seed_batch_idx
  on public.affiliates (seed_batch)
  where seed_batch is not null;

-- Borra un lote completo. Los perfiles y respuestas caen por ON DELETE CASCADE.
-- Rechaza NULL de forma explícita: sin esa guarda, un argumento nulo por
-- descuido compararía `seed_batch = null` (nunca cierto) y daría un falso
-- «0 borrados», o peor, invitaría a alguien a "arreglarlo" con `is not distinct
-- from` y llevarse por delante las altas reales.
create or replace function public.purge_seed_batch(p_batch text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  if p_batch is null or btrim(p_batch) = '' then
    raise exception 'purge_seed_batch requiere un identificador de lote no vacío';
  end if;

  delete from public.affiliates where seed_batch = p_batch;
  get diagnostics v_deleted = row_count;

  perform public.refresh_affiliate_stats();
  return v_deleted;
end;
$$;

revoke all on function public.purge_seed_batch(text) from public, anon, authenticated;

-- Inventario de lotes vivos, para saber qué hay sembrado sin consultar a mano.
create or replace view public.seed_batches as
  select
    seed_batch                as batch,
    count(*)::integer         as affiliates,
    min(created_at)           as first_seen,
    max(created_at)           as last_seen
  from public.affiliates
  where seed_batch is not null
  group by seed_batch;

revoke all on public.seed_batches from anon, authenticated;
