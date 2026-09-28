# City Guide: Athens, Phase 3 foundation

This is the first vertical slice of the City Intelligence app: the core schema plus the first live data source, the Attica on-duty pharmacy rota.

## Structure

```
docs/CITY_INTELLIGENCE_MOBILE_APP_SKILL.md   product spec (§ references in code point here)
prototype/index.html               clickable design prototype (open in a browser)
.cursor/rules/city-guide.mdc       project rules Cursor loads automatically
supabase/
  migrations/0001_foundation.sql   schema, ingestion function, views, RLS
  seed/athens.sql                  city, source registry, emergency numbers (pending)
  test/00_supabase_stub.sql        local-only stub of Supabase roles + auth.uid()
  test/10_ingest_test.sql          database tests
  test/run_local.sh                runs migration + seed + tests on a throwaway DB
workers/ingest-pharmacies/         Cloudflare Worker (cron) → Supabase RPC
  src/parse.ts                     markup-tolerant parser for the ΦΣΑ rota page
  src/hours.ts                     Greek duty-hours parser, Europe/Athens DST-safe
  src/index.ts                     fetch → parse → ingest → geocode
  test/parser.test.ts              16 unit tests
  test/fixtures/…reconstructed.html
```

## How the pharmacy slice works

1. **Schedule.** The worker runs about three times a day. It skips any run before 08:10 Athens time, because the rota day starts at 08:00.
2. **One fetch per run.** It requests a single public page for a fixed point (Syntagma), which lists the entire Attica rota. Users' locations are never sent to the source or to our backend.
3. **Parse.** The parser anchors on the Details links and phone numbers rather than CSS, so cosmetic HTML changes don't break it.
4. **Hours.** Opening hours are parsed into absolute time ranges, with DST handled correctly. Anything unrecognised is kept verbatim and flagged; it is never guessed.
5. **Ingest atomically.** `ingest_pharmacy_rota()` replaces the day's rota in one transaction. It:
   - rejects suspiciously small results (under 20 pharmacies), so a broken page never replaces a good rota;
   - records every run, including the raw-page hash and an excerpt as evidence;
   - emits `rota_published` or `rota_changed` change events, listing which pharmacies were added or removed.
6. **App side.** The app downloads `v_pharmacy_rota_current` (about 70 rows), caches it for offline use, and computes "open now, nearest" on the device. It always shows `verified_at` and the source link.
7. **Geocoding.** Pharmacy locations are geocoded once and cached (Nominatim, 1 request per second). Only street-level matches are accepted.

## Run locally

```bash
# database (needs Postgres 16 + PostGIS)
supabase/test/run_local.sh

# worker
cd workers/ingest-pharmacies && npm i && npm test && npm run typecheck
```

## Deploy

```bash
supabase db push                       # or apply the migration + seed via the SQL editor
cd workers/ingest-pharmacies
wrangler secret put SUPABASE_URL
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put RUN_TOKEN
# set CONTACT_EMAIL in wrangler.toml, then:
wrangler deploy
curl -X POST https://<worker>/run -H "x-run-token: $RUN_TOKEN"   # first manual run
```

## Before release: verification checklist

- [ ] **Emergency numbers.** Verify each seeded number against an official Greek source. Set `status='verified'` and fill in `source_url` and `last_verified_at`. Until then, the SOS screen shows only 112, plus the other numbers labelled "unverified".
- [ ] **ΦΣΑ permission.** Email the Pharmaceutical Association of Attica, describe the use (one request per run, attribution, link back), and ask for permission or a feed. Also check `robots.txt` and the site terms. Record the outcome in `sources.permission_status`.
- [ ] **Real fixture.** The current fixture is reconstructed from the page text, not raw HTML. Replace it with a raw capture (`curl https://fsa-efimeries.gr/Location/37.9755/23.7348 > test/fixtures/fsa-raw.html`) and rerun the tests.
- [ ] **Day boundary.** Confirm what the page shows between 00:00 and 08:00: the previous day's rota or the next one. Runs before 08:10 are skipped until this is known.
- [ ] **Piraeus.** Piraeus pharmacies belong to a separate association (ΦΣ Πειραιώς). Add it as a second source.
- [ ] **OSM attribution.** Show "© OpenStreetMap contributors" wherever geocoded pharmacy locations appear on a map.
- [ ] **GTFS licence.** Confirm the current licence on the data.gov.gr datasets before any commercial use.

## Deliberately not done yet

- **Hospital rota ingestion.** The Ministry of Health publishes on-duty schedules as announcements and documents. The format needs analysis first, so the MVP uses manual entry with human review (§25). The schema (`health_facilities`, `on_duty_shifts`) already supports it.
- **OASA real-time adapter.** This uses an undocumented endpoint and waits on a permission request.
- The Commons image pipeline, the phrasebook content, and the mobile app itself.
