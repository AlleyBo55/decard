import type { Metadata } from "next";
import type { ReactNode } from "react";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath } from "@/lib/i18n";
import { topicsFor } from "@/lib/i18n/content";
import { localFranchiseName, localPokemonName, pageSeo, topicSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import Link from "@/components/LocaleLink";
import { Kicker } from "@/components/ui";
import { CATEGORY_HUBS } from "@/lib/category-hubs";
import { SITE_URL } from "@/lib/constants";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { breadcrumbLd, jsonLd, pageMetadata, WEBSITE_ID } from "@/lib/seo";
import { topicBySlug } from "@/lib/topics";

const PATH = "/topics";
const TITLE = "Graded card topics, venues and franchises";
const DESCRIPTION =
  "Guides to PSA, CGC, BGS, slabs, redemption and pack rips, plus live price hubs for Pokémon, One Piece, Riftbound, Marvel, sports and every other listed franchise.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

/** Labels are learn.topics.toolLinks[key]. */
const TOOLS = (
  [
    { href: "/scanner", key: "scanner" },
    { href: "/cards", key: "cards" },
    { href: "/pokemon-card-value-checker", key: "checker" },
    { href: "/sales", key: "sales" },
    { href: "/tape", key: "tape" },
    { href: "/rip", key: "rip" },
    { href: "/redeem", key: "redeem" },
    { href: "/guide", key: "guide" },
    { href: "/tokenized-trading-cards", key: "explainer" },
    { href: "/cards-token", key: "token" },
  ] as const
).filter((tool) => !isHiddenPage(tool.href));

const chip =
  "inline-block rounded-full border-2 border-sand bg-cream-hi px-3 py-1.5 text-sm font-bold text-ink-soft hover:border-poke hover:text-poke-deep";

/** `text` with its {key} placeholder swapped for `node`, wherever the translation puts it. */
function slot(text: string, key: string, node: ReactNode) {
  const [before, after = ""] = text.split(`{${key}}`);
  return (
    <>
      {before}
      {node}
      {after}
    </>
  );
}

export default async function TopicsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const copy = t.learn.topics;
  const page = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const url = `${SITE_URL}${localePath(lang, PATH)}`;
  // A translated topic brings its own title, h1 and description. An English one keeps topicSeo's override.
  const topics = topicsFor(lang).map((topic) => ({
    topic,
    seo: topic === topicBySlug(topic.slug) ? topicSeo(lang, topic.slug, topic) : topic,
  }));
  const hubs = CATEGORY_HUBS.map((hub) => ({ slug: hub.slug, name: localFranchiseName(lang, hub.slug, hub.name) }));
  const mons = POKEMON_HUBS.map((hub) => ({ slug: hub.slug, name: localPokemonName(lang, hub.slug, hub.name) }));
  const tools = TOOLS.map((tool) => ({ href: tool.href, label: copy.toolLinks[tool.key] }));
  const items = [
    ...topics.map(({ topic, seo }) => ({ name: seo.title, path: `/topics/${topic.slug}` })),
    ...hubs.map((hub) => ({ name: fmt(copy.hubItem, { name: hub.name }), path: `/cards/${hub.slug}` })),
    ...mons.map((hub) => ({ name: fmt(copy.pokemonItem, { name: hub.name }), path: `/pokemon/${hub.slug}` })),
    ...tools.map((tool) => ({ name: tool.label, path: tool.href })),
  ];
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: localeMeta(lang).html,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": `${url}#index` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#index`,
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: `${SITE_URL}${localePath(lang, item.path)}`,
        })),
      },
      breadcrumbLd(`${url}#breadcrumb`, [
        { name: t.learn.crumbs.home, path: localePath(lang, "/") },
        { name: t.learn.crumbs.topics, path: localePath(lang, PATH) },
      ]),
    ],
  };

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={t.learn.crumbs.label} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {t.learn.crumbs.home}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{t.learn.crumbs.topics}</span>
      </nav>

      <header className="mt-10 flex max-w-3xl flex-col gap-5">
        <Kicker>{copy.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,6vw,4.6rem)]">
          {slot(copy.h1, "accent", <span className="text-poke">{copy.h1Accent}</span>)}
        </h1>
        <p className="text-xl leading-relaxed text-ink-soft">{copy.lede}</p>
      </header>

      <section className="mt-14">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{copy.guides}</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {topics.map(({ topic, seo }) => (
            <li key={topic.slug} className="paper p-5">
              <Link href={`/topics/${topic.slug}`} className="font-display text-xl font-bold text-ink hover:text-poke-deep">
                {[seo.h1, seo.h1Accent.replace(/\.$/, "")].filter(Boolean).join(" ")}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{seo.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{copy.franchises}</h2>
        <p className="mt-3 max-w-3xl text-ink-soft">{copy.franchisesNote}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {hubs.map((hub) => (
            <li key={hub.slug}>
              <Link href={`/cards/${hub.slug}`} className={chip}>
                {hub.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{copy.pokemon}</h2>
        <p className="mt-3 max-w-3xl text-ink-soft">{copy.pokemonNote}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {mons.map((hub) => (
            <li key={hub.slug}>
              <Link href={`/pokemon/${hub.slug}`} className={chip}>
                {hub.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{copy.tools}</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {tools.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className={chip}>
                {tool.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
