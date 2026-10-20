import "server-only";
import { after } from "next/server";

// In-process cache for upstream reads, in front of the CDN headers below.
//
// - Fresh for `ttlMs`: served from memory.
// - Then stale-while-revalidate for `swrMs`: the old value is served at once
//   and a single background refresh runs.
// - Stale-if-error: while refreshes fail, the last good value keeps being
//   served, up to `maxStaleMs` old.
// - A failure with nothing to fall back on is replayed for `errorTtlMs`, so a
//   burst of visitors can't stampede a struggling upstream.
// - Concurrent misses share one call. A settling call only ever updates its
//   own entry, so a late failure can't clobber a newer value.
// - Bounded: expired entries go first, then the least recently written.
//
// Values are shared between callers: treat them as read-only.

export interface CacheOptions {
  /** How long past `ttlMs` a value is served while it refreshes in the background. Default 2x ttl. */
  swrMs?: number;
  /** Oldest value served while refreshes keep failing. Default 10 minutes. */
  maxStaleMs?: number;
  /** How long a failure with no value to fall back on is replayed before upstream is tried again. Default 3s. */
  errorTtlMs?: number;
}

interface Entry<T> {
  hasValue: boolean;
  value: T | undefined;
  storedAt: number;
  freshUntil: number;
  maxStaleMs: number;
  pending: Promise<T> | null;
  error: unknown;
  failed: boolean;
  /** No new upstream attempt before this (negative cache / failure backoff). */
  retryAt: number;
}

const MAX_ENTRIES = 500;
const DEFAULT_MAX_STALE_MS = 10 * 60_000;
const DEFAULT_ERROR_TTL_MS = 3_000;
const store = new Map<string, Entry<unknown>>();

function prune(now: number) {
  if (store.size <= MAX_ENTRIES) return;
  for (const [k, e] of store) {
    if (e.pending) continue;
    const dead = e.hasValue ? now - e.storedAt > e.maxStaleMs : now >= e.retryAt;
    if (dead) store.delete(k);
  }
  // Still too big: drop the least recently written (Map keeps insertion order).
  for (const k of store.keys()) {
    if (store.size <= MAX_ENTRIES) break;
    store.delete(k);
  }
}

/** Keep a serverless function alive until a background refresh settles. No-op outside a request. */
function keepAlive(p: Promise<unknown>) {
  try {
    after(p.then(noop, noop));
  } catch {
    // Not in a request scope (e.g. a refresh started by another refresh).
  }
}

function noop() {}

function refresh<T>(key: string, entry: Entry<T>, ttlMs: number, errorTtlMs: number, fn: () => Promise<T>): Promise<T> {
  const p = Promise.resolve().then(fn);
  entry.pending = p;
  p.then(
    (value) => {
      if (entry.pending !== p) return;
      const now = Date.now();
      entry.pending = null;
      entry.hasValue = true;
      entry.value = value;
      entry.storedAt = now;
      entry.freshUntil = now + ttlMs;
      entry.failed = false;
      entry.error = undefined;
      entry.retryAt = 0;
      // Re-insert as most recently written, unless a newer entry replaced this one.
      const current = store.get(key);
      if (current === entry || current === undefined) {
        store.delete(key);
        store.set(key, entry as Entry<unknown>);
        prune(now);
      }
    },
    (error) => {
      if (entry.pending !== p) return;
      entry.pending = null;
      entry.failed = true;
      entry.error = error;
      entry.retryAt = Date.now() + errorTtlMs;
    },
  );
  return p;
}

export function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>, opts: CacheOptions = {}): Promise<T> {
  const swrMs = opts.swrMs ?? ttlMs * 2;
  const maxStaleMs = Math.max(opts.maxStaleMs ?? DEFAULT_MAX_STALE_MS, ttlMs + swrMs);
  const errorTtlMs = opts.errorTtlMs ?? DEFAULT_ERROR_TTL_MS;
  const now = Date.now();
  let entry = store.get(key) as Entry<T> | undefined;

  if (entry?.hasValue) {
    const value = entry.value as T;
    if (now < entry.freshUntil) return Promise.resolve(value);
    const age = now - entry.storedAt;
    if (age <= maxStaleMs) {
      // Stale but usable: inside the SWR window, or upstream is failing (stale-if-error).
      if (age <= ttlMs + swrMs || entry.failed) {
        if (!entry.pending && now >= entry.retryAt) keepAlive(refresh(key, entry, ttlMs, errorTtlMs, fn));
        return Promise.resolve(value);
      }
      // Too old to serve blindly: wait for fresh data, fall back to the old value if that fails.
      const pending = entry.pending ?? refresh(key, entry, ttlMs, errorTtlMs, fn);
      return pending.catch(() => value);
    }
    // Past the stale-if-error limit: forget it.
    entry.hasValue = false;
    entry.value = undefined;
  }

  if (entry?.pending) return entry.pending;
  if (entry && now < entry.retryAt) return Promise.reject(entry.error);
  if (!entry) {
    entry = {
      hasValue: false,
      value: undefined,
      storedAt: 0,
      freshUntil: 0,
      maxStaleMs,
      pending: null,
      error: undefined,
      failed: false,
      retryAt: 0,
    };
    store.set(key, entry as Entry<unknown>);
    prune(now);
  }
  entry.maxStaleMs = maxStaleMs;
  return refresh(key, entry, ttlMs, errorTtlMs, fn);
}

/** Shared CDN cache header: edge caches collapse traffic from every visitor. Success responses only. */
export function edgeCache(sMaxAge: number, swr = sMaxAge * 4): HeadersInit {
  return { "Cache-Control": `public, s-maxage=${sMaxAge}, stale-while-revalidate=${swr}` };
}
