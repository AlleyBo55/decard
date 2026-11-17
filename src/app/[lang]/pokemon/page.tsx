import type { Metadata } from "next";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { localPokemonName, pageSeo } from "@/lib/i18n/copy";
import { stringsFor } from "@/lib/i18n/strings";
import Link from "@/components/LocaleLink";
import { Kicker, MoreLink } from "@/components/ui";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { POKEMON_HUBS, hubSprite } from "@/lib/pokemon-hubs";
import { jsonLd, pageMetadata } from "@/lib/seo";
import { thumbSet } from "@/lib/thumb";

const PATH = "/pokemon";
const TITLE = "Pokémon card prices by Pokémon: graded price guides";
const DESCRIPTION = `Graded price guides for ${POKEMON_HUBS.length} Pokémon, from Charizard and Pikachu to Umbreon and Gengar: live PSA, CGC and BGS asking prices by grade.`;

type Props = { params: Promise<{ lang: string }> };

/** seo.pages["/pokemon"], for the metadata and the JSON-LD alike. */
const copyFor = (lang: Locale) => pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION }, { count: POKEMON_HUBS.length });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = copyFor(lang);
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

/** `text` with its {key} placeholder swapped for `node`, wherever the translation puts it. */
function slot(text: string, key: string, node: React.ReactNode) {
  const [before, after = ""] = text.split(`{${key}}`);
  return (
    <>
      {before}
      {node}
      {after}
    </>
  );
}

export default async function PokemonPriceGuidesPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const s = t.hubs.index;
  const copy = copyFor(lang);
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.hubs.crumbs.home, item: `${SITE_URL}${localePath(lang, "/")}` },
          { "@type": "ListItem", position: 2, name: t.hubs.crumbs.pokemon, item: pageUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#guides`,
        name: s.ldGuides,
        numberOfItems: POKEMON_HUBS.length,
        itemListElement: POKEMON_HUBS.map((hub, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: localPokemonName(lang, hub.slug, hub.name),
          url: `${SITE_URL}${localePath(lang, `/pokemon/${hub.slug}`)}`,
        })),
      },
    ],
  };

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={t.hubs.crumbs.label} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {t.hubs.crumbs.home}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{t.hubs.crumbs.pokemon}</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-5">
        <Kicker>{s.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.6rem,6.5vw,4.8rem)]">
          {slot(s.h1, "accent", <span className="text-poke">{s.h1Accent}</span>)}
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">{s.lede}</p>
      </header>

      <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {POKEMON_HUBS.map((hub, i) => (
          <li key={hub.slug}>
            <Link
              href={`/pokemon/${hub.slug}`}
              prefetch={false}
              className="paper group flex h-full flex-col items-center gap-1 px-3 pb-5 pt-4 text-center transition-transform hover:-translate-y-0.5"
            >
              <span className="mb-2 grid h-28 w-28 place-items-center rounded-full bg-cream-lo/80 shadow-[inset_0_0_0_1.5px_var(--color-sand)]">
                <img
                  {...thumbSet(hubSprite(hub), 96)}
                  alt=""
                  width={96}
                  height={96}
                  loading={i < 12 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-24 w-24 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                />
              </span>
              <span className="font-display text-2xl font-bold text-ink group-hover:text-poke-deep">
                {localPokemonName(lang, hub.slug, hub.name)}
              </span>
              <span className="text-sm text-ink-soft">{s.tile}</span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-16 flex max-w-3xl flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{s.showsTitle}</h2>
        <p>{s.shows}</p>
        <p className="text-sm text-ink-mute">
          {slot(
            t.hubs.credit,
            "link",
            <a href="https://pokemondb.net/sprites" target="_blank" rel="noopener noreferrer" className="font-bold text-azure-deep hover:text-poke-deep">
              Pokémon Database
            </a>,
          )}
        </p>
        <div className="flex flex-col gap-3 pt-2">
          <MoreLink href="/pokemon-card-value-checker">{s.checkerMore}</MoreLink>
          {!isHiddenPage("/sales") && <MoreLink href="/sales">{s.salesMore}</MoreLink>}
        </div>
      </section>
    </article>
  );
}
