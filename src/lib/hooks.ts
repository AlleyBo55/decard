"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SolPrice, WalletLabel } from "./types";
import { knownLabel } from "./labels";

// --- localStorage-backed stores ----------------------------------------------
// useSyncExternalStore keeps every component in sync (and other tabs, via the
// storage event) without setState-in-effect, and renders the fallback on the
// server so hydration never mismatches.

function localStore<T>(key: string, fallback: T) {
  let raw: string | null | undefined;
  let value = fallback;
  const listeners = new Set<() => void>();

  const read = (): T => {
    let next: string | null = null;
    try {
      next = localStorage.getItem(key);
    } catch {
      return value;
    }
    if (next !== raw) {
      raw = next;
      try {
        value = next ? (JSON.parse(next) as T) : fallback;
      } catch {
        value = fallback;
      }
    }
    return value;
  };

  return {
    subscribe(cb: () => void) {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => e.key === key && cb();
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot: read,
    getServerSnapshot: () => fallback,
    set(next: T) {
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // storage full or blocked: the change just won't persist
      }
      listeners.forEach((l) => l());
    },
  };
}

const EMPTY_LABELS: Record<string, WalletLabel> = {};
const EMPTY_WATCH: string[] = [];
const labelStore = localStore("decard:labels", EMPTY_LABELS);
const watchStore = localStore("decard:watchlist", EMPTY_WATCH);

/** Private wallet labels saved in this browser. */
export function useLocalLabels() {
  const labels = useSyncExternalStore(labelStore.subscribe, labelStore.getSnapshot, labelStore.getServerSnapshot);
  const setLabel = useCallback((wallet: string, label: string) => {
    const next = { ...labelStore.getSnapshot() };
    if (label.trim()) next[wallet] = { wallet, label: label.trim().slice(0, 32), kind: "custom" };
    else delete next[wallet];
    labelStore.set(next);
  }, []);
  return { labels, setLabel };
}

/** Display label for a wallet: your private label first, then the shared list. */
export function useWalletLabel(wallet: string | null | undefined): WalletLabel | null {
  const labels = useSyncExternalStore(labelStore.subscribe, labelStore.getSnapshot, labelStore.getServerSnapshot);
  if (!wallet) return null;
  return labels[wallet] ?? knownLabel(wallet);
}

export function useWatchlist() {
  const watch = useSyncExternalStore(watchStore.subscribe, watchStore.getSnapshot, watchStore.getServerSnapshot);
  const toggle = useCallback((wallet: string) => {
    const cur = watchStore.getSnapshot();
    watchStore.set(cur.includes(wallet) ? cur.filter((w) => w !== wallet) : [...cur, wallet]);
  }, []);
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

/** Live SOL/USD price, shared through the react-query cache. */
export function useSolPrice(): number | null {
  const { data } = useQuery<SolPrice>({
    queryKey: ["sol-price"],
    queryFn: async () => {
      const res = await fetch("/api/sol-price");
      if (!res.ok) throw new Error("sol price failed");
      return res.json();
    },
    refetchInterval: 60_000,
    staleTime: 60_000,
  });
  return data?.usd ?? null;
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
