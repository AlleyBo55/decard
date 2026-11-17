import "server-only";

// Merges cursor-paged listing streams into one sorted, cursor-paged stream. The Slabz view
// (app/api/scanner) uses it for Slabz's players' listings and its store.
//
// Each source pages with its own opaque cursor and is already sorted the way the merge is. The
// merged cursor records, per source, the cursor of the page holding its next unread item and how
// many items of that page were already read, so a page boundary never drops or repeats an item.
// An optional source that fails sits that page out and is retried from the same place on the next.

export interface MergeSource<T> {
  id: string;
  /** The page at `cursor`, or the first page for null. */
  page(cursor: string | null): Promise<{ items: T[]; next: string | null }>;
  /** A failure here fails the merged page; otherwise the source just sits it out. */
  required?: boolean;
}

/** Where a source stands, or 0 once it has nothing left. */
type Position = { c: string | null; n: number } | 0;
export type MergeCursor = Record<string, Position>;

/** Page loads per source in one merged page. Stops a run of empty upstream pages from looping. */
const MAX_LOADS = 8;
const MAX_UPSTREAM_CURSOR = 1_024;

export function encodeCursor(c: MergeCursor): string {
  return Buffer.from(JSON.stringify(c)).toString("base64url");
}

/** The merged cursor for these sources, or null when it isn't one (tampered, or from an older build). */
export function decodeCursor(s: string, ids: readonly string[]): MergeCursor | null {
  let raw: unknown;
  try {
    raw = JSON.parse(Buffer.from(s, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!raw || typeof raw !== "object") return null;
  const out: MergeCursor = {};
  for (const id of ids) {
    const p = (raw as Record<string, unknown>)[id];
    if (p === undefined) continue;
    if (p === 0) {
      out[id] = 0;
      continue;
    }
    const { c, n } = (p ?? {}) as { c?: unknown; n?: unknown };
    const cursorOk = c === null || (typeof c === "string" && c.length > 0 && c.length <= MAX_UPSTREAM_CURSOR);
    if (!cursorOk || typeof n !== "number" || !Number.isInteger(n) || n < 0 || n > 500) return null;
    out[id] = { c: c as string | null, n };
  }
  return out;
}

interface Lane<T> {
  src: MergeSource<T>;
  /** Unread items of the loaded page. */
  buf: T[];
  next: string | null;
  /** The loaded page's cursor and how many of its items are read. */
  pos: { c: string | null; n: number };
  /** Failed this request: sits the rest of the page out. */
  out: boolean;
  loads: number;
}

/**
 * Up to `size` items in `before` order, from where `at` left off (null: the start). `next` is null
 * once every source is exhausted, or when nothing could be served (so a failing optional source
 * can't keep an empty "load more" alive).
 */
export async function mergePage<T>(
  sources: MergeSource<T>[],
  at: MergeCursor | null,
  size: number,
  before: (a: T, b: T) => boolean,
): Promise<{ items: T[]; next: MergeCursor | null }> {
  const lanes = await Promise.all(
    sources.map(async (src): Promise<Lane<T> | null> => {
      const p = at?.[src.id];
      if (p === 0) return null;
      const pos = p ?? { c: null, n: 0 };
      try {
        const page = await src.page(pos.c);
        return { src, buf: page.items.slice(pos.n), next: page.next, pos: { ...pos }, out: false, loads: 1 };
      } catch (error) {
        if (src.required) throw error;
        return { src, buf: [], next: null, pos: { ...pos }, out: true, loads: 1 };
      }
    }),
  );
  const live = lanes.filter((l): l is Lane<T> => l !== null);

  const items: T[] = [];
  while (items.length < size) {
    // A source whose page ran out moves to its next page before anything is compared: that page
    // may hold the next item overall.
    for (const lane of live) {
      while (!lane.out && lane.buf.length === 0 && lane.next !== null && lane.loads < MAX_LOADS) {
        const cursor = lane.next;
        lane.loads += 1;
        try {
          const page = await lane.src.page(cursor);
          lane.pos = { c: cursor, n: 0 };
          lane.buf = page.items.slice();
          lane.next = page.next;
        } catch (error) {
          if (lane.src.required) throw error;
          lane.pos = { c: cursor, n: 0 }; // its next unread item opens that page
          lane.out = true;
        }
      }
    }
    let best: Lane<T> | undefined;
    for (const lane of live) {
      if (lane.buf.length > 0 && (!best || before(lane.buf[0], best.buf[0]))) best = lane;
    }
    if (!best) break;
    items.push(best.buf.shift() as T);
    best.pos.n += 1;
  }

  const next: MergeCursor = {};
  let open = false;
  for (const src of sources) {
    const lane = live.find((l) => l.src === src);
    if (!lane || (!lane.out && lane.buf.length === 0 && lane.next === null)) {
      next[src.id] = 0;
    } else {
      next[src.id] = lane.pos;
      open = true;
    }
  }
  return { items, next: open && items.length > 0 ? next : null };
}
