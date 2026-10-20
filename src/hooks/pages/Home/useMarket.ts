import { selectView, useMarketQuery } from "@/store/api";

/** Listed count, floor and top listing; "" means all categories / all venues. Polls every 30s. */
export const useMarket = (category: string, source: string) =>
  useMarketQuery(
    { category, source },
    {
      pollingInterval: 30_000,
      skipPollingIfUnfocused: true,
      selectFromResult: selectView,
    },
  );
