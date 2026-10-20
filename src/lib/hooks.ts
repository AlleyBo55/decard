"use client";

import { useCallback, useEffect, useState } from "react";
import type { WalletLabel } from "./types";

const LABELS_KEY = "cardex:labels";
const WATCH_KEY = "cardex:watchlist";

export function useLocalLabels() {
  const [labels, setLabels] = useState<Record<string, WalletLabel>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LABELS_KEY);
      if (raw) setLabels(JSON.parse(raw));
    } catch {}
  }, []);

  const save = useCallback((next: Record<string, WalletLabel>) => {
    setLabels(next);
    try {
      localStorage.setItem(LABELS_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const setLabel = useCallback(
    (wallet: string, label: string) => {
      setLabels((prev) => {
        const next = { ...prev };
        if (label.trim()) next[wallet] = { wallet, label: label.trim(), kind: "custom" };
        else delete next[wallet];
        try {
          localStorage.setItem(LABELS_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    [],
  );

  return { labels, setLabel, save };
}

import { useQuery } from "@tanstack/react-query";
import type { SolPrice } from "./types";

/** Live SOL/USD price, shared across the app via react-query cache. */
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

/** Convert a listing to its USD value. SOL converts via the live rate. */
export function listingUsd(
  price: number | null | undefined,
  currency: string | null | undefined,
  solUsd: number | null,
): number | null {
  if (price == null) return null;
  if (currency === "USDC") return price;
  if (currency === "SOL") return solUsd ? price * solUsd : null;
  return price;
}

export function useWatchlist() {
  const [watch, setWatch] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WATCH_KEY);
      if (raw) setWatch(JSON.parse(raw));
    } catch {}
  }, []);

  const toggle = useCallback((wallet: string) => {
    setWatch((prev) => {
      const next = prev.includes(wallet)
        ? prev.filter((w) => w !== wallet)
        : [...prev, wallet];
      try {
        localStorage.setItem(WATCH_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  return { watch, toggle, has: (w: string) => watch.includes(w) };
}
