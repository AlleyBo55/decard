import "server-only";
import fetcher, { createAPIError, isAPIError } from "@/helpers/fetcher";
import { CC_API } from "./constants";
import { cached } from "./cache";
import type { CardDetail, CardMarket, CardOffer, CardRow, MarketplacePage, MarketplaceQuery } from "./types";

// Collector Crypt reads are public; the fetcher sets the User-Agent CC requires
// and holds us to its rate limit. An optional server-only CC_API_KEY raises it.

const CC_KEY = process.env.CC_API_KEY || undefined;
const auth = { isPublic: !CC_KEY, userToken: CC_KEY };

function ccFetch<T>(path: string, revalidate = 15): Promise<T> {
  return fetcher<T>({ url: `${CC_API}${path}`, method: "GET", ...auth, next: { revalidate } });
}

export async function getMarketplace(q: MarketplaceQuery): Promise<MarketplacePage> {
  const params = new URLSearchParams();
  params.set("step", String(q.step ?? 50));
  if (q.cursor) params.set("cursor", q.cursor);
  else if (q.page) params.set("page", String(q.page));
  params.set("orderBy", q.orderBy ?? "listedDateDesc");
  if (q.search) params.set("search", q.search);
  if (q.ownerAddress) params.set("ownerAddress", q.ownerAddress);
  if (q.marketplaceSource) params.set("marketplaceSource", q.marketplaceSource);
  if (q.listPriceMin != null) params.set("listPriceMin", String(q.listPriceMin));
  if (q.listPriceMax != null) params.set("listPriceMax", String(q.listPriceMax));

  const raw = await ccFetch<{
    filterNFtCard: CardRow[];
    nextCursor: string | null;
    findTotal: number;
    total: number;
    totalPages: number;
    cardsQtyByCategory: Record<string, number>;
  }>(`/marketplace?${params}`);

  return {
    cards: raw.filterNFtCard ?? [],
    nextCursor: raw.nextCursor ?? null,
    findTotal: raw.findTotal ?? 0,
    total: raw.total ?? 0,
    totalPages: raw.totalPages ?? 0,
    cardsQtyByCategory: raw.cardsQtyByCategory ?? {},
  };
}

/**
 * Catalogue record (name, grade, images, pop report). It barely changes, so it
 * is cached for an hour. Null only when Collector Crypt says the card doesn't
 * exist (404); any other failure throws, so callers can tell "no such card"
 * from "upstream down".
 */
export async function getCard(id: string): Promise<CardDetail | null> {
  try {
    const card = await ccFetch<CardDetail>(`/cards/publicNft/${id}`, 3_600);
    return card?.nftAddress ? card : null;
  } catch (e) {
    if (isAPIError(e) && e.status === 404) return null;
    throw e;
  }
}

export async function getCardMarket(id: string): Promise<CardMarket | null> {
  try {
    return await ccFetch<CardMarket>(`/cards/publicNft/${id}/market`, 10);
  } catch {
    return null;
  }
}

/**
 * Live offers on a card, price normalised to a number, best first. A failed
 * read throws (the cache keeps serving the last good list for a while), so a
 * Collector Crypt outage never shows up as "no bids".
 */
export function getCardOffers(nftAddress: string): Promise<CardOffer[]> {
  return cached(`cc:offers:${nftAddress}`, 30_000, async () => {
    const data = await fetcher<CardOffer[]>({
      url: `${CC_API}/`,
      method: "POST",
      ...auth,
      body: { method: "getCardOffers", params: { nftAddress } },
      idempotent: true,
    });
    if (!Array.isArray(data)) throw createAPIError("Unexpected getCardOffers response", 502, "BAD_RESPONSE");
    return data
      .map((o) => ({ ...o, price: Number(o.price) }))
      .filter((o) => Number.isFinite(o.price))
      .sort((a, b) => Number(b.price) - Number(a.price));
  });
}
