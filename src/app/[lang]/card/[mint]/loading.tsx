import { Skeleton } from "@/components/ui";
import { getStrings } from "@/lib/i18n/strings";

export default async function Loading() {
  const t = await getStrings();
  return (
    <div className="pt-8 grid gap-12 lg:grid-cols-[minmax(300px,420px)_1fr]" role="status" aria-label={t.card.loading}>
      <Skeleton className="aspect-[3/5] w-full max-w-[340px] mx-auto rounded-[18px]" />
      <div className="flex flex-col gap-5">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-14 w-3/4" />
        <Skeleton className="h-5 w-full max-w-lg" />
        <Skeleton className="h-40 w-full rounded-[14px]" />
        <Skeleton className="h-32 w-full rounded-[14px]" />
      </div>
    </div>
  );
}
