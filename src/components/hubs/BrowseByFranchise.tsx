import { TypeChip } from "@/components/ui";
import { CATEGORY_HUBS } from "@/lib/category-hubs";

/**
 * Type-chip links to every franchise hub (/cards/<slug>). No hooks, so it renders on the
 * server or inside client components. `counts` takes a marketplace page's
 * cardsQtyByCategory to show listing counts; `exclude` drops the current hub's slug.
 */
export function BrowseByFranchise({
  counts,
  exclude,
  className,
}: {
  counts?: Record<string, number>;
  exclude?: string;
  className?: string;
}) {
  return (
    <nav aria-label="Browse cards by franchise" className={className}>
      <ul className="flex flex-wrap gap-2">
        {CATEGORY_HUBS.filter((hub) => hub.slug !== exclude).map((hub) => (
          <li key={hub.slug}>
            <TypeChip category={hub.category} label={hub.name} count={counts?.[hub.category]} href={`/cards/${hub.slug}`} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
