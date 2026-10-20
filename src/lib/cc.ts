import "server-only";
import { CC_API, USER_AGENT } from "./constants";
import type {
  CardDetail,
  CardMarket,
  CardOffer,
  CardRow,
  MarketplacePage,
  MarketplaceQuery,
} from "./types";

// Collector Crypt refuses requests without a User-Agent at the edge, so every
// fetch here sets one. All reads are public and keyless.

const headers: Record<string, string> = {
  "User-Agent": USER_AGENT,
  Accept: "application/json",
};
if (process.env.CC_API_KEY) {
  headers.Authorization = `Bearer ${process.env.CC_API_KEY}`;
}

async function ccFetch<T>(path: string, revalidate = 15): Promise<T> {
  const res = await fetch(`${CC_API}${path}`, {
    headers,
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`CC ${res.status} on ${path}`);
  }
  return res.json() as Promise<T>;
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

export async function getCard(id: string): Promise<CardDetail | null> {
  try {
    return await ccFetch<CardDetail>(`/cards/publicNft/${id}`, 300);
  } catch {
    return null;
  }
}

export async function getCardMarket(id: string): Promise<CardMarket | null> {
  try {
    return await ccFetch<CardMarket>(`/cards/publicNft/${id}/market`, 10);
  } catch {
    return null;
  }
}

export async function getCardOffers(nftAddress: string): Promise<CardOffer[]> {
  try {
    const res = await fetch(`${CC_API}/`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ method: "getCardOffers", params: { nftAddress } }),
      next: { revalidate: 10 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as CardOffer[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
