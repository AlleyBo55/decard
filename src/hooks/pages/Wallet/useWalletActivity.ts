import { selectView, useActivityQuery } from "@/store/api";

/** A wallet's last 25 moves. Fetches and polls (30s) only while `enabled`, i.e. the Activity tab is open. */
export const useWalletActivity = (wallet: string, enabled: boolean) =>
  useActivityQuery(
    { wallet, limit: 25 },
    {
      skip: !enabled,
      pollingInterval: 30_000,
      skipPollingIfUnfocused: true,
      selectFromResult: selectView,
    },
  );
