import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { SolPrice } from "@/lib/types";

/** Live SOL/USD price and its 24h change. */
const getSolPrice = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/sol-price",
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<SolPrice>(fetchConfig);
  return response;
};

export default getSolPrice;
