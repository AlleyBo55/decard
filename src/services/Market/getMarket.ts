import fetcher, { type IFetchConfig } from "@/helpers/fetcher";

export interface MarketTop {
  price: number;
  currency: string;
  mint: string;
  name: string;
}

export interface Market {
  listed: number;
  floor: MarketTop | null;
  ceiling: MarketTop | null;
}

/** Empty strings mean "all categories" / "all venues". */
export interface MarketParams {
  category: string;
  source: string;
}

/** Listed count, floor and top listing for a category on one venue or all. */
const getMarket = async ({ category, source }: MarketParams, signal?: AbortSignal) => {
  const p = new URLSearchParams();
  if (category) p.set("category", category);
  if (source) p.set("source", source);
  const fetchConfig: IFetchConfig = {
    url: `/api/market?${p}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<Market>(fetchConfig);
  return response;
};

export default getMarket;
