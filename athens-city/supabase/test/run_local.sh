#!/usr/bin/env bash
# Runs the migration, seed and SQL tests against a throwaway local Postgres+PostGIS DB.
set -euo pipefail
cd "$(dirname "$0")/.."
DB=${DB:-city_test}
dropdb --if-exists "$DB"; createdb "$DB"
psql -q -v ON_ERROR_STOP=1 -d "$DB" \
  -f test/00_supabase_stub.sql -f migrations/0001_foundation.sql -f seed/athens.sql -f test/10_ingest_test.sql
