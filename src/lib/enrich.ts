import "server-only";
import { CC_API, USER_AGENT } from "./constants";
import type { Activity, CardDetail } from "./types";

// Resolve on-chain asset mints to card metadata via the Collector Crypt
// catalogue. Each row carries mint candidates; the first one that resolves to a
// real card wins. Results are memoised in a bounded map so the tape doesn't
// refetch the same cards every refresh and memory stays flat.

type Resolved = Pick<
  CardDetail,
  "nftAddress" | "itemName" | "grade" | "gradingCompany" | "category" | "insuredValue"
> | null;

const MAX = 3_000;
const cache = new Map<string, Resolved>();
const inflight = new Map<string, Promise<Resolved>>();

const headers: Record<string, string> = { "User-Agent": USER_AGENT, Accept: "application/json" };
if (process.env.CC_API_KEY) headers.Authorization = `Bearer ${process.env.CC_API_KEY}`;

function remember(mint: string, value: Resolved) {
  cache.set(mint, value);
  if (cache.size > MAX) {
    // Drop the oldest tenth in one pass.
    let n = Math.ceil(MAX / 10);
    for (const k of cache.keys()) {
      cache.delete(k);
      if (--n <= 0) break;
    }
  }
}

async function resolveMint(mint: string): Promise<Resolved> {
  if (cache.has(mint)) return cache.get(mint)!;
  const pending = inflight.get(mint);
  if (pending) return pending;

  const p = (async (): Promise<Resolved> => {
    try {
      const res = await fetch(`${CC_API}/cards/publicNft/${mint}`, { headers, next: { revalidate: 300 } });
      if (!res.ok) return null;
      const d = (await res.json()) as CardDetail;
      if (!d?.nftAddress) return null;
      return {
        nftAddress: d.nftAddress,
        itemName: d.itemName,
        grade: d.grade,
        gradingCompany: d.gradingCompany,
        category: d.category,
        insuredValue: d.insuredValue,
      };
    } catch {
      return null;
    }
  })();

  inflight.set(mint, p);
  const result = await p;
  inflight.delete(mint);
  remember(mint, result);
  return result;
}

type WithCandidates = Activity & { _mintCandidates?: string[] };

/** Fill card name/grade/category on each row where resolvable. */
export async function enrichActivities(rows: WithCandidates[]): Promise<Activity[]> {
  const unique = new Set<string>();
  for (const a of rows) (a._mintCandidates ?? (a.assetMint ? [a.assetMint] : [])).forEach((m) => unique.add(m));
  await Promise.all([...unique].map(resolveMint));

  return rows.map(({ _mintCandidates, ...a }) => {
    const cands = _mintCandidates ?? (a.assetMint ? [a.assetMint] : []);
    for (const m of cands) {
      const hit = cache.get(m);
      if (hit) {
        return {
          ...a,
          assetMint: m,
          cardName: hit.itemName,
          grade: hit.grade,
          gradingCompany: hit.gradingCompany,
          category: hit.category,
          insuredValue: hit.insuredValue,
        };
      }
    }
    return a;
  });
}
