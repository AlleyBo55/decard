// Pages that stay live at their URLs but get no links from the site while their first load is
// too slow: /sales waits on the public-RPC fallback (lib/rpc.ts), /cards on the catalogue walk
// (lib/catalog.ts). The sitemap and llms.txt still list them. Delete a path to link it again.
const HIDDEN = new Set(["/sales", "/cards"]);

/** True when `href` (a #hash or ?query allowed) points at a hidden page. */
export function isHiddenPage(href: string): boolean {
  return HIDDEN.has(href.split(/[?#]/)[0]);
}
