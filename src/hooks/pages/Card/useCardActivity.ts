import { selectView, useActivityQuery } from "@/store/api";

/** A card's last 20 marketplace moves, refreshed every 20s. */
export const useCardActivity = (mint: string) =>
  useActivityQuery(
    { mint, limit: 20 },
    {
      pollingInterval: 20_000,
      skipPollingIfUnfocused: true,
      selectFromResult: selectView,
    },
  );
