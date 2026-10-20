import type { SolPrice } from "@/lib/types";
import { useSolPriceQuery } from "@/store/api";

const selectData = ({ data }: { data?: SolPrice }) => ({ data });

/** Live SOL/USD price. Every caller shares one cache entry and one 60s poll. */
export const useSolPrice = () =>
  useSolPriceQuery(undefined, {
    pollingInterval: 60_000,
    skipPollingIfUnfocused: true,
    refetchOnMountOrArgChange: 60,
    selectFromResult: selectData,
  });
