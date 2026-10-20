import "server-only";

// Tiny in-process TTL cache. Collapses duplicate concurrent polls (many
// browsers hitting /api/activity at once) into a single upstream call, and
// serves repeat reads from memory for a few seconds. Not a CDN, just a guard
// against hammering the free RPC and Collector Crypt endpoints.

interface Entry<T> {
  value: Promise<T>;
  expires: number;
}

const store = new Map<string, Entry<unknown>>();

export async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = store.get(key) as Entry<T> | undefined;
  if (hit && hit.expires > now) return hit.value;

  const value = fn().catch((e) => {
    // Don't cache failures — drop the entry so the next call retries.
    store.delete(key);
    throw e;
  });
  store.set(key, { value, expires: now + ttlMs });
  return value;
}
