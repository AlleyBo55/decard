import { selectView, useHoldingsQuery } from "@/store/api";

/** The cards a wallet holds (top 100 by price). No polling. */
export const useWalletHoldings = (wallet: string) =>
  useHoldingsQuery(wallet, {
    selectFromResult: selectView,
  });
