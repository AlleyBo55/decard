"use client";

import { ActivityRow } from "@/components/ActivityRow";
import { FeedSkeleton } from "@/components/ui";
import { useCardActivity } from "@/hooks/pages/Card/useCardActivity";

export function CardActivity({ mint }: { mint: string }) {
  const { data, isLoading, isError } = useCardActivity(mint);

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
