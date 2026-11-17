import { useMemo } from "react";
import type { RipPreview } from "@/services/Gym/types";
import { selectView, useRipLeaderboardQuery, useSlabzLeagueQuery } from "@/store/api";
import { sampleBoard } from "./sample";
// The two ladders on /gym. Each polls on its own clock and pauses while the tab is hidden.
/**
 * Decard trainers ranked by rips. The gateway caches it for a minute, so it polls on the same
 * clock. Until decardbe serves it, it errors (404/502) and the page shows the open league.
 * In development, `sample` (from ?preview=1&trainers=N) stands in with N made-up trainers.
 */
export function useDecardLeague(sample: { fixture: RipPreview | undefined; size: number } | null) {
  const q = useRipLeaderboardQuery(undefined, {
    skip: sample !== null,
    pollingInterval: 60_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
  const fixture = sample?.fixture;
  const size = sample?.size ?? 0;
  const fake = useMemo(() => (fixture ? sampleBoard(fixture, size) : null), [fixture, size]);
  if (sample) return { data: fake ?? undefined, isLoading: !fake, isError: false };
  return q;
}
/** The Slabz-wide league: the last 100 pulls across Slabz, refreshed every 30 seconds. */
export const useSlabzLeague = () =>
  useSlabzLeagueQuery(undefined, {
    pollingInterval: 30_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
