// Parses FSA duty-hour strings such as
//   "8 ΠΡΩΙ - 11 ΒΡΑΔΥ"
//   "8 ΠΡΩΙ - 2 ΜΕΣΗΜΕΡΙ & 5 ΑΠΟΓΕΥΜΑ - 8 ΠΡΩΙ ΕΠΟΜΕΝΗΣ"
//   "8 ΠΡΩΙ - 8 ΠΡΩΙ ΕΠΟΜΕΝΗΣ ΗΜΕΡΑΣ"
// into absolute shifts (ISO strings with the correct Europe/Athens offset).
// Anything not understood returns ok:false; the caller keeps the raw text and
// the app shows it verbatim instead of guessing (§9: never turn uncertainty into fact).

export const CITY_TZ = "Europe/Athens";

export interface Shift { starts_at: string; ends_at: string }
export interface HoursResult { ok: boolean; shifts: Shift[]; reason?: string }

/** Offset in minutes of `tz` at the given UTC instant (e.g. +180 for EEST). */
export function tzOffsetMinutes(utc: Date, tz = CITY_TZ): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(utc);
  const get = (t: string) => Number(parts.find((p) => p.type === t)!.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return Math.round((asUtc - utc.getTime()) / 60000);
}

/** Local wall-clock time in `tz` → ISO string with explicit offset. Handles DST. */
export function localToIso(dateYmd: string, hour: number, minute = 0, addDays = 0, tz = CITY_TZ): string {
  const [y, m, d] = dateYmd.split("-").map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d + addDays, hour, minute));
  // two passes resolve offset changes around DST transitions
  let off = tzOffsetMinutes(guess, tz);
  let utc = new Date(guess.getTime() - off * 60000);
  off = tzOffsetMinutes(utc, tz);
  utc = new Date(guess.getTime() - off * 60000);
  const sign = off >= 0 ? "+" : "-";
  const abs = Math.abs(off);
  const local = new Date(utc.getTime() + off * 60000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())}` +
    `T${pad(local.getUTCHours())}:${pad(local.getUTCMinutes())}:00${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

/** Local date (YYYY-MM-DD) and hour in `tz` for a UTC instant. */
export function localNow(utc: Date, tz = CITY_TZ): { ymd: string; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
  }).formatToParts(utc);
  const g = (t: string) => parts.find((p) => p.type === t)!.value;
  return { ymd: `${g("year")}-${g("month")}-${g("day")}`, hour: Number(g("hour")), minute: Number(g("minute")) };
}

const strip = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/\s+/g, " ").trim();

// period word → converter from 12h clock hour to 24h
const PERIODS: Array<[RegExp, (h: number) => number | null]> = [
  [/^ΠΡΩΙ(Α|ΝΟ)?$/, (h) => (h === 12 ? 0 : h <= 12 ? h : null)],
  [/^ΜΕΣΗΜΕΡΙ(Α|ΟΥ)?$/, (h) => (h === 12 ? 12 : h >= 1 && h <= 4 ? h + 12 : h >= 11 ? h : null)],
  [/^ΑΠΟΓΕΥΜΑ(ΤΟΣ)?$/, (h) => (h >= 1 && h <= 9 ? h + 12 : null)],
  [/^(ΒΡΑΔΥ|ΒΡΑΔΙ|ΒΡΑΔΙΝΟ)$/, (h) => (h === 12 ? 24 : h >= 5 && h <= 11 ? h + 12 : null)],
  [/^ΜΕΣΑΝΥΧΤ(Α|ΑΣ)$/, (h) => (h === 12 ? 24 : null)],
];

interface Point { hour: number; minute: number; nextDay: boolean }

function parsePoint(tok: string): Point | null {
  // "8 ΠΡΩΙ", "8:30 ΠΡΩΙ", "8 ΠΡΩΙ ΕΠΟΜΕΝΗΣ", "8 ΠΡΩΙ ΕΠΟΜΕΝΗΣ ΗΜΕΡΑΣ", "12 ΜΕΣΑΝΥΧΤΑ"
  const m = tok.match(/^(\d{1,2})(?:[:.](\d{2}))?\s+([Α-Ω]+)(\s+ΕΠΟΜΕΝΗΣ(\s+ΗΜΕΡΑΣ)?)?$/);
  if (!m) return null;
  const h12 = Number(m[1]);
  const minute = m[2] ? Number(m[2]) : 0;
  const conv = PERIODS.find(([re]) => re.test(m[3]));
  if (!conv) return null;
  let hour = conv[1](h12);
  if (hour === null) return null;
  let nextDay = Boolean(m[4]);
  if (hour === 24) { hour = 0; nextDay = true; }
  return { hour, minute, nextDay };
}

export function parseHours(raw: string, dutyDateYmd: string): HoursResult {
  const text = strip(raw);
  if (!text) return { ok: false, shifts: [], reason: "empty" };
  if (/24\s*ΩΡ/.test(text)) {
    return { ok: true, shifts: [{ starts_at: localToIso(dutyDateYmd, 8), ends_at: localToIso(dutyDateYmd, 8, 0, 1) }] };
  }
  const shifts: Shift[] = [];
  for (const seg of text.split(/\s*(?:&|ΚΑΙ|,)\s*/)) {
    const [a, b, ...rest] = seg.split(/\s*[-–—]\s*/);
    if (!a || !b || rest.length) return { ok: false, shifts: [], reason: `segment: ${seg}` };
    const p1 = parsePoint(a), p2 = parsePoint(b);
    if (!p1 || !p2) return { ok: false, shifts: [], reason: `time: ${seg}` };
    const startDay = p1.nextDay ? 1 : 0;
    let endDay = p2.nextDay ? 1 : 0;
    // an end earlier than the start without an explicit "next day" crosses midnight
    if (endDay === startDay && p2.hour * 60 + p2.minute <= p1.hour * 60 + p1.minute) endDay += 1;
    shifts.push({
      starts_at: localToIso(dutyDateYmd, p1.hour, p1.minute, startDay),
      ends_at: localToIso(dutyDateYmd, p2.hour, p2.minute, endDay),
    });
  }
  // shifts must be ordered and non-overlapping
  for (let i = 1; i < shifts.length; i++) {
    if (Date.parse(shifts[i].starts_at) < Date.parse(shifts[i - 1].ends_at)) {
      return { ok: false, shifts: [], reason: "overlapping shifts" };
    }
  }
  return { ok: true, shifts };
}
