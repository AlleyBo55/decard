import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowseByFranchise } from "@/components/hubs/BrowseByFranchise";
import { CategoryMarket } from "@/components/hubs/CategoryMarket";
import { Kicker, MoreLink } from "@/components/ui";
import { CATEGORY_HUBS, categoryHub, hubNoun, type CategoryHub } from "@/lib/category-hubs";
import { SITE_URL } from "@/lib/constants";
import { gradeShort, shortCardName } from "@/lib/format";
import { GUIDE } from "@/lib/guide";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { breadcrumbLd, categoryPath, jsonLd, ORGANIZATION_ID, pageMetadata, WEBSITE_ID } from "@/lib/seo";
import { loadCategoryView } from "./market";

// Every hub is prerendered at build, then served from the ISR cache and rebuilt at most
// every 15 minutes with up to four Collector Crypt reads. Any other slug is a 404.
export const revalidate = 900;
export const dynamicParams = false;
// The largest categories chain three cursor reads one after another.
export const maxDuration = 60;

export function generateStaticParams(): { category: string }[] {
  return CATEGORY_HUBS.map((hub) => ({ category: hub.slug }));
}

type Props = { params: Promise<{ category: string }> };

const UTC = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" });
const utc = (iso: string) => `${UTC.format(new Date(iso))} UTC`;
const chip =
  "inline-block rounded-full border-2 border-sand bg-cream-hi px-3 py-1.5 text-sm font-bold text-ink-soft hover:border-poke hover:text-poke-deep";
const link = "font-bold text-azure-deep hover:text-poke-deep";
const TERMS = new Map(GUIDE.flatMap((s) => s.terms.map((t) => [t.id, t.term] as const)));
/** Per-Pokémon guides shown on the Pokémon hub, most collected first. */
const POKEMON_PICKS = POKEMON_HUBS.slice(0, 12);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = categoryHub((await params).category);
  if (!hub) return {};
  return pageMetadata({ title: hub.title, description: hub.description, path: `/cards/${hub.slug}` });
}

/** "One Piece cards: graded prices…" with the part after "cards:" in the accent colour. */
function Headline({ text }: { text: string }) {
  const m = text.match(/^(.*cards:) (.+)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      {m[1]} <span className="text-poke">{m[2]}</span>
    </>
  );
}

