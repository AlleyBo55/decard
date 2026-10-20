import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAPIError, isAPIError, type APIError } from "@/helpers/fetcher";
import type {
  HomeActivityPayload,
  HomeListingsPayload,
  HotBidsPayload,
  MarketplacePage,
  SolPrice,
} from "@/lib/types";
import getActivity, { type ActivityParams, type ActivityPayload } from "@/services/Activity/getActivity";
import getHighlights from "@/services/Highlights/getHighlights";
import getMarket, { type Market, type MarketParams } from "@/services/Market/getMarket";
import getSolPrice from "@/services/Price/getSolPrice";
import getHoldings from "@/services/Scanner/getHoldings";
import getScanner, { type ScannerParams } from "@/services/Scanner/getScanner";
import getSuggest, { type SuggestPayload } from "@/services/Suggest/getSuggest";

/**
 * Redux state must stay serializable, so the APIError the fetcher throws is
 * stored as a plain object with the same fields (no Error prototype or stack).
 */
function toPlainError(error: unknown): APIError {
  const e = isAPIError(error) ? error : createAPIError(error instanceof Error ? error.message : "Request failed");
  return { name: e.name, message: e.message, status: e.status ?? null, code: e.code, errors: e.errors ?? [], meta: e.meta };
}

/** Runs a service call and hands RTK Query `{ data }` or `{ error }`. The fetcher already retries once in the browser. */
async function run<T>(request: Promise<T>): Promise<{ data: T } | { error: APIError }> {
  try {
    return { data: await request };
  } catch (error) {
    return { error: toPlainError(error) };
  }
}

/** Every browser request for server data. URLs live in src/services; this adds caching, dedupe and polling. */
const api = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery<APIError>(),
  keepUnusedDataFor: 120,
  refetchOnReconnect: true,
  // Same as react-query's old staleTime: a remount refetches data older than 10s.
  refetchOnMountOrArgChange: 10,
  endpoints: (build) => ({
    solPrice: build.query<SolPrice, void>({
      queryFn: (_arg, { signal }) => run(getSolPrice(signal)),
    }),
    // The home feed in three parts, so each section renders when its own data lands.
    homeListings: build.query<HomeListingsPayload, void>({
      queryFn: (_arg, { signal }) => run(getHighlights("listings", signal)),
    }),
    homeActivity: build.query<HomeActivityPayload, void>({
      queryFn: (_arg, { signal }) => run(getHighlights("activity", signal)),
    }),
    hotBids: build.query<HotBidsPayload, void>({
      queryFn: (_arg, { signal }) => run(getHighlights("bids", signal)),
    }),
    market: build.query<Market, MarketParams>({
      queryFn: (params, { signal }) => run(getMarket(params, signal)),
    }),
    scanner: build.infiniteQuery<MarketplacePage, ScannerParams, string | null>({
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
      },
      queryFn: ({ queryArg, pageParam }, { signal }) => run(getScanner(queryArg, pageParam, signal)),
    }),
    activity: build.query<ActivityPayload, ActivityParams>({
      queryFn: (params, { signal }) => run(getActivity(params, signal)),
    }),
    holdings: build.query<MarketplacePage, string>({
      queryFn: (wallet, { signal }) => run(getHoldings(wallet, signal)),
    }),
    suggest: build.query<SuggestPayload, string>({
      queryFn: (q, { signal }) => run(getSuggest(q, signal)),
      keepUnusedDataFor: 60,
    }),
  }),
});

/**
 * `selectFromResult` for hooks that only read data, isLoading and isError: a
 * poll that just flips `isFetching` doesn't re-render them (react-query's
 * tracked props did the same). Like useQuery's default, the render before the
 * first request starts counts as loading, so the server HTML shows skeletons.
 */
export function selectView<T>(result: { data?: T; isLoading: boolean; isError: boolean; isUninitialized: boolean }) {
  return {
    data: result.data,
    isLoading: result.isLoading || (result.isUninitialized && result.data === undefined),
    isError: result.isError,
  };
}

export const {
  useSolPriceQuery,
  useHomeListingsQuery,
  useHomeActivityQuery,
  useHotBidsQuery,
  useMarketQuery,
  useScannerInfiniteQuery,
  useActivityQuery,
  useHoldingsQuery,
  useSuggestQuery,
} = api;

export default api;
