import { selectView, useActivityQuery } from "@/store/api";

/** The last 60 marketplace moves, refreshed every 10s. */
export const useTapeActivity = () =>
  useActivityQuery(
    { limit: 60 },
    {
      pollingInterval: 10_000,
      skipPollingIfUnfocused: true,
      selectFromResult: selectView,
    },
  );
