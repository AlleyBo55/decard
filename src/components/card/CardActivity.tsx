"use client";

import { useQuery } from "@tanstack/react-query";
import type { Activity } from "@/lib/types";
import { ActivityRow } from "@/components/ActivityRow";
import { PixelLabel, FeedSkeleton } from "@/components/ui";

export function CardActivity({ mint }: { mint: string }) {
  const { data, isLoading } = useQuery<{ activity: Activity[] }>({
    queryKey: ["card-activity", mint],
    queryFn: async () => {
      const res = await fetch(`/api/activity?mint=${mint}&limit=20`);
      if (!res.ok) throw new Error("card activity failed");
      return res.json();
    },
    refetchInterval: 12_000,
  });

  const rows = (data?.activity ?? []).filter((a) => a.kind !== "Unknown");

  return (
    <div className="rounded-xl border-2 border-line overflow-hidden bg-panel">
      <div className="chassis flex items-center justify-between px-3 py-2">
        <PixelLabel className="text-white/90">CARD HISTORY</PixelLabel>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/80">
          <span className="led h-2 w-2 rounded-full bg-dex-yellow text-dex-yellow" /> live
        </span>
      </div>
      <div className="max-h-[420px] overflow-y-auto thin-scroll divide-y divide-line/50">
        {isLoading && <FeedSkeleton rows={6} />}
        {!isLoading && rows.length === 0 && (
          <div className="p-6 text-center text-muted text-sm">No on-chain history yet.</div>
        )}
        {rows.map((a) => (
          <ActivityRow key={a.signature} a={a} showCard={false} />
        ))}
      </div>
    </div>
  );
}
