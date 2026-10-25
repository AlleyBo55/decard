import type { GachaOddsPayload } from "@/lib/types";
import { useGachaOddsQuery } from "@/store/api";

/**
 * Reads `currentData`, not `data`: after switching machines, RTK keeps the
 * previous machine's odds in `data`, and a detail panel must never show them
 * under the new machine's name.
 */
function selectOdds(result: { currentData?: GachaOddsPayload; isError: boolean; error?: unknown }) {
  return {
    data: result.currentData,
    isLoading: result.currentData === undefined && !result.isError,
    isError: result.isError,
    error: result.error,
  };
}

/** "If you pull now" for one machine. Fetched on select, refreshed every 5 minutes; skipped without a code. */
export const useGachaOdds = (code: string | null | undefined) =>
  useGachaOddsQuery(code ?? "", {
    skip: !code,
    pollingInterval: 300_000,
    skipPollingIfUnfocused: true,
    // The server caches odds for 5 minutes, so flipping back to a machine within a minute reuses them.
    refetchOnMountOrArgChange: 60,
    selectFromResult: selectOdds,
  });
