import { selectView, useHomeActivityQuery, useHomeListingsQuery, useHotBidsQuery } from "@/store/api";

// The home feed as three independent queries: each section renders the moment
// its own part lands instead of waiting for the slowest one.

/** Rails (newest, top, best deals) and category counts. Shared by the hero, the ticker and the rails. */
export const useHomeListings = () =>
  useHomeListingsQuery(undefined, {
    pollingInterval: 30_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });

/** Latest decoded on-chain moves and sales. */
export const useHomeActivity = () =>
  useHomeActivityQuery(undefined, {
    pollingInterval: 15_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });

/** Best live bid on the cards currently getting offers. */
export const useHotBids = () =>
  useHotBidsQuery(undefined, {
    pollingInterval: 20_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
