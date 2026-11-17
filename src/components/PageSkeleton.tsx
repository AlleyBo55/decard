import { FeedSkeleton, Skeleton } from "@/components/ui";

// The shape of the server-rendered list pages (/cards, /sales, /pokemon/<name>) while their data
// loads: breadcrumb, header, then the page's own body. Shown at once on navigation (loading.tsx),
// so a slow first render reads as loading instead of a frozen click.

export function PageSkeleton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 pb-12 pt-8 sm:pt-12" role="status" aria-label={label}>
      <Skeleton className="h-4 w-44" />
      <div className="flex max-w-4xl flex-col gap-4">
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-12 w-full max-w-2xl sm:h-16" />
        <Skeleton className="h-12 w-3/4 max-w-xl sm:h-16" />
        <Skeleton className="mt-1 h-4 w-full max-w-3xl" />
        <Skeleton className="h-4 w-2/3 max-w-2xl" />
      </div>
      {children}
      <span className="sr-only">{label}…</span>
    </div>
  );
}

/** Rows like the directory's and the sales list's: thumbnail, two lines, a price. */
export function RowsSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="dash-divide max-w-5xl">
      <FeedSkeleton rows={rows} />
    </div>
  );
}

/** A grid of card tiles, as on a Pokémon price guide. */
export function TileGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[3/5] rounded-[14px]" />
          <Skeleton className="mt-3 h-3 w-4/5" />
          <Skeleton className="mt-2 h-3 w-2/5" />
        </div>
      ))}
    </div>
  );
}
