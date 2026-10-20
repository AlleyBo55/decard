"use client";

import { useSolPrice } from "@/hooks/useSolPrice";
import { clsx } from "@/lib/clsx";

export function SolTicker({ className }: { className?: string }) {
  const { data } = useSolPrice();

  if (!data?.usd) return null;
  const up = data.change24h >= 0;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-sand bg-cream-hi px-3 py-1.5 text-sm",
        className,
      )}
    >
      <span className="font-pixel text-[9px] text-ink-mute">SOL</span>
      <span className="font-extrabold tabular-nums">${data.usd.toFixed(2)}</span>
      <span className={clsx("font-bold tabular-nums text-xs", up ? "text-up" : "text-down")}>
        {up ? "▲" : "▼"} {Math.abs(data.change24h * 100).toFixed(2)}%
      </span>
    </span>
  );
}
