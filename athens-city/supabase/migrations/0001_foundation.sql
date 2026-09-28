-- =============================================================================
-- 0001_foundation.sql — City Intelligence: foundation schema
-- Scope: cities, source registry, ingestion runs, health facilities + on-duty
-- rotas, emergency contacts, change events, places/media/phrases (minimal),
-- user profile + saved places (RLS).
-- Target: Supabase (Postgres 15+/16, PostGIS).
-- =============================================================================

create extension if not exists postgis;
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type source_tier as enum ('tier1_official','tier2_institutional','tier3_media','tier4_commercial','tier5_community');
create type verification_status as enum ('pending','verified','stale','contradicted','rejected');
create type facility_type as enum ('pharmacy','public_hospital','private_hospital','clinic','urgent_care','dental');
create type ingestion_status as enum ('running','succeeded','failed','rejected_sanity_check');
create type media_licence_status as enum ('active','licence_changed','removed_at_source','rejected');
create type phrase_register as enum ('formal','informal','neutral');
create type phrase_priority as enum ('essential','useful','nice_to_have');

-- ---------------------------------------------------------------------------
-- Cities (§3)
-- ---------------------------------------------------------------------------
create table cities (
  id              text primary key,                  -- e.g. 'athens'
  name            text not null,
  name_local      text not null,
  country_code    char(2) not null,
  language        text not null,                     -- BCP-47, e.g. 'el'
  timezone        text not null,                     -- IANA, e.g. 'Europe/Athens'
  currency        char(3) not null,
  center          geography(point,4326) not null,
  boundary        geography(multipolygon,4326),
  config          jsonb not null default '{}'::jsonb, -- remaining §3 keys
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Source registry (§10, §40)
-- ---------------------------------------------------------------------------
create table sources (
  id                 text primary key,               -- e.g. 'gr.fsa.efimeries'
  city_id            text references cities(id),     -- null = national
  name               text not null,
  publisher          text not null,
  url                text not null,
  tier               source_tier not null,
  domain             text not null,                  -- 'pharmacy_rota','hospital_rota','transport',...
  access_method      text not null,                  -- 'html','pdf','api','gtfs','manual'
  licence_notes      text,
  terms_checked_at   timestamptz,
  permission_status  text not null default 'not_requested'
                     check (permission_status in ('not_requested','requested','granted','refused','not_required')),
  refresh_policy     text not null,                  -- e.g. 'daily 08:20 + 14:30 Europe/Athens'
  is_active          boolean not null default true,
  health             jsonb not null default '{}'::jsonb,
  created_at         timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Ingestion runs (§26–27): every job run is recorded, successful or not
-- ---------------------------------------------------------------------------
create table ingestion_runs (
  id              uuid primary key default gen_random_uuid(),
  source_id       text not null references sources(id),
  started_at      timestamptz not null default now(),
  finished_at     timestamptz,
  status          ingestion_status not null default 'running',
  duty_date       date,
  items_parsed    int,
  items_written   int,
  warnings        jsonb not null default '[]'::jsonb,
  error           text,
  raw_hash        text,                              -- sha256 of fetched payload
  raw_excerpt     text                               -- small evidence sample (§51)
);
create index on ingestion_runs (source_id, started_at desc);

-- ---------------------------------------------------------------------------
-- Health facilities (§17C)
-- ---------------------------------------------------------------------------
create table health_facilities (
  id                   uuid primary key default gen_random_uuid(),
  city_id              text not null references cities(id),
  type                 facility_type not null,
  natural_key          text not null,                -- normalised name|address, for dedupe
  name_local           text not null,
  name_translated      text,
  area_local           text,                         -- e.g. 'ΚΟΛΩΝΑΚΙ'
  address_local        text not null,
  location             geography(point,4326),        -- null until geocoded
  geocode_source       text,
  geocode_confidence   numeric(3,2),
  phone                text,
  emergency_department boolean,
  specialties          text[],
  accepts              text[],
  accessibility        jsonb,
  source_id            text not null references sources(id),
  source_ref           text,                         -- id at source (may be per-duty, not stable)
  first_seen_at        timestamptz not null default now(),
  last_seen_at         timestamptz not null default now(),
  last_verified_at     timestamptz,
  status               verification_status not null default 'pending',
  unique (city_id, type, natural_key)
);
create index on health_facilities using gist (location);

-- On-duty shifts. A day's rota for (source, duty_date) is replaced atomically.
create table on_duty_shifts (
  id               uuid primary key default gen_random_uuid(),
  facility_id      uuid not null references health_facilities(id) on delete cascade,
  source_id        text not null references sources(id),
  duty_date        date not null,                    -- rota day in city timezone
  starts_at        timestamptz,                      -- null if hours unparseable
  ends_at          timestamptz,
  hours_raw        text not null,                    -- always keep the source wording
  hours_parsed_ok  boolean not null,
  ingestion_run_id uuid not null references ingestion_runs(id),
  created_at       timestamptz not null default now(),
  check (starts_at is null or ends_at > starts_at)
);
create index on on_duty_shifts (source_id, duty_date);
create index on on_duty_shifts (starts_at, ends_at);

-- ---------------------------------------------------------------------------
-- Emergency contacts (§17C)
-- ---------------------------------------------------------------------------
create table emergency_contacts (
  id                   uuid primary key default gen_random_uuid(),
  country_code         char(2) not null,
  city_id              text references cities(id),   -- null = nationwide
  service              text not null,
  label_local          text not null,
  label_en             text not null,
  number               text not null,
  languages_supported  text[],
  hours                text not null default '24/7',
  sms_available        boolean,
  sort_order           int not null default 100,
  source_id            text references sources(id),
  source_url           text,
  last_verified_at     timestamptz,
  next_verification_at timestamptz,
  status               verification_status not null default 'pending',
  unique nulls not distinct (country_code, city_id, service)
);

-- ---------------------------------------------------------------------------
-- Change events (§20)
-- ---------------------------------------------------------------------------
create table change_events (
  id            uuid primary key default gen_random_uuid(),
  city_id       text not null references cities(id),
  entity_type   text not null,
  entity_id     uuid,
  change_type   text not null,          -- 'rota_published','rota_changed','facility_new',...
  summary       text not null,
  detail        jsonb not null default '{}'::jsonb,
  source_id     text references sources(id),
  detected_at   timestamptz not null default now()
);
create index on change_events (city_id, detected_at desc);

-- ---------------------------------------------------------------------------
-- Places + media + phrases (§4, §17A, §17B) — minimal; extended in later phases
-- ---------------------------------------------------------------------------
create table places (
  id               uuid primary key default gen_random_uuid(),
  city_id          text not null references cities(id),
  kind             text not null,
  name             text not null,
  name_local       text,
  wikidata_qid     text unique,
  location         geography(point,4326),
  summary          text,
  source_id        text references sources(id),
  source_url       text,
  last_verified_at timestamptz,
  status           verification_status not null default 'pending'
);
create index on places using gist (location);

create table media_assets (
  id                uuid primary key default gen_random_uuid(),
  place_id          uuid references places(id) on delete cascade,
  url               text not null,
  thumbnail_url     text,
  width             int,
  height            int,
  blurhash          text,
  alt_text          text not null,
  author            text not null,
  licence           text not null,
  licence_url       text,
  attribution_text  text not null,
  source_name       text not null,
  source_url        text not null,
  hotlink_required  boolean not null default false,
  cache_policy      text not null default 'allowed',
  is_representative boolean not null default true,
  retrieved_at      timestamptz not null default now(),
  last_verified_at  timestamptz,
  status            media_licence_status not null default 'active',
  -- §17A: only allow-listed licences may be active (no NC / ND / unknown)
  check (status <> 'active' or (
    licence ~* '^(CC0|Public domain|PD|CC BY( [0-9.]+)?|CC BY-SA( [0-9.]+)?)$'
  ))
);

create table phrases (
  id                          uuid primary key default gen_random_uuid(),
  language                    text not null,
  category                    text not null,
  intent                      text not null,
  source_language             text not null,
  source_text                 text not null,
  target_text                 text not null,
  transliteration             text,
  pronunciation_hint          text,
  register                    phrase_register not null default 'neutral',
  usage_note                  text,
  priority                    phrase_priority not null default 'useful',
  audio_url                   text,
  reviewed_by_native_speaker  boolean not null default false,
  reviewed_at                 timestamptz,
  unique (language, source_language, intent)
);

-- ---------------------------------------------------------------------------
-- User layer (§6, §7). Home location is intentionally NOT stored server-side.
-- ---------------------------------------------------------------------------
create table user_city_profiles (
  user_id        uuid not null,                     -- = auth.uid()
  city_id        text not null references cities(id),
  stay_type      text,
  arrival_date   date,
  departure_date date,
  interests      text[] not null default '{}',
  budget         text,
  ui_language    text,
  notification_preferences jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  primary key (user_id, city_id)
);

create table saved_places (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null,
  city_id         text not null references cities(id),
  role            text not null,                    -- 'university','gym','favourite_cafe','custom',...
  label           text,
  place_id        uuid references places(id),
  facility_id     uuid references health_facilities(id),
  approx_location geography(point,4326),            -- coarse (~100 m) only
  created_at      timestamptz not null default now(),
  check (role <> 'home')                            -- §6: Home stays on-device
);

-- ---------------------------------------------------------------------------
-- App read view: the latest successful pharmacy rota.
-- The app downloads the whole list (~70 rows) and computes distance ON-DEVICE,
-- so the user's location is never sent to our backend or to the source.
-- ---------------------------------------------------------------------------
create view v_pharmacy_rota_current
with (security_invoker = true) as
with latest_run as (
  select distinct on (source_id) id, source_id, duty_date, finished_at
  from ingestion_runs
  where status = 'succeeded'
  order by source_id, started_at desc
)
select
  f.id as facility_id, f.city_id, f.name_local, f.area_local, f.address_local, f.phone,
  st_y(f.location::geometry) as lat, st_x(f.location::geometry) as lng,
  s.duty_date, s.starts_at, s.ends_at, s.hours_raw, s.hours_parsed_ok,
  lr.finished_at as verified_at, src.name as source_name, src.url as source_url
from latest_run lr
join on_duty_shifts s    on s.ingestion_run_id = lr.id
join health_facilities f on f.id = s.facility_id and f.type = 'pharmacy'
join sources src         on src.id = lr.source_id
where src.domain = 'pharmacy_rota';

-- ---------------------------------------------------------------------------
-- Atomic rota ingestion (worker → service role)
-- p_payload: [{area, address, name, phone, hours_raw, hours_parsed_ok, source_ref,
--              shifts:[{starts_at, ends_at}]}]
-- ---------------------------------------------------------------------------
create or replace function ingest_pharmacy_rota(
  p_source_id   text,
  p_city_id     text,
  p_duty_date   date,
  p_payload     jsonb,
  p_raw_hash    text,
  p_raw_excerpt text,
  p_warnings    jsonb default '[]'::jsonb,
  p_min_items   int   default 20
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_run       uuid;
  v_prev_run  uuid;
  v_n         int := jsonb_array_length(p_payload);
  v_prev_keys text[];
  v_new_keys  text[];
  v_item      jsonb;
  v_shift     jsonb;
  v_fac       uuid;
  v_key       text;
  v_written   int := 0;
begin
  insert into ingestion_runs (source_id, duty_date, items_parsed, raw_hash, raw_excerpt, warnings)
  values (p_source_id, p_duty_date, v_n, p_raw_hash, left(p_raw_excerpt, 2000), p_warnings)
  returning id into v_run;

  -- §27: a suspiciously small rota never replaces a good one
  if v_n < p_min_items then
    update ingestion_runs
       set status = 'rejected_sanity_check', finished_at = now(),
           error = format('parsed %s items, minimum %s', v_n, p_min_items)
     where id = v_run;
    update sources
       set health = health || jsonb_build_object('last_failure', now(), 'last_error', 'sanity_check')
     where id = p_source_id;
    return jsonb_build_object('run_id', v_run, 'status', 'rejected_sanity_check', 'items', v_n);
  end if;

  -- previous successful run for the same duty date (change detection)
  select id into v_prev_run
  from ingestion_runs
  where source_id = p_source_id and duty_date = p_duty_date and status = 'succeeded'
  order by started_at desc limit 1;

  if v_prev_run is not null then
    select array_agg(distinct f.natural_key order by f.natural_key) into v_prev_keys
    from on_duty_shifts s join health_facilities f on f.id = s.facility_id
    where s.ingestion_run_id = v_prev_run;
  end if;

  -- replace the day's rota
  delete from on_duty_shifts where source_id = p_source_id and duty_date = p_duty_date;

  for v_item in select * from jsonb_array_elements(p_payload) loop
    v_key := lower(regexp_replace(
               coalesce(v_item->>'name','') || '|' || coalesce(v_item->>'address',''),
               '\s+', ' ', 'g'));

    insert into health_facilities as hf
      (city_id, type, natural_key, name_local, area_local, address_local, phone,
       source_id, source_ref, last_seen_at, last_verified_at, status)
    values (p_city_id, 'pharmacy', v_key, v_item->>'name', v_item->>'area',
            v_item->>'address', v_item->>'phone', p_source_id, v_item->>'source_ref',
            now(), now(), 'verified')
    on conflict (city_id, type, natural_key) do update
      set phone = excluded.phone, area_local = excluded.area_local,
          source_ref = excluded.source_ref, last_seen_at = now(),
          last_verified_at = now(), status = 'verified'
    returning hf.id into v_fac;

    if jsonb_array_length(coalesce(v_item->'shifts','[]'::jsonb)) = 0 then
      insert into on_duty_shifts (facility_id, source_id, duty_date, hours_raw, hours_parsed_ok, ingestion_run_id)
      values (v_fac, p_source_id, p_duty_date, v_item->>'hours_raw', false, v_run);
    else
      for v_shift in select * from jsonb_array_elements(v_item->'shifts') loop
        insert into on_duty_shifts (facility_id, source_id, duty_date, starts_at, ends_at,
                                    hours_raw, hours_parsed_ok, ingestion_run_id)
        values (v_fac, p_source_id, p_duty_date,
                (v_shift->>'starts_at')::timestamptz, (v_shift->>'ends_at')::timestamptz,
                v_item->>'hours_raw', true, v_run);
      end loop;
    end if;
    v_written := v_written + 1;
  end loop;

  select array_agg(distinct f.natural_key order by f.natural_key) into v_new_keys
  from on_duty_shifts s join health_facilities f on f.id = s.facility_id
  where s.ingestion_run_id = v_run;

  update ingestion_runs set status = 'succeeded', finished_at = now(), items_written = v_written
   where id = v_run;
  update sources
     set health = health || jsonb_build_object('last_success', now(), 'last_items', v_written)
   where id = p_source_id;

  -- §20 change detection
  if v_prev_run is null then
    insert into change_events (city_id, entity_type, change_type, summary, detail, source_id)
    values (p_city_id, 'pharmacy_rota', 'rota_published',
            format('On-duty pharmacy rota for %s published (%s pharmacies)', p_duty_date, v_written),
            jsonb_build_object('duty_date', p_duty_date, 'run_id', v_run), p_source_id);
  elsif v_prev_keys is distinct from v_new_keys then
    insert into change_events (city_id, entity_type, change_type, summary, detail, source_id)
    values (p_city_id, 'pharmacy_rota', 'rota_changed',
            format('On-duty pharmacy rota for %s changed after publication', p_duty_date),
            jsonb_build_object(
              'duty_date', p_duty_date, 'run_id', v_run,
              'added',   (select coalesce(jsonb_agg(k), '[]'::jsonb) from unnest(v_new_keys)  k where not k = any(coalesce(v_prev_keys,'{}'))),
              'removed', (select coalesce(jsonb_agg(k), '[]'::jsonb) from unnest(v_prev_keys) k where not k = any(coalesce(v_new_keys,'{}')))),
            p_source_id);
  end if;

  return jsonb_build_object('run_id', v_run, 'status', 'succeeded', 'items', v_written);
end;
$$;

-- Records a failed fetch/parse (worker calls this when it can't reach ingest)
create or replace function record_ingestion_failure(p_source_id text, p_error text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_run uuid;
begin
  insert into ingestion_runs (source_id, status, finished_at, error)
  values (p_source_id, 'failed', now(), left(p_error, 2000)) returning id into v_run;
  update sources set health = health || jsonb_build_object('last_failure', now(), 'last_error', left(p_error, 200))
   where id = p_source_id;
  return v_run;
end; $$;

-- Geocoding support
create view v_facilities_to_geocode
with (security_invoker = true) as
select id, city_id, name_local, area_local, address_local
from health_facilities where location is null;

create or replace function set_facility_location(p_id uuid, p_lat double precision,
  p_lng double precision, p_source text, p_confidence numeric)
returns void language sql security definer set search_path = public as $$
  update health_facilities
     set location = st_setsrid(st_makepoint(p_lng, p_lat), 4326)::geography,
         geocode_source = p_source, geocode_confidence = p_confidence
   where id = p_id;
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table cities             enable row level security;
alter table sources            enable row level security;
alter table ingestion_runs     enable row level security;
alter table health_facilities  enable row level security;
alter table on_duty_shifts     enable row level security;
alter table emergency_contacts enable row level security;
alter table change_events      enable row level security;
alter table places             enable row level security;
alter table media_assets       enable row level security;
alter table phrases            enable row level security;
alter table user_city_profiles enable row level security;
alter table saved_places       enable row level security;

-- Public city knowledge: readable by anyone; writes only via service role / definer functions
create policy read_all on cities             for select using (true);
create policy read_all on sources            for select using (true);
create policy read_all on ingestion_runs     for select using (true);
create policy read_all on health_facilities  for select using (true);
create policy read_all on on_duty_shifts     for select using (true);
create policy read_all on emergency_contacts for select using (true);
create policy read_all on change_events      for select using (true);
create policy read_all on places             for select using (true);
create policy read_active on media_assets    for select using (status = 'active');
create policy read_reviewed on phrases       for select using (reviewed_by_native_speaker); -- §17B

-- User data: owner only
create policy own_profile on user_city_profiles for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own_saved on saved_places for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Privileged functions: service role only
revoke execute on function ingest_pharmacy_rota(text,text,date,jsonb,text,text,jsonb,int) from public, anon, authenticated;
revoke execute on function record_ingestion_failure(text,text) from public, anon, authenticated;
revoke execute on function set_facility_location(uuid,double precision,double precision,text,numeric) from public, anon, authenticated;
grant  execute on function ingest_pharmacy_rota(text,text,date,jsonb,text,text,jsonb,int) to service_role;
grant  execute on function record_ingestion_failure(text,text) to service_role;
grant  execute on function set_facility_location(uuid,double precision,double precision,text,numeric) to service_role;
