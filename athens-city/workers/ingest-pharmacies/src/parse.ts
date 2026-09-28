// Parser for the FSA public rota page (https://fsa-efimeries.gr/Location/{lat}/{lng}).
//
// Observed structure (2026-09-28): one block per on-duty pharmacy:
//   AREA
//   - address
//   - pharmacy name
//   - phone (10 digits)
//   - duty hours ("8 ΠΡΩΙ - 11 ΒΡΑΔΥ")
//   - distance from the query point ("3,1 χλμ.")
//   - link "Περισσότερα" → /Home/Details/{id}
//
// The parser is deliberately markup-agnostic: it anchors on the Details links
// and the phone line, not on CSS classes, so cosmetic HTML changes don't break it.
// Structural changes produce warnings + a low item count, which the database
// sanity check (min items) rejects instead of publishing a broken rota.

export interface RotaItem {
  area: string | null;
  address: string;
  name: string;
  phone: string;
  hours_raw: string;
  source_ref: string;
}
export interface ParseResult { items: RotaItem[]; warnings: string[] }

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

export function htmlToLines(html: string): string[] {
  const text = html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<a\b[^>]*href=["'][^"']*\/Home\/Details\/(\d+)[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, "\n@@DETAILS:$1@@\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(li|p|div|h[1-6]|tr|td|ul|ol|section|article|header|footer)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === "#") {
        const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : m;
      }
      return ENTITIES[e.toLowerCase()] ?? m;
    });
  return text.split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
}

const PHONE = /^(\+30\s?)?\d{10}$/;
const DISTANCE = /χλμ\.?$/i;
const HOURS_HINT = /(ΠΡΩΙ|ΒΡΑΔΥ|ΜΕΣΗΜΕΡΙ|ΑΠΟΓΕΥΜΑ|ΩΡΟ|\d{1,2}[:.]\d{2})/i;

export function parseRotaHtml(html: string): ParseResult {
  const lines = htmlToLines(html);
  const items: RotaItem[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();
  let buf: string[] = [];

  for (const line of lines) {
    const m = line.match(/^@@DETAILS:(\d+)@@$/);
    if (!m) { buf.push(line); continue; }
    const ref = m[1];
    const block = buf.filter((l) => l !== "Περισσότερα");
    buf = [];

    let p = -1;
    for (let i = block.length - 1; i >= 0; i--) {
      if (PHONE.test(block[i].replace(/\s/g, ""))) { p = i; break; }
    }
    if (p < 2) { warnings.push(`details ${ref}: no phone/name/address found`); continue; }

    const hours = block[p + 1] ?? "";
    if (!HOURS_HINT.test(hours) || DISTANCE.test(hours)) {
      warnings.push(`details ${ref}: unexpected hours line "${hours}"`);
    }
    const area = p >= 3 ? block[p - 3] : null;
    const item: RotaItem = {
      area: area && !DISTANCE.test(area) && !/^@@/.test(area) ? area : null,
      address: block[p - 2],
      name: block[p - 1],
      phone: block[p].replace(/\s/g, ""),
      hours_raw: hours,
      source_ref: ref,
    };
    if (seen.has(ref)) { warnings.push(`details ${ref}: duplicate`); continue; }
    seen.add(ref);
    items.push(item);
  }
  if (items.length === 0) warnings.push("no items parsed — page structure may have changed");
  return { items, warnings };
}
