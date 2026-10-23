import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Kicker } from "@/components/ui";
import { getMarketplace } from "@/lib/cc";
import { cardImage, SITE_URL } from "@/lib/constants";
import { isGradedCard } from "@/lib/credible";
import { jsonLd } from "@/lib/seo";

const PAGE_SIZE = 200;
export const CARD_DIRECTORY_MAX_PAGES = 100;

const BASE_TITLE = "Graded card directory: Pokémon, PSA & more";
const BASE_DESCRIPTION =
  "Browse currently listed graded cards by exact name, grade, set, year, card number and category, including Pokémon cards and PSA slabs.";

export function cardDirectoryPath(page: number) {
  return page === 1 ? "/cards" : `/cards/page/${page}`;
}

export function cardDirectoryTitle(page: number) {
  return page === 1 ? BASE_TITLE : `${BASE_TITLE}, page ${page}`;
}

export function cardDirectoryDescription(page: number) {
  return page === 1
    ? BASE_DESCRIPTION
    : `Browse page ${page} of currently listed graded cards by exact name, grade, set, year, card number and category, including Pokémon cards and PSA slabs.`;
}

function numberedPages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 4) return [1, 2, 3, 4, 5, totalPages];
  if (currentPage >= totalPages - 3) {
    return [1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, totalPages];
}

function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const pages = numberedPages(currentPage, totalPages);
  const pageLink =
    "inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border-2 border-sand bg-cream-hi px-3 font-bold text-ink transition-colors hover:border-poke hover:text-poke-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poke";

  return (
    <nav aria-label="Card directory pagination" className="flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={cardDirectoryPath(currentPage - 1)} rel="prev" prefetch={false} className={pageLink}>
          Previous
        </Link>
      )}

      {pages.map((pageNumber, index) => {
        const previousPage = pages[index - 1];
        const current = pageNumber === currentPage;
        return (
          <span key={pageNumber} className="contents">
            {previousPage != null && pageNumber - previousPage > 1 && (
              <span aria-hidden className="px-1 text-ink-mute">
                …
              </span>
            )}
            <Link
              href={cardDirectoryPath(pageNumber)}
              prefetch={false}
              aria-current={current ? "page" : undefined}
              aria-label={current ? `Page ${pageNumber}, current page` : `Go to page ${pageNumber}`}
              className={`${pageLink} ${current ? "!border-ink !bg-poke !text-white" : ""}`}
            >
              {pageNumber}
            </Link>
          </span>
        );
      })}

      {currentPage < totalPages && (
        <Link href={cardDirectoryPath(currentPage + 1)} rel="next" prefetch={false} className={pageLink}>
          Next
        </Link>
      )}
    </nav>
  );
}

