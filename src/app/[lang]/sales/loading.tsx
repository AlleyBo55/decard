import { PageSkeleton, RowsSkeleton } from "@/components/PageSkeleton";
import { Skeleton } from "@/components/ui";
import { getStrings } from "@/lib/i18n/strings";

export default async function Loading() {
  const t = await getStrings();
  return (
    <PageSkeleton label={t.market.sales.loading}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[84px] rounded-[14px]" />
        ))}
      </div>
      <RowsSkeleton rows={8} />
    </PageSkeleton>
  );
}
