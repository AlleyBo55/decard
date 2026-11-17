import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { MarketplacePage } from "@/lib/types";

/** Up to 100 Collector Crypt cards held by a wallet, priciest first. `devnet` reads its devnet cards. */
const getHoldings = async (wallet: string, signal?: AbortSignal, devnet = false) => {
  const p = new URLSearchParams({ ownerAddress: wallet, step: "100", orderBy: "priceDesc" });
  if (devnet) p.set("network", "devnet");
  const fetchConfig: IFetchConfig = {
    url: `/api/scanner?${p}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<MarketplacePage>(fetchConfig);
  return response;
};

export default getHoldings;
