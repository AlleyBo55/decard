import type { Metadata } from "next";
import Link from "next/link";
import { Kicker, MoreLink } from "@/components/ui";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { jsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/pokemon";
const TITLE = "Pokémon card prices by Pokémon: graded price guides";
const DESCRIPTION = `Graded price guides for ${POKEMON_HUBS.length} Pokémon, from Charizard and Pikachu to Umbreon and Gengar: live PSA, CGC and BGS asking prices by grade.`;

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const pageUrl = `${SITE_URL}${PATH}`;
const structured = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      isAccessibleForFree: true,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Pokémon card prices", item: pageUrl },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#guides`,
      name: "Pokémon card price guides",
      numberOfItems: POKEMON_HUBS.length,
      itemListElement: POKEMON_HUBS.map((hub, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: hub.name,
        url: `${SITE_URL}/pokemon/${hub.slug}`,
      })),
    },
  ],
};

export default function PokemonPriceGuidesPage() {
  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          Home
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">Pokémon card prices</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-5">
        <Kicker>Price guides · graded Pokémon cards</Kicker>
        <h1 className="h-display text-[clamp(2.6rem,6.5vw,4.8rem)]">
          Pokémon card prices, <span className="text-poke">one Pokémon at a time.</span>
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
          Pick a Pokémon to see every graded slab of it listed on Collector Crypt, the lowest and median asking price for
          each grade, and the cheapest and most valuable cards on the market right now.
        </p>
      </header>

      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {POKEMON_HUBS.map((hub) => (
          <li key={hub.slug}>
            <Link
              href={`/pokemon/${hub.slug}`}
              prefetch={false}
              className="paper group flex h-full flex-col gap-1.5 p-5 transition-transform hover:-translate-y-0.5"
            >
              <span className="font-display text-2xl font-bold text-ink group-hover:text-poke-deep">{hub.name}</span>
              <span className="text-sm text-ink-soft">PSA 10, PSA 9 and CGC prices →</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-16 flex max-w-3xl flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">What each guide shows</h2>
        <p>
          Each guide reads every graded listing of that Pokémon on Collector Crypt and refreshes about every 15 minutes. It
          groups USDC asking prices by grade, links the lowest-priced card for each grade, and lists the cheapest and most
          valuable slabs. Prices are asking prices, not completed sales.
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <MoreLink href="/pokemon-card-value-checker">Search any Pokémon card&apos;s value</MoreLink>
          <MoreLink href="/sales">See recent verified sales</MoreLink>
        </div>
      </section>
    </article>
  );
}
