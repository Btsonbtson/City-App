\set ON_ERROR_STOP on
grant select on all tables in schema public to anon, authenticated, service_role;
grant insert, update, delete on saved_places, user_city_profiles to authenticated;

-- 1. Too-small rota is rejected and writes nothing
select ingest_pharmacy_rota('gr.fsa.efimeries','athens','2026-09-28',
  '[{"area":"Χ","address":"Α 1","name":"N","phone":"2100000000","hours_raw":"x","shifts":[]}]'::jsonb,
  'h0','ex') ->> 'status' as small_rota;
select count(*) as shifts_after_reject from on_duty_shifts;

-- 2. Build a valid 25-item rota
create temp table p as
select jsonb_agg(jsonb_build_object(
  'area','ΠΕΡΙΟΧΗ '||i, 'address','ΟΔΟΣ '||i, 'name','ΦΑΡΜΑΚΕΙΟ '||i, 'phone','210000000'||(i%10),
  'hours_raw','8 ΠΡΩΙ - 11 ΒΡΑΔΥ','source_ref',(1000+i)::text,
  'shifts', jsonb_build_array(jsonb_build_object('starts_at','2026-09-28T08:00:00+03:00','ends_at','2026-09-28T23:00:00+03:00')))) as j
from generate_series(1,25) i;

select ingest_pharmacy_rota('gr.fsa.efimeries','athens','2026-09-28',(select j from p),'h1','ex') ->> 'status' as first_run;
select count(*) as rota_rows, min(verified_at) is not null as has_verified_at from v_pharmacy_rota_current;

-- 3. Same day re-run with one pharmacy swapped → rota_changed event, no duplicates
update p set j = jsonb_set(j, '{0,name}', '"ΝΕΟ ΦΑΡΜΑΚΕΙΟ"');
select ingest_pharmacy_rota('gr.fsa.efimeries','athens','2026-09-28',(select j from p),'h2','ex') ->> 'status' as second_run;
select count(*) as rota_rows_after_rerun from v_pharmacy_rota_current;
select change_type, detail->'added' as added, detail->'removed' as removed from change_events order by detected_at;

-- 4. Rejected run later does not hide the good rota
select ingest_pharmacy_rota('gr.fsa.efimeries','athens','2026-09-29','[]'::jsonb,'h3','ex') ->> 'status' as empty_next_day;
select count(*) as rota_rows_still_visible from v_pharmacy_rota_current;

-- 5. Licence guard on media
do $$ begin
  insert into media_assets (url, alt_text, author, licence, attribution_text, source_name, source_url)
  values ('u','a','x','CC BY-NC 4.0','t','Commons','s');
  raise exception 'NC licence should have been rejected';
exception when check_violation then raise notice 'OK: NC licence rejected';
end $$;
insert into media_assets (url, alt_text, author, licence, attribution_text, source_name, source_url)
values ('u','a','x','CC BY-SA 4.0','t','Commons','s');

-- 6. Home cannot be stored server-side
do $$ begin
  insert into saved_places (user_id, city_id, role) values (gen_random_uuid(),'athens','home');
  raise exception 'home should be rejected';
exception when check_violation then raise notice 'OK: home rejected';
end $$;

insert into phrases (language,category,intent,source_language,source_text,target_text) values ('el','greetings','hello','en','Hello','Γεια σας');
-- 7. RLS: anon cannot call ingest; users only see their own saved places
set role anon;
do $$ begin
  perform ingest_pharmacy_rota('gr.fsa.efimeries','athens','2026-09-30','[]'::jsonb,'x','x');
  raise exception 'anon should not execute ingest';
exception when insufficient_privilege then raise notice 'OK: anon cannot ingest';
end $$;
select count(*) as anon_sees_unreviewed_phrases from phrases;
reset role;
insert into saved_places (user_id, city_id, role) values ('11111111-1111-1111-1111-111111111111','athens','gym'),
                                                        ('22222222-2222-2222-2222-222222222222','athens','gym');
set role authenticated;
set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select count(*) as user1_sees_saved_places from saved_places;
reset role;
