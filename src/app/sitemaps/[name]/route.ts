import { connection } from "next/server";
import { isLocale } from "@/lib/i18n";
import { CARDS_PER_FILE, cardEntries, catalogSoon, pageEntries, renderUrlset, XML_HEADERS } from "@/lib/sitemap";

// /sitemaps/pages-<lang>.xml and /sitemaps/cards-N.xml: the parts named by /sitemap.xml
// (lib/sitemap.ts). Each part is rebuilt only when the catalogue refreshes (every ~6 hours).

export const maxDuration = 30;

const built = new Map<string, { key: number; body: string }>();
const cached = (headers: Record<string, string> = {}) => ({ ...XML_HEADERS, "Cache-Control": "public, max-age=900", ...headers });

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  await connection();
  const { name } = await params;
  const m = /^(?:pages-([a-z]{2})|cards-(\d{1,3}))\.xml$/.exec(name);
  if (!m) return new Response("Not found", { status: 404 });
  const catalog = await catalogSoon();

  if (m[1] !== undefined) {
    const lang = m[1];
    if (!isLocale(lang)) return new Response("Not found", { status: 404 });
    // Without the catalogue the directory page count is unknown, so that answer isn't cached.
    if (!catalog) return new Response(renderUrlset(pageEntries(null, new Date().toISOString()), lang), { headers: { ...XML_HEADERS, "Cache-Control": "no-store" } });
    const key = `pages-${lang}`;
    if (built.get(key)?.key !== catalog.fetchedAt) {
      built.set(key, { key: catalog.fetchedAt, body: renderUrlset(pageEntries(catalog, new Date(catalog.fetchedAt).toISOString()), lang) });
    }
    return new Response(built.get(key)!.body, { headers: cached() });
  }

  if (!catalog) return new Response("The card list is still loading. Try again in a minute.", { status: 503, headers: { "Retry-After": "60", "Cache-Control": "no-store" } });
  const part = Number(m[2]);
  const start = (part - 1) * CARDS_PER_FILE;
  if (part < 1 || start >= catalog.cards.length) return new Response("Not found", { status: 404 });
  const key = `cards-${part}`;
  if (built.get(key)?.key !== catalog.fetchedAt) {
    const all = cardEntries(catalog, new Date(catalog.fetchedAt).toISOString());
    built.set(key, { key: catalog.fetchedAt, body: renderUrlset(all.slice(start, start + CARDS_PER_FILE)) });
    // Drop card parts that no longer exist (the catalogue shrank).
    for (const k of [...built.keys()]) if (k.startsWith("cards-") && (Number(k.slice(6)) - 1) * CARDS_PER_FILE >= catalog.cards.length) built.delete(k);
  }
  return new Response(built.get(key)!.body, { headers: cached() });
}
