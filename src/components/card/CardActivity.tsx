"use client";

import { useQuery } from "@tanstack/react-query";
import type { Activity } from "@/lib/types";
import { ActivityRow } from "@/components/ActivityRow";
import { FeedSkeleton } from "@/components/ui";

export function CardActivity({ mint }: { mint: string }) {
  const { data, isLoading, isError } = useQuery<{ activity: Activity[] }>({
    queryKey: ["card-activity", mint],
    queryFn: async () => {
      const res = await fetch(`/api/activity?mint=${mint}&limit=20`);
      if (!res.ok) throw new Error("card activity failed");
      return res.json();
    },
    refetchInterval: 20_000,
  });

  const rows = (data?.activity ?? []).filter((a) => a.kind !== "Unknown");

  if (isLoading) return <FeedSkeleton rows={5} />;
  if (isError) return <p className="py-6 text-ink-mute">Couldn&apos;t read this card&apos;s history right now.</p>;
  if (!rows.length) return <p className="py-6 text-ink-mute">No marketplace history on-chain yet.</p>;
  return (
    <div className="dash-divide">
      {rows.map((a) => (
        <ActivityRow key={a.signature} a={a} showCard={false} />
      ))}
    </div>
  );
}
