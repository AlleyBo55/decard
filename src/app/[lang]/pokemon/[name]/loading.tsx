import { PageSkeleton, TileGridSkeleton } from "@/components/PageSkeleton";
import { Skeleton } from "@/components/ui";
import { getStrings } from "@/lib/i18n/strings";

export default async function Loading() {
  const t = await getStrings();
  return (
    <PageSkeleton label={t.hubs.guide.loading}>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-11 w-72 rounded-full" />
        <Skeleton className="h-48 w-full rounded-[14px]" />
      </div>
      <TileGridSkeleton count={12} />
    </PageSkeleton>
  );
}
