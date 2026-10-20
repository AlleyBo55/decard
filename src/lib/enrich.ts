import "server-only";
import { CC_API, USER_AGENT } from "./constants";
import type { Activity, CardDetail } from "./types";

// Resolve on-chain asset mints to card metadata via the Collector Crypt
// catalogue. The RPC decoder leaves one or more mint candidates per row;
// we look each up and keep the first that is a real card. Results are memoised
// in-process for the life of the server so the tape doesn't re-fetch the same
// cards every refresh.

type MintResolution = Pick<
  CardDetail,
  "nftAddress" | "itemName" | "grade" | "gradingCompany" | "category" | "insuredValue"
> | null;

const cache = new Map<string, MintResolution>();
const inflight = new Map<string, Promise<MintResolution>>();

const headers: Record<string, string> = {
  "User-Agent": USER_AGENT,
  Accept: "application/json",
};
if (process.env.CC_API_KEY) headers.Authorization = `Bearer ${process.env.CC_API_KEY}`;

async function resolveMint(mint: string): Promise<MintResolution> {
  if (cache.has(mint)) return cache.get(mint)!;
  if (inflight.has(mint)) return inflight.get(mint)!;

  const p = (async (): Promise<MintResolution> => {
    try {
      const res = await fetch(`${CC_API}/cards/publicNft/${mint}`, {
        headers,
        next: { revalidate: 300 },
      });
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
  cache.set(mint, result);
  return result;
}

/** Fill card name/grade/category/image on each activity row where resolvable. */
export async function enrichActivities(activities: Activity[]): Promise<Activity[]> {
  // Gather every candidate mint across all rows, resolve the unique set once.
  const unique = new Set<string>();
  for (const a of activities) {
    const cands =
      (a as Activity & { _mintCandidates?: string[] })._mintCandidates ??
      (a.assetMint ? [a.assetMint] : []);
    cands.forEach((m) => unique.add(m));
  }

  await Promise.all([...unique].map((m) => resolveMint(m)));

  return activities.map((a) => {
    const cands =
      (a as Activity & { _mintCandidates?: string[] })._mintCandidates ??
      (a.assetMint ? [a.assetMint] : []);
    let hit: MintResolution = null;
    let hitMint: string | null = null;
    for (const m of cands) {
      const r = cache.get(m);
      if (r) {
        hit = r;
        hitMint = m;
        break;
      }
    }
    // Drop the transient candidates before returning to the client.
    const { _mintCandidates, ...clean } = a as Activity & { _mintCandidates?: string[] };
    void _mintCandidates;
    if (!hit) return { ...clean, assetMint: a.assetMint ?? null };
    return {
      ...clean,
      assetMint: hitMint,
      cardName: hit.itemName,
      grade: hit.grade,
      gradingCompany: hit.gradingCompany,
      category: hit.category,
      insuredValue: hit.insuredValue,
    };
  });
}
