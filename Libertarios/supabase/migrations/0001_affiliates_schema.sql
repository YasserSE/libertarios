-- Libertarios.eu — esquema de simpatizantes
-- Implementa docs/DATABASE.md. Idempotente: se puede reaplicar sin romper nada.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- 1. Catálogo geográfico
-- ---------------------------------------------------------------------------

create table if not exists public.countries (
  code            char(2)  primary key,
  alpha3          char(3)  not null unique,
  numeric_code    char(3)  not null unique,
  name_es         text     not null,
  geo_name        text     not null,
  slug            text     not null unique,
  flag            text     not null,
  population      integer  not null check (population >= 0),
  has_region_map  boolean  not null default false
);

create table if not exists public.regions (
  code          text    not null,
  country_code  char(2) not null references public.countries(code) on delete cascade,
  name          text    not null,
  parent_name   text    not null,
  primary key (country_code, code)
);

create table if not exists public.region_aliases (
  country_code  char(2) not null,
  region_code   text    not null,
  alias         text    not null,
  primary key (country_code, alias),
  foreign key (country_code, region_code)
    references public.regions(country_code, code) on delete cascade
);

-- ---------------------------------------------------------------------------
-- 2. Identidad — nunca se lee desde el cliente
-- ---------------------------------------------------------------------------

create table if not exists public.affiliates (
  id            uuid primary key default gen_random_uuid(),
  email_hash    bytea not null unique,        -- SHA-256(email + pepper)
  created_at    timestamptz not null default now(),
  confirmed_at  timestamptz,                  -- sin doble opt-in no cuenta
  deleted_at    timestamptz
);

create index if not exists affiliates_created_at_idx on public.affiliates (created_at);

-- ---------------------------------------------------------------------------
-- 3. Posición ideológica y territorio
-- ---------------------------------------------------------------------------

create table if not exists public.affiliate_profiles (
  affiliate_id  uuid primary key references public.affiliates(id) on delete cascade,
  country_code  char(2) not null references public.countries(code),
  region_code   text,
  economic      smallint not null check (economic between -100 and 100),
  social        smallint not null check (social   between -100 and 100),
  method        text not null check (method in ('test', 'manual')),
  birth_year    smallint check (birth_year between 1900 and 2100),
  gender        text,
  updated_at    timestamptz not null default now(),
  -- FK compuesta MATCH SIMPLE: con region_code NULL la restricción no aplica,
  -- que es justo lo que queremos para países sin mapa regional.
  foreign key (country_code, region_code)
    references public.regions(country_code, code)
);

create index if not exists affiliate_profiles_country_idx on public.affiliate_profiles (country_code);
create index if not exists affiliate_profiles_region_idx  on public.affiliate_profiles (country_code, region_code);

-- ---------------------------------------------------------------------------
-- 4. Respuestas del test — opcionales y separadas
-- ---------------------------------------------------------------------------

create table if not exists public.quadrant_responses (
  id            bigserial primary key,
  affiliate_id  uuid references public.affiliates(id) on delete cascade,
  question_id   smallint not null,
  answer        smallint not null check (answer between -2 and 2),
  answered_at   timestamptz not null default now()
);

create index if not exists quadrant_responses_question_idx on public.quadrant_responses (question_id);

-- ---------------------------------------------------------------------------
-- 5. Agregados publicables — la única superficie que lee la web
-- ---------------------------------------------------------------------------

-- Perfiles que cuentan: confirmados y no borrados.
create or replace view public.eligible_profiles as
  select p.*, a.created_at
  from public.affiliate_profiles p
  join public.affiliates a on a.id = p.affiliate_id
  where a.confirmed_at is not null
    and a.deleted_at is null;