export async function CardDirectory({ page }: { page: number }) {
  await connection();

  if (!Number.isSafeInteger(page) || page < 1 || page > CARD_DIRECTORY_MAX_PAGES) notFound();

  const query = (pageNumber: number) => ({
    step: PAGE_SIZE,
    orderBy: "nameAsc" as const,
    listPriceMin: 1,
    page: pageNumber,
  });
  const cache = { revalidate: 21600 };
  // Validate against page 1 before asking Collector Crypt for a page it does
  // not have. Page 1 is shared with the sitemap and normally already cached.
  const first = await getMarketplace(query(1), cache);
  const availablePages = Number.isFinite(first.totalPages) ? Math.max(0, Math.floor(first.totalPages)) : 0;
  const totalPages = Math.min(availablePages, CARD_DIRECTORY_MAX_PAGES);

  if (page > 1 && page > totalPages) notFound();

  const marketplace = page === 1 ? first : await getMarketplace(query(page), cache);

  const cards = marketplace.cards.filter(isGradedCard);
  const displayedTotalPages = Math.max(1, totalPages);
  const path = cardDirectoryPath(page);
  const pageUrl = `${SITE_URL}${path}`;
  const title = cardDirectoryTitle(page);
  const description = cardDirectoryDescription(page);
  const listTitle = page === 1 ? "Currently listed graded cards" : `Currently listed graded cards, page ${page}`;
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Graded card directory", path: "/cards" },
    ...(page > 1 ? [{ name: `Page ${page}`, path }] : []),
  ];
  const entries = cards.map((card, index) => {
    const position = (page - 1) * PAGE_SIZE + index + 1;
    const url = `${SITE_URL}/card/${card.nftAddress}`;
    return { card, position, url };
  });
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection-page`,
        url: pageUrl,
        name: title,
        description,
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
        mainEntity: { "@id": `${pageUrl}#card-list` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#card-list`,
        name: listTitle,
        numberOfItems: entries.length,
        itemListElement: entries.map(({ card, position, url }) => ({
          "@type": "ListItem",
          position,
          name: card.itemName,
          item: url,
          url,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: breadcrumbs.map((breadcrumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: breadcrumb.name,
          item: `${SITE_URL}${breadcrumb.path}`,
        })),
      },
    ],
  };

  return (
    <section className="flex flex-col gap-8 pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-mute">
        {breadcrumbs.map((breadcrumb, index) => (
          <span key={breadcrumb.path} className="contents">
            {index > 0 && <span aria-hidden>›</span>}
            <Link
              href={breadcrumb.path}
              prefetch={false}
              aria-current={index === breadcrumbs.length - 1 ? "page" : undefined}
              className={index === breadcrumbs.length - 1 ? "text-ink" : "hover:text-poke-deep"}
            >
              {breadcrumb.name}
            </Link>
          </span>
        ))}
      </nav>

      <header className="flex max-w-4xl flex-col gap-5">
        <Kicker>Current listings · marketplace name order</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">{title}</h1>
        <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{description}</p>
      </header>

      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-sand pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{listTitle}</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {entries.length} graded {entries.length === 1 ? "card" : "cards"} on this page.
          </p>
        </div>
        <p className="font-pixel text-[9px] text-ink-mute">
          Page {page} of {displayedTotalPages}
        </p>
      </div>

      {entries.length > 0 ? (
        <ol className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {entries.map(({ card, position }) => (
            <li key={`${card.nftAddress}-${position}`} className="paper p-4 sm:p-5">
              <div className="flex gap-4 sm:gap-5">
                <div className="w-16 shrink-0 self-start rounded-lg bg-cream-lo p-1 sm:w-20">
                  <img
                    src={cardImage(card.nftAddress, "front", 128, card)}
                    alt=""
                    width={128}
                    height={213}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/5] h-auto w-full rounded-md object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="font-pixel text-[9px] text-poke-deep">#{position}</span>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                    <Link
                      href={`/card/${card.nftAddress}`}
                      prefetch={false}
                      className="break-words underline decoration-sand-dark underline-offset-4 transition-colors hover:text-poke-deep focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-poke"
                    >
                      {card.itemName}
                    </Link>
                  </h3>

                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-pixel text-[8px] uppercase text-ink-mute">Grade</dt>
                      <dd className="mt-1 break-words font-bold text-ink">
                        {card.gradingCompany ?? "Unknown grader"} {card.grade ?? "Not provided"}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-pixel text-[8px] uppercase text-ink-mute">Category</dt>
                      <dd className="mt-1 break-words font-bold text-ink">{card.category || "Other"}</dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="font-pixel text-[8px] uppercase text-ink-mute">Set</dt>
                      <dd className="mt-1 break-words font-bold text-ink">{card.set || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt className="font-pixel text-[8px] uppercase text-ink-mute">Year</dt>
                      <dd className="mt-1 font-bold tabular-nums text-ink">{card.year || "Not provided"}</dd>
                    </div>
                    <div>
                      <dt className="font-pixel text-[8px] uppercase text-ink-mute">Card no.</dt>
                      <dd className="mt-1 break-words font-bold text-ink">{card.serial || "Not provided"}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <div className="paper p-6 text-center sm:p-8">
          <p className="font-display text-xl font-bold text-ink">No graded cards appear on this marketplace page.</p>
          <p className="mt-2 text-sm text-ink-soft">The directory filters out ungraded items, packs and merchandise.</p>
        </div>
      )}

      <Pagination currentPage={page} totalPages={displayedTotalPages} />
    </section>
  );
}
