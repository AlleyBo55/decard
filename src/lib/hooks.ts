"use client";
import { useCallback, useSyncExternalStore } from "react";
import type { WalletLabel } from "./types";
import { knownLabel } from "./labels";
import { useSolPrice as useSolPriceFeed } from "@/hooks/useSolPrice";
import { useAppDispatch, useAppSelector } from "@/store";
import { setLabel as saveLabel } from "@/store/slices/Labels";
import { toggleWatch } from "@/store/slices/Watchlist";
// --- Labels and watchlist --------------------------------------------------------
// Both live in the Redux store. StoreProvider loads them from localStorage
// after mount (so hydration never mismatches) and follows other tabs through
// the storage event; store/persist.ts writes changes back.
/** Private wallet labels saved in this browser. */
export function useLocalLabels() {
  const labels = useAppSelector((s) => s.labels.labels);
  const dispatch = useAppDispatch();
  const setLabel = useCallback(
    (wallet: string, label: string) => {
      dispatch(saveLabel({ wallet, label }));
    },
    [dispatch],
  );
  return { labels, setLabel };
}
/** Display label for a wallet: your private label first, then the shared list. */
export function useWalletLabel(wallet: string | null | undefined): WalletLabel | null {
  const custom = useAppSelector((s) => (wallet ? s.labels.labels[wallet] : undefined));
  if (!wallet) return null;
  return custom ?? knownLabel(wallet);
}
export function useWatchlist() {
  const watch = useAppSelector((s) => s.watchlist.wallets);
  const dispatch = useAppDispatch();
  const toggle = useCallback(
    (wallet: string) => {
      dispatch(toggleWatch(wallet));
    },
    [dispatch],
  );
  return { watch, toggle, has: (w: string) => watch.includes(w) };
}
// --- Media queries -------------------------------------------------------------
/** Live media-query match. False on the server and during hydration. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    useCallback(
      (cb: () => void) => {
        const mq = window.matchMedia(query);
        mq.addEventListener("change", cb);
        return () => mq.removeEventListener("change", cb);
      },
      [query],
    ),
    () => window.matchMedia(query).matches,
    () => false,
  );
}
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
// --- Prices ----------------------------------------------------------------------
/** Live SOL/USD price, shared through the RTK Query cache. */
export function useSolPrice(): number | null {
  return useSolPriceFeed().data?.usd ?? null;
}
/** A listing's USD value. SOL converts at the live rate. */
export function listingUsd(
  price: number | null | undefined,
  currency: string | null | undefined,
  solUsd: number | null,
): number | null {
  if (price == null) return null;
  if (currency === "SOL") return solUsd ? price * solUsd : null;
  return price;
}
