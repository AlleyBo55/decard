"use client";

import { useQuery } from "@tanstack/react-query";
import type { SolPrice } from "@/lib/types";
import { clsx } from "@/lib/clsx";

export function SolTicker() {
  const { data } = useQuery<SolPrice>({
    queryKey: ["sol-price"],
    queryFn: async () => {
      const res = await fetch("/api/sol-price");
      if (!res.ok) throw new Error("sol price failed");
      return res.json();
    },
    refetchInterval: 60_000,
  });

  if (!data) return null;
  const up = data.change24h >= 0;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs font-mono">
      <span className="text-muted">SOL</span>
      <span className="font-semibold tabular-nums">${data.usd.toFixed(2)}</span>
      <span className={clsx("tabular-nums", up ? "text-up" : "text-down")}>
        {up ? "+" : ""}
        {(data.change24h * 100).toFixed(2)}%
      </span>
    </span>
  );
}
