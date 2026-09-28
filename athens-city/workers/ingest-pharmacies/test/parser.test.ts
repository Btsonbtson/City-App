import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseRotaHtml, htmlToLines } from "../src/parse.ts";
import { parseHours, localToIso, localNow } from "../src/hours.ts";

const fixture = readFileSync(new URL("./fixtures/fsa-2026-09-28.reconstructed.html", import.meta.url), "utf8");

// ---------------------------------------------------------------- page parser
test("parses every pharmacy block from the fixture", () => {
  const { items, warnings } = parseRotaHtml(fixture);
  assert.equal(items.length, 22);
  assert.deepEqual(warnings, []);
  assert.deepEqual(items[0], {
    area: "ΧΑΙΔΑΡΙ", address: "ΡΙΜΙΝΙ 28", name: "ΜΥΛΩΝΑ ΜΑΡΙΑ - ΜΥΛΩΝΑ ΕΥΑΓΓΕΛΙΑ Ο.Ε",
    phone: "2105812139", hours_raw: "8 ΠΡΩΙ - 11 ΒΡΑΔΥ", source_ref: "291106",
  });
});

test("decodes entities: '&' inside an address survives", () => {
  const item = parseRotaHtml(fixture).items.find((i) => i.source_ref === "291122")!;
  assert.equal(item.address, "ΑΘΗΝΩΝ 55 & ΣΤΡΑΤΗΓΟΥ ΛΙΟΣΗ");
});

test("markup-agnostic: same data in a different layout parses identically", () => {
  const alt = fixture
    .replace(/<ul>|<\/ul>/g, "")
    .replace(/<li>/g, '<p class="x">').replace(/<\/li>/g, "</p>")
    .replace(/<div class="area">/g, "<h4>").replace(/<\/div>/g, "</h4>");
  assert.deepEqual(parseRotaHtml(alt).items, parseRotaHtml(fixture).items);
});

test("a changed page yields warnings and zero items (DB sanity check then rejects)", () => {
  const { items, warnings } = parseRotaHtml("<html><body><h1>Συντήρηση</h1></body></html>");
  assert.equal(items.length, 0);
  assert.match(warnings.join(" "), /structure may have changed/);
});

test("block without phone is skipped with a warning, others kept", () => {
  const broken = fixture.replace("<li>2105812139</li>", "<li>—</li>");
  const { items, warnings } = parseRotaHtml(broken);
  assert.equal(items.length, 21);
  assert.match(warnings[0], /291106/);
});

test("header lines never leak into the first item", () => {
  const lines = htmlToLines(fixture);
  assert.ok(lines.includes("Index"));
  assert.notEqual(parseRotaHtml(fixture).items[0].area, "Index");
});

// ---------------------------------------------------------------- hours
test("simple day shift, summer time (EEST +03:00)", () => {
  assert.deepEqual(parseHours("8 ΠΡΩΙ - 11 ΒΡΑΔΥ", "2026-09-28"), {
    ok: true, shifts: [{ starts_at: "2026-09-28T08:00:00+03:00", ends_at: "2026-09-28T23:00:00+03:00" }],
  });
});

test("split shift with overnight second part", () => {
  const r = parseHours("8 ΠΡΩΙ - 2 ΜΕΣΗΜΕΡΙ & 5 ΑΠΟΓΕΥΜΑ - 8 ΠΡΩΙ ΕΠΟΜΕΝΗΣ", "2026-09-28");
  assert.equal(r.ok, true);
  assert.deepEqual(r.shifts, [
    { starts_at: "2026-09-28T08:00:00+03:00", ends_at: "2026-09-28T14:00:00+03:00" },
    { starts_at: "2026-09-28T17:00:00+03:00", ends_at: "2026-09-29T08:00:00+03:00" },
  ]);
});

test("24h duty written as 'ΕΠΟΜΕΝΗΣ ΗΜΕΡΑΣ'", () => {
  assert.deepEqual(parseHours("8 ΠΡΩΙ - 8 ΠΡΩΙ ΕΠΟΜΕΝΗΣ ΗΜΕΡΑΣ", "2026-09-28").shifts,
    [{ starts_at: "2026-09-28T08:00:00+03:00", ends_at: "2026-09-29T08:00:00+03:00" }]);
});

test("every hours string in the fixture parses", () => {
  for (const it of parseRotaHtml(fixture).items) {
    assert.equal(parseHours(it.hours_raw, "2026-09-28").ok, true, it.hours_raw);
  }
});

test("winter time uses +02:00", () => {
  assert.equal(parseHours("8 ΠΡΩΙ - 9 ΒΡΑΔΥ", "2026-12-01").shifts[0].ends_at, "2026-12-01T21:00:00+02:00");
});

test("overnight shift across the October DST change keeps correct offsets", () => {
  // DST ends 2026-10-25 04:00 EEST → 03:00 EET
  const r = parseHours("5 ΑΠΟΓΕΥΜΑ - 8 ΠΡΩΙ ΕΠΟΜΕΝΗΣ", "2026-10-24");
  assert.deepEqual(r.shifts, [{ starts_at: "2026-10-24T17:00:00+03:00", ends_at: "2026-10-25T08:00:00+02:00" }]);
});

test("unknown wording is refused, not guessed", () => {
  assert.equal(parseHours("ΚΑΤΟΠΙΝ ΤΗΛΕΦΩΝΙΚΗΣ ΣΥΝΝΕΝΟΗΣΗΣ", "2026-09-28").ok, false);
  assert.equal(parseHours("8 ΠΡΩΙ - 15 ΒΡΑΔΥ", "2026-09-28").ok, false);
  assert.equal(parseHours("", "2026-09-28").ok, false);
});

test("accented/lowercase input is normalised", () => {
  assert.equal(parseHours("8 πρωί - 11 βράδυ", "2026-09-28").ok, true);
});

// ---------------------------------------------------------------- time helpers
test("local date/hour in Athens from a UTC instant", () => {
  assert.deepEqual(localNow(new Date("2026-09-28T05:20:00Z")), { ymd: "2026-09-28", hour: 8, minute: 20 });
  assert.deepEqual(localNow(new Date("2026-12-31T22:30:00Z")), { ymd: "2027-01-01", hour: 0, minute: 30 });
});

test("localToIso handles month rollover", () => {
  assert.equal(localToIso("2026-09-30", 8, 0, 1), "2026-10-01T08:00:00+03:00");
});
