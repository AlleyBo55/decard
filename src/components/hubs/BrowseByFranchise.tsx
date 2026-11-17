import { TypeChip } from "@/components/ui";
import { CATEGORY_HUBS } from "@/lib/category-hubs";
import { localFranchiseName } from "@/lib/i18n/copy";
import { getLocale, stringsFor } from "@/lib/i18n/strings";

/**
 * Type-chip links to every franchise hub (/cards/<slug>), named in the page's language. A server
 * component: it reads the language from next/root-params. `counts` takes a marketplace page's
 * cardsQtyByCategory to show listing counts; `exclude` drops the current hub's slug.
 */
export async function BrowseByFranchise({
  counts,
  exclude,
  className,
}: {
  counts?: Record<string, number>;
  exclude?: string;
  className?: string;
}) {
  const locale = await getLocale();
  return (
    <nav aria-label={stringsFor(locale).hubs.browse} className={className}>
      <ul className="flex flex-wrap gap-2">
        {CATEGORY_HUBS.filter((hub) => hub.slug !== exclude).map((hub) => (
          <li key={hub.slug}>
            <TypeChip
              category={hub.category}
              label={localFranchiseName(locale, hub.slug, hub.name)}
              count={counts?.[hub.category]}
              href={`/cards/${hub.slug}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
