import { selectView, useGachaHitsQuery, useGachaLiveQuery, useGachaMachinesQuery } from "@/store/api";

// Collector Crypt's public gacha feeds. Each polls on its own clock and pauses
// while the tab is in the background.

/** Pack openings from the last two minutes or so (about 30 a minute), newest first. */
export const useLivePulls = () =>
  useGachaLiveQuery(undefined, {
    pollingInterval: 10_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });

/** The 100 latest epic pulls (roughly 12 hours). */
export const useBigHits = () =>
  useGachaHitsQuery(undefined, {
    pollingInterval: 60_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });

/** Every public machine with its published odds, tier bands and cash-back rate. */
export const useGachaMachines = () =>
  useGachaMachinesQuery(undefined, {
    pollingInterval: 60_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
