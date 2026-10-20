import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { MarketplacePage } from "@/lib/types";

/** Scanner filters. Unset fields are left out of the request. */
export interface ScannerParams {
  orderBy: string;
  search?: string;
  source?: string;
  min?: string;
  max?: string;
}

/** One page of marketplace listings; pass the previous page's `nextCursor` for the next one. */
const getScanner = async (params: ScannerParams, cursor: string | null, signal?: AbortSignal) => {
  const p = new URLSearchParams({ orderBy: params.orderBy });
  if (params.search) p.set("search", params.search);
  if (params.source) p.set("source", params.source);
  if (params.min) p.set("min", params.min);
  if (params.max) p.set("max", params.max);
  if (cursor) p.set("cursor", cursor);
  const fetchConfig: IFetchConfig = {
    url: `/api/scanner?${p}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<MarketplacePage>(fetchConfig);
  return response;
};

export default getScanner;
