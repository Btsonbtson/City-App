// Cloudflare Worker: ingests the Attica on-duty pharmacy rota (ΦΣΑ) into Supabase.
//
// Flow per run:
//   1. Skip if before 08:10 Athens time (rota day starts 08:00; avoid ambiguity).
//   2. Fetch ONE public page for a fixed central point (Syntagma). The page lists
//      the whole Attica rota; users' locations are never sent to the source.
//   3. Parse → normalise hours → call ingest_pharmacy_rota() (atomic, sanity-checked,
//      change-detected in the database).
//   4. Geocode up to N facilities that still lack coordinates (Nominatim, 1 req/s).
//
// Secrets: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RUN_TOKEN (wrangler secret put ...).
// Vars:    CONTACT_EMAIL (sent in User-Agent, required by Nominatim usage policy).

import { parseRotaHtml } from "./parse.ts";
import { parseHours, localNow } from "./hours.ts";

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  CONTACT_EMAIL: string;
  SOURCE_ID?: string;
  CITY_ID?: string;
  MIN_ITEMS?: string;
  GEOCODE_BATCH?: string;
  RUN_TOKEN?: string;
}

const ROTA_URL = "https://fsa-efimeries.gr/Location/37.9755/23.7348"; // Syntagma
const EARLIEST_LOCAL = { hour: 8, minute: 10 };

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function rpc<T>(env: Env, fn: string, body: unknown): Promise<T> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`rpc ${fn} ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export async function runIngestion(env: Env, now = new Date()): Promise<unknown> {
  const sourceId = env.SOURCE_ID ?? "gr.fsa.efimeries";
  const cityId = env.CITY_ID ?? "athens";
  const local = localNow(now);
  if (local.hour * 60 + local.minute < EARLIEST_LOCAL.hour * 60 + EARLIEST_LOCAL.minute) {
    return { skipped: "before rota start", local };
  }
  const dutyDate = local.ymd;

  try {
    const res = await fetch(ROTA_URL, {
      headers: { "User-Agent": `CityGuideBot/0.1 (+mailto:${env.CONTACT_EMAIL})`, "Accept-Language": "el" },
    });
    if (!res.ok) throw new Error(`source HTTP ${res.status}`);
    const html = await res.text();

    const { items, warnings } = parseRotaHtml(html);
    warnings.push("source page carries no explicit date; duty_date derived from fetch time (Europe/Athens)");

    const payload = items.map((it) => {
      const h = parseHours(it.hours_raw, dutyDate);
      if (!h.ok) warnings.push(`hours not parsed for ${it.source_ref}: ${h.reason}`);
      return { ...it, hours_parsed_ok: h.ok, shifts: h.shifts };
    });

    const result = await rpc(env, "ingest_pharmacy_rota", {
      p_source_id: sourceId,
      p_city_id: cityId,
      p_duty_date: dutyDate,
      p_payload: payload,
      p_raw_hash: await sha256(html),
      p_raw_excerpt: html.slice(0, 2000),
      p_warnings: warnings,
      p_min_items: Number(env.MIN_ITEMS ?? 20),
    });

    await geocodeMissing(env, Number(env.GEOCODE_BATCH ?? 15));
    return result;
  } catch (err) {
    await rpc(env, "record_ingestion_failure", { p_source_id: sourceId, p_error: String(err) }).catch(() => {});
    throw err;
  }
}

// --- Geocoding (Nominatim / OpenStreetMap) --------------------------------
// Results are cached permanently per facility, so volume stays small.
// Attribution "© OpenStreetMap contributors" must be shown wherever coordinates appear.
async function geocodeMissing(env: Env, limit: number): Promise<void> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/v_facilities_to_geocode?select=*&limit=${limit}`, {
    headers: { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` },
  });
  if (!res.ok) return;
  const rows = (await res.json()) as Array<{ id: string; area_local: string | null; address_local: string }>;

  for (const r of rows) {
    const q = [r.address_local, r.area_local, "Αττική", "Ελλάδα"].filter(Boolean).join(", ");
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=gr&q=${encodeURIComponent(q)}`;
    const g = await fetch(url, { headers: { "User-Agent": `CityGuideBot/0.1 (+mailto:${env.CONTACT_EMAIL})` } });
    if (g.ok) {
      const hits = (await g.json()) as Array<{ lat: string; lon: string; importance?: number; addresstype?: string }>;
      const hit = hits[0];
      // only accept street-level precision; area-level matches would mislead "nearest" results
      if (hit && ["building", "house", "road", "amenity", "shop"].includes(hit.addresstype ?? "")) {
        await rpc(env, "set_facility_location", {
          p_id: r.id, p_lat: Number(hit.lat), p_lng: Number(hit.lon),
          p_source: "nominatim", p_confidence: Math.min(0.99, Number(hit.importance ?? 0.5)),
        });
      }
    }
    await new Promise((ok) => setTimeout(ok, 1100)); // Nominatim policy: max 1 req/s
  }
}

export default {
  async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(runIngestion(env).then((r) => console.log(JSON.stringify(r))));
  },
  // Manual trigger: POST /run with header x-run-token = RUN_TOKEN (separate secret)
  async fetch(req: Request, env: Env) {
    const url = new URL(req.url);
    if (req.method === "POST" && url.pathname === "/run" && env.RUN_TOKEN &&
        req.headers.get("x-run-token") === env.RUN_TOKEN) {
      return Response.json(await runIngestion(env));
    }
    return new Response("Not found", { status: 404 });
  },
};
