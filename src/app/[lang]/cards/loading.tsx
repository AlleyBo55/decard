import { PageSkeleton, RowsSkeleton } from "@/components/PageSkeleton";
import { Skeleton } from "@/components/ui";
import { getStrings } from "@/lib/i18n/strings";

export default async function Loading() {
  const t = await getStrings();
  return (
    <PageSkeleton label={t.market.cards.loading}>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-full" />
        ))}
      </div>
      <RowsSkeleton rows={10} />
    </PageSkeleton>
  );
}
