"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import type { Activity } from "@/lib/types";
import { ActivityRow } from "@/components/ActivityRow";
import { PixelLabel, FeedSkeleton } from "@/components/ui";

export function TradeTape() {
  const { data, isLoading } = useQuery<{ activity: Activity[] }>({
    queryKey: ["tape"],
    queryFn: async () => {
      const res = await fetch("/api/activity?limit=30");
      if (!res.ok) throw new Error("tape failed");
      return res.json();
    },
    refetchInterval: 8_000,
  });

  const rows = (data?.activity ?? []).filter((a) => a.kind !== "Unknown");

  return (
    <div className="rounded-xl border-2 border-line overflow-hidden flex flex-col h-full bg-panel">
      <div className="chassis flex items-center justify-between px-3 py-2">
        <PixelLabel className="text-white/90">LIVE TRADE TAPE</PixelLabel>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/80">
          <span className="led h-2 w-2 rounded-full bg-dex-yellow text-dex-yellow" /> on-chain
        </span>
      </div>
      <div className="flex-1 overflow-y-auto thin-scroll max-h-[560px] divide-y divide-line/50">
        {isLoading && <FeedSkeleton rows={8} />}
        {!isLoading && rows.length === 0 && (
          <div className="p-6 text-center text-muted text-sm">Quiet right now.</div>
        )}
        <AnimatePresence initial={false}>
          {rows.map((a) => (
            <motion.div
              key={a.signature}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ActivityRow a={a} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
