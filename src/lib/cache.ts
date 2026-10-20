import "server-only";

// Tiny in-process TTL cache. Collapses duplicate concurrent polls (many
// browsers hitting /api/activity at once) into one upstream call and serves
// repeat reads from memory for a few seconds. Bounded so unique keys (typed
// searches, wallet lookups) can't grow memory without limit.

interface Entry<T> {
  value: Promise<T>;
  expires: number;
}

const MAX_ENTRIES = 400;
const store = new Map<string, Entry<unknown>>();

function sweep(now: number) {
  for (const [k, e] of store) if (e.expires <= now) store.delete(k);
  // Still too big: drop oldest first (Map keeps insertion order).
  while (store.size > MAX_ENTRIES) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}

export async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expires > now) return hit.value;

  const value = fn().catch((e) => {
    // Never cache failures; the next call retries upstream.
    store.delete(key);
    throw e;
  });
  store.delete(key);
  store.set(key, { value, expires: now + ttlMs });
  if (store.size > MAX_ENTRIES) sweep(now);
  return value;
}

/** Shared CDN cache header: edge caches collapse traffic from every visitor. */
export function edgeCache(sMaxAge: number, swr = sMaxAge * 4): HeadersInit {
  return { "Cache-Control": `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}` };
}
