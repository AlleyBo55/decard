import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowseByFranchise } from "@/components/hubs/BrowseByFranchise";
import { Kicker } from "@/components/ui";
import { getCatalog } from "@/lib/catalog";
import { cardImage, SITE_URL } from "@/lib/constants";
import { fmtNum, fmtSol, fmtUsd } from "@/lib/format";
import { categoryName, jsonLd } from "@/lib/seo";
import type { CatalogCard } from "@/lib/types";

const PAGE_SIZE = 200;
export const CARD_DIRECTORY_MAX_PAGES = 100;

const BASE_TITLE = "Graded card directory: Pokémon, PSA & more";
const BASE_DESCRIPTION =
  "Browse currently listed graded cards by exact name, grade, set, year, card number and category, including Pokémon cards and PSA slabs.";

export function cardDirectoryPath(page: number) {
  return page === 1 ? "/cards" : `/cards/page/${page}`;
}

/** Directory pages that exist for `count` cards: at least one, at most the cap. */
export function cardDirectoryPageCount(count: number) {
  return Math.min(CARD_DIRECTORY_MAX_PAGES, Math.max(1, Math.ceil(count / PAGE_SIZE)));
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

// Rows carry no classes or wrappers of their own: the list lays them out on a
// grid (thumbnail | name over details | price) through these selectors. Row
// markup is sent twice (the HTML and the RSC payload), so per-row classes were
// most of the page's weight.
const LIST_CLASS = [
  "paper divide-y divide-sand",
  "*:grid *:grid-cols-[2.25rem_minmax(0,1fr)_auto] *:grid-rows-[1fr_auto_auto_1fr] *:gap-x-3 *:px-3 *:py-2.5 sm:*:gap-x-4 sm:*:px-5",
  "[&_img]:row-span-full [&_img]:self-center [&_img]:h-[60px] [&_img]:w-9 [&_img]:rounded-md [&_img]:bg-cream-lo [&_img]:object-contain",
  "[&_a]:col-start-2 [&_a]:row-start-2 [&_a]:break-words [&_a]:font-bold [&_a]:leading-snug [&_a]:text-ink [&_a]:underline [&_a]:decoration-sand-dark [&_a]:underline-offset-4 [&_a:hover]:text-poke-deep",
  "[&_p]:col-start-2 [&_p]:row-start-3 [&_p]:mt-1 [&_p]:text-sm [&_p]:text-ink-soft",
  "[&>li>span]:col-start-3 [&>li>span]:row-span-full [&>li>span]:self-center [&>li>span]:font-num [&>li>span]:font-extrabold [&>li>span]:tabular-nums [&>li>span]:text-ink",
].join(" ");

/** "PSA GEM-MT 10 · Pokémon · Base Set · 1999 · No. 4", skipping what the listing doesn't say. */
function details(card: CatalogCard) {
  const grade = [card.gradingCompany, card.grade].filter(Boolean).join(" ");
  return [grade, categoryName(card.category), card.set, card.year, card.serial && `No. ${card.serial}`]
    .filter(Boolean)
    .join(" · ");
}

function askingPrice(card: CatalogCard) {
  return card.currency === "SOL" ? fmtSol(card.price) : fmtUsd(card.price);
}

export async function CardDirectory({ page }: { page: number }) {
  if (!Number.isSafeInteger(page) || page < 1 || page > CARD_DIRECTORY_MAX_PAGES) notFound();

  // In-process catalogue: no upstream call unless it is cold or due a refresh.
  const catalog = await getCatalog();
  const totalPages = cardDirectoryPageCount(catalog.cards.length);
  if (page > totalPages) notFound();

  const start = (page - 1) * PAGE_SIZE;
  const cards = catalog.cards.slice(start, start + PAGE_SIZE);
  const asOf = new Date(catalog.fetchedAt).toISOString();
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
        numberOfItems: cards.length,
        // Position and URL only (Google's summary-page form): the names are in
        // the list itself, and each one here would be sent twice more.
        itemListElement: cards.map((card, index) => ({
          "@type": "ListItem",
          position: start + index + 1,
          url: `${SITE_URL}/card/${card.nftAddress}`,
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

      <BrowseByFranchise counts={catalog.categoryCounts} />

      <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-sand pb-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink">{listTitle}</h2>
          <p className="mt-1 text-sm text-ink-soft">
            {cards.length > 0 && `Cards ${fmtNum(start + 1)}–${fmtNum(start + cards.length)} of `}
            {fmtNum(catalog.cards.length)} graded cards listed, with asking prices as of{" "}
            <time dateTime={asOf}>{asOf.slice(0, 16).replace("T", " ")} UTC</time>.
          </p>
        </div>
        <p className="font-pixel text-[9px] text-ink-mute">
          Page {page} of {totalPages}
        </p>
      </div>

      {cards.length > 0 ? (
        <ol className={LIST_CLASS}>
          {cards.map((card, index) => (
            // Index keys: the list never reorders in the browser, and a mint per row is 44 more bytes.
            <li key={index}>
              <img
                src={card.thumb ?? cardImage(card.nftAddress, "front", 128)}
                alt=""
                width={36}
                height={60}
                loading="lazy"
              />
              <Link href={`/card/${card.nftAddress}`} prefetch={false}>
                {card.itemName}
              </Link>
              <p>{details(card)}</p>
              {card.price != null && <span>{askingPrice(card)}</span>}
            </li>
          ))}
        </ol>
      ) : (
        <div className="paper p-6 text-center sm:p-8">
          <p className="font-display text-xl font-bold text-ink">No graded cards are listed right now.</p>
          <p className="mt-2 text-sm text-ink-soft">The directory filters out ungraded items, packs and merchandise.</p>
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </section>
  );
}