drop materialized view if exists public.country_stats;
create materialized view public.country_stats as
  select
    c.code,
    count(e.affiliate_id)::integer                                            as affiliates,
    count(e.affiliate_id) filter (
      where e.created_at > now() - interval '30 days'
    )::integer                                                                as growth_30d,
    round(avg(e.economic))::smallint                                          as economic,
    round(avg(e.social))::smallint                                            as social,
    case when c.population > 0
         then round(count(e.affiliate_id) * 1e6 / c.population)::integer
         else 0 end                                                           as per_million
  from public.countries c
  left join public.eligible_profiles e on e.country_code = c.code
  group by c.code, c.population
  -- k-anonimato: 0 se publica como «sin registros»; 1..4 se oculta por completo.
  having count(e.affiliate_id) = 0 or count(e.affiliate_id) >= 5;

create unique index country_stats_code_idx on public.country_stats (code);

drop materialized view if exists public.region_stats;
create materialized view public.region_stats as
  select
    r.country_code,
    r.code,
    count(e.affiliate_id)::integer                                            as affiliates,
    count(e.affiliate_id) filter (
      where e.created_at > now() - interval '30 days'
    )::integer                                                                as growth_30d,
    round(avg(e.economic))::smallint                                          as economic,
    round(avg(e.social))::smallint                                            as social
  from public.regions r
  left join public.eligible_profiles e
    on e.country_code = r.country_code and e.region_code = r.code
  group by r.country_code, r.code
  having count(e.affiliate_id) = 0 or count(e.affiliate_id) >= 5;

create unique index region_stats_pk_idx on public.region_stats (country_code, code);

-- Refresco: programar cada 15 min (Supabase cron o Vercel Cron).
create or replace function public.refresh_affiliate_stats()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  refresh materialized view concurrently public.country_stats;
  refresh materialized view concurrently public.region_stats;
end;
$$;

-- ---------------------------------------------------------------------------
-- 6. Alta de simpatizantes — escribir sí, leer nunca
-- ---------------------------------------------------------------------------

create or replace function public.register_affiliate(
  p_email_hash  bytea,
  p_country     char(2),
  p_economic    smallint,
  p_social      smallint,
  p_method      text,
  p_region      text     default null,
  p_birth_year  smallint default null,
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
  insert into public.affiliates (email_hash)
  values (p_email_hash)
  on conflict (email_hash) do update set deleted_at = null
  returning id into v_id;

  insert into public.affiliate_profiles as ap
    (affiliate_id, country_code, region_code, economic, social, method, birth_year, gender)
  values
    (v_id, p_country, p_region, p_economic, p_social, p_method, p_birth_year, p_gender)
  on conflict (affiliate_id) do update set
    country_code = excluded.country_code,
    region_code  = excluded.region_code,
    economic     = excluded.economic,
    social       = excluded.social,
    method       = excluded.method,
    birth_year   = excluded.birth_year,
    gender       = excluded.gender,
    updated_at   = now();
end;
$$;

-- ---------------------------------------------------------------------------
-- 7. Permisos: RLS sin políticas = nadie lee las tablas base
-- ---------------------------------------------------------------------------

alter table public.affiliates         enable row level security;
alter table public.affiliate_profiles enable row level security;
alter table public.quadrant_responses enable row level security;
alter table public.countries          enable row level security;
alter table public.regions            enable row level security;
alter table public.region_aliases     enable row level security;

-- El catálogo sí es público (no contiene datos personales).
drop policy if exists countries_public_read on public.countries;
create policy countries_public_read on public.countries for select to anon, authenticated using (true);

drop policy if exists regions_public_read on public.regions;
create policy regions_public_read on public.regions for select to anon, authenticated using (true);

drop policy if exists region_aliases_public_read on public.region_aliases;
create policy region_aliases_public_read on public.region_aliases for select to anon, authenticated using (true);

revoke all on public.affiliates, public.affiliate_profiles, public.quadrant_responses from anon, authenticated;
revoke all on public.eligible_profiles from anon, authenticated;

grant select on public.countries, public.regions, public.region_aliases to anon, authenticated;
grant select on public.country_stats, public.region_stats to anon, authenticated;

revoke all on function public.register_affiliate(bytea, char, smallint, smallint, text, text, smallint, text) from public;
grant execute on function public.register_affiliate(bytea, char, smallint, smallint, text, text, smallint, text) to anon, authenticated;

revoke all on function public.refresh_affiliate_stats() from public, anon, authenticated;
