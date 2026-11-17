"use client";

import { ActivityRow } from "@/components/ActivityRow";
import { useT } from "@/components/LocaleProvider";
import { FeedSkeleton } from "@/components/ui";
import { useCardActivity } from "@/hooks/pages/Card/useCardActivity";

export function CardActivity({ mint }: { mint: string }) {
  const { data, isLoading, isError } = useCardActivity(mint);
  const t = useT();

  const rows = (data?.activity ?? []).filter((a) => a.kind !== "Unknown");

  if (isLoading) return <FeedSkeleton rows={5} />;
  if (isError) return <p className="py-6 text-ink-mute">{t.card.history.error}</p>;
  if (!rows.length) return <p className="py-6 text-ink-mute">{t.card.history.empty}</p>;
  return (
    <div className="dash-divide">
      {rows.map((a) => (
        <ActivityRow key={a.signature} a={a} showCard={false} />
      ))}
    </div>
  );
}
