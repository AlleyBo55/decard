import { connection } from "next/server";
import { cardPartNames, catalogSoon, pagePartNames, renderIndex, XML_HEADERS } from "@/lib/sitemap";

// /sitemap.xml is a sitemap index naming the parts under /sitemaps/ (lib/sitemap.ts). The pages
// parts are always listed; the card parts appear once the catalogue has been read after a start.

export const maxDuration = 30;

export async function GET() {
  await connection();
  const catalog = await catalogSoon();
  const now = new Date().toISOString();
  const parts = pagePartNames().map((name) => ({ name, lastmod: now }));
  if (catalog) {
    const read = new Date(catalog.fetchedAt).toISOString();
    parts.push(...cardPartNames(catalog.cards.length).map((name) => ({ name, lastmod: read })));
  }
  return new Response(renderIndex(parts), {
    headers: { ...XML_HEADERS, "Cache-Control": catalog ? "public, max-age=900" : "no-store" },
  });
}