export default async function CategoryHubPage({ params }: Props) {
  const hub = categoryHub((await params).category);
  if (!hub) notFound();
  const noun = hubNoun(hub);
  const view = await loadCategoryView(hub.category);
  const path = `/cards/${hub.slug}`;
  const url = `${SITE_URL}${path}`;
  const scanner = categoryPath(hub.category);
  const shown = view ? [...new Map([...view.cheapest, ...view.highest].map((c) => [c.nftAddress, c])).values()] : [];
  const related = hub.related.map(categoryHub).filter((h): h is CategoryHub => h != null);
  const terms = hub.terms.flatMap((id) => {
    const term = TERMS.get(id);
    return term ? [{ id, term }] : [];
  });

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: hub.h1,
        description: hub.description,
        inLanguage: "en",
        isAccessibleForFree: true,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        about: { "@type": "Thing", name: `${hub.name} trading cards` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(shown.length ? { mainEntity: { "@id": `${url}#listings` } } : {}),
      },
      breadcrumbLd(`${url}#breadcrumb`, [
        { name: "Home", path: "/" },
        { name: "Cards", path: "/cards" },
        { name: hub.name, path },
      ]),
      ...(shown.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#listings`,
              name: `Graded ${noun} cards listed now`,
              numberOfItems: shown.length,
              itemListElement: shown.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${shortCardName(c.itemName)} ${gradeShort(c.gradingCompany, c.grade)}`.trim(),
                url: `${SITE_URL}/card/${c.nftAddress}`,
              })),
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: hub.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          Home
        </Link>
        <span aria-hidden>›</span>
        <Link href="/cards" className="hover:text-poke-deep">
          Cards
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{hub.name}</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-5">
        <Kicker>Franchise hub · tokenized graded cards</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,6vw,4.4rem)]">
          <Headline text={hub.h1} />
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
          Graded {noun} cards listed right now on Collector Crypt and Magic Eden, each a real slab in a vault, owned
          through a token on Solana. See the lowest{view?.complete ? " and median" : ""} asking price for every grade, then
          open any card for its pop report, bids and history. Prices are live asks, not completed sales.
        </p>
        {view && (
          <p className="text-sm text-ink-mute">
            Updated <time dateTime={view.fetchedAt}>{utc(view.fetchedAt)}</time> · refreshed about every 15 minutes
          </p>
        )}
      </header>

      {/* The per-Pokémon guides already cover single Pokémon in depth, so this hub sends people there. */}
      {hub.slug === "pokemon" && (
        <nav aria-labelledby="by-pokemon" className="paper mt-10 flex flex-col gap-4 p-6">
          <h2 id="by-pokemon" className="font-display text-2xl font-bold text-ink">
            Looking for one Pokémon?
          </h2>
          <p className="text-ink-soft">
            Charizard, Pikachu, Umbreon and {POKEMON_HUBS.length - 3} more have their own price guides, with the lowest and
            median ask for every grade.
          </p>
          <ul className="flex flex-wrap gap-2">
            {POKEMON_PICKS.map((p) => (
              <li key={p.slug}>
                <Link href={`/pokemon/${p.slug}`} prefetch={false} className={chip}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <MoreLink href="/pokemon">All {POKEMON_HUBS.length} Pokémon price guides</MoreLink>
        </nav>
      )}

      {view ? (
        <CategoryMarket noun={noun} view={view} scanner={scanner} />
      ) : (
        <p className="paper mt-10 p-6 text-ink-soft">
          Live {noun} listings are temporarily unavailable. The guide below still applies, and the{" "}
          <Link href={scanner} className={link}>
            scanner
          </Link>{" "}
          shows current listings.
        </p>
      )}

      <section aria-labelledby="about" className="mt-16 flex max-w-3xl flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
        <h2 id="about" className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">
          About graded {noun} cards
        </h2>
        {hub.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {terms.length > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <p className="font-pixel text-[9px] text-ink-mute">TERMS YOU&apos;LL MEET</p>
            <ul className="flex flex-wrap gap-2">
              {terms.map((t) => (
                <li key={t.id}>
                  <Link href={`/guide#${t.id}`} className={chip}>
                    {t.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-3 pt-2">
          <MoreLink href={scanner}>Search {noun} listings in the scanner</MoreLink>
          <MoreLink href="/guide">The graded card and slang glossary</MoreLink>
          <MoreLink href="/tokenized-trading-cards">How tokenized trading cards work</MoreLink>
          <MoreLink href="/sales">Recent verified sales</MoreLink>
        </div>
      </section>

      {/* Native <details>, so answers are readable without JavaScript. The FAQPage data above uses the same list. */}
      <section aria-labelledby="faq" className="mt-16 flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Kicker>{hub.name} FAQ</Kicker>
          <h2 id="faq" className="h-display text-[clamp(1.7rem,3.4vw,2.6rem)]">
            Questions, answered.
          </h2>
        </div>
        <div className="dash-divide">
          {hub.faq.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="shrink-0 text-xs text-poke transition-transform group-open:rotate-90">
                  ▶
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="related" className="mt-16 flex flex-col gap-5">
        <h2 id="related" className="font-display text-2xl font-bold text-ink">
          Related franchises
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/cards/${r.slug}`}
                prefetch={false}
                className="paper group flex h-full flex-col gap-1.5 p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="font-display text-xl font-bold text-ink group-hover:text-poke-deep">{r.name} cards</span>
                <span className="text-sm text-ink-soft">Graded prices and live listings →</span>
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-4 font-display text-lg font-bold text-ink">Every franchise</h3>
        <BrowseByFranchise exclude={hub.slug} />
      </section>
    </article>
  );
}
