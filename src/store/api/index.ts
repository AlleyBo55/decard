import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAPIError, isAPIError, type APIError } from "@/helpers/fetcher";
import type {
  BigHitsPayload,
  GachaMachinesPayload,
  GachaOddsPayload,
  HomeActivityPayload,
  HomeListingsPayload,
  HotBidsPayload,
  LivePullsPayload,
  MarketplacePage,
  PullLuckPayload,
  SolPrice,
  WalletPullsPayload,
} from "@/lib/types";
import getActivity, { type ActivityParams, type ActivityPayload } from "@/services/Activity/getActivity";
import getBigHits from "@/services/Gacha/getBigHits";
import getGachaMachines from "@/services/Gacha/getGachaMachines";
import getGachaOdds from "@/services/Gacha/getGachaOdds";
import getLivePulls from "@/services/Gacha/getLivePulls";
import getHighlights from "@/services/Highlights/getHighlights";
import getLuck from "@/services/Luck/getLuck";
import getWalletPulls from "@/services/Luck/getWalletPulls";
import getMarket, { type Market, type MarketParams } from "@/services/Market/getMarket";
import getSolPrice from "@/services/Price/getSolPrice";
import getHoldings from "@/services/Scanner/getHoldings";
import getScanner, { type ScannerParams } from "@/services/Scanner/getScanner";
import getSuggest, { type SuggestPayload } from "@/services/Suggest/getSuggest";
import { getMyPulls, getRipConfig, getRipHits, getRipPacks, getRipPool, type PoolParams } from "@/services/Rip";
import getLeaderboard from "@/services/Gym/getLeaderboard";
import getLeague from "@/services/Gym/getLeague";
import getRipPreview from "@/services/Gym/getRipPreview";
import type { DecardLeaderboard, RipPreview, SlabzLeague } from "@/services/Gym/types";
import type { Page, PoolCard, RipConfig, RipHit, RipPack, RipTx } from "@/lib/rip/types";

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
    luck: build.query<PullLuckPayload, string>({
      queryFn: (memo, { signal }) => run(getLuck(memo, signal)),
    }),
    walletPulls: build.query<WalletPullsPayload, string>({
      queryFn: (wallet, { signal }) => run(getWalletPulls(wallet, signal)),
    }),
    // A wallet address (mainnet), or { wallet, network: "devnet" } for the redeem page on a devnet backend.
    holdings: build.query<MarketplacePage, string | { wallet: string; network: "devnet" }>({
      queryFn: (arg, { signal }) =>
        run(typeof arg === "string" ? getHoldings(arg, signal) : getHoldings(arg.wallet, signal, true)),
    }),
    suggest: build.query<SuggestPayload, string>({
      queryFn: (q, { signal }) => run(getSuggest(q, signal)),
      keepUnusedDataFor: 60,
    }),
    // Live gacha: Collector Crypt's public pack feeds.
    gachaLive: build.query<LivePullsPayload, void>({
      queryFn: (_arg, { signal }) => run(getLivePulls(signal)),
    }),
    gachaHits: build.query<BigHitsPayload, void>({
      queryFn: (_arg, { signal }) => run(getBigHits(signal)),
    }),
    gachaMachines: build.query<GachaMachinesPayload, void>({
      queryFn: (_arg, { signal }) => run(getGachaMachines(signal)),
    }),
    // The server caches each machine's odds for 5 minutes; keep switched-away machines as long.
    gachaOdds: build.query<GachaOddsPayload, string>({
      queryFn: (code, { signal }) => run(getGachaOdds(code, signal)),
      keepUnusedDataFor: 300,
    }),
    // Rip: Slabz packs through decardbe (services/Rip).
    ripConfig: build.query<RipConfig, void>({
      queryFn: (_arg, { signal }) => run(getRipConfig(signal)),
      keepUnusedDataFor: 3600,
    }),
    ripPacks: build.query<RipPack[], void>({
      queryFn: (_arg, { signal }) => run(getRipPacks(signal)),
    }),
    ripPool: build.infiniteQuery<Page<PoolCard>, PoolParams, string | null>({
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (last) => (last.hasMore && last.cursor ? last.cursor : null),
      },
      queryFn: ({ queryArg, pageParam }, { signal }) => run(getRipPool(queryArg, pageParam, signal)),
    }),
    ripHits: build.query<RipHit[], void>({
      queryFn: (_arg, { signal }) => run(getRipHits(signal)),
    }),
    // Keyed by wallet so a sign-in as someone else never shows the last wallet's pulls.
    myPulls: build.infiniteQuery<Page<RipTx>, string, string | null>({
      infiniteQueryOptions: {
        initialPageParam: null,
        getNextPageParam: (last) => (last.hasMore && last.cursor ? last.cursor : null),
      },
      queryFn: ({ pageParam }, { signal }) => run(getMyPulls(undefined, pageParam, signal)),
      keepUnusedDataFor: 0,
    }),
    // Gym: the rip league (services/Gym). Decard trainers from decardbe, Slabz players from Slabz's winners feed.
    ripLeaderboard: build.query<DecardLeaderboard, void>({
      queryFn: (_arg, { signal }) => run(getLeaderboard(signal)),
    }),
    slabzLeague: build.query<SlabzLeague, void>({
      queryFn: (_arg, { signal }) => run(getLeague(signal)),
    }),
    // Development only (?preview=1): the production catalog snapshot, read once.
    ripPreview: build.query<RipPreview, void>({
      queryFn: (_arg, { signal }) => run(getRipPreview(signal)),
      keepUnusedDataFor: 3600,
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
  useLuckQuery,
  useWalletPullsQuery,
  useHoldingsQuery,
  useSuggestQuery,
  useGachaLiveQuery,
  useGachaHitsQuery,
  useGachaMachinesQuery,
  useGachaOddsQuery,
  useRipConfigQuery,
  useRipPacksQuery,
  useRipPoolInfiniteQuery,
  useRipHitsQuery,
  useMyPullsInfiniteQuery,
  useRipLeaderboardQuery,
  useSlabzLeagueQuery,
  useRipPreviewQuery,
} = api;

export default api;
