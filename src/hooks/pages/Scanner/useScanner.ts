import type { ScannerParams } from "@/services/Scanner/getScanner";
import api, { useScannerInfiniteQuery } from "@/store/api";

const selectPageCount = ({ currentData }: { currentData?: { pages: unknown[] } }) => ({
  pages: currentData?.pages.length ?? 0,
});

/**
 * Cursor-paged scanner results. While params change the previous results stay
 * on screen (`data` keeps the last result). Only a single loaded page
 * live-refreshes (15s); once more pages are loaded they stay put.
 */
export const useScanner = (params: ScannerParams) => {
  const { pages } = api.endpoints.scanner.useInfiniteQueryState(params, { selectFromResult: selectPageCount });
  return useScannerInfiniteQuery(params, {
    pollingInterval: pages > 1 ? 0 : 15_000,
    skipPollingIfUnfocused: true,
  });
};
