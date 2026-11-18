import type { Metadata } from "next";
import Link from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { BrowseByFranchise } from "@/components/hubs/BrowseByFranchise";
import { CategoryMarket } from "@/components/hubs/CategoryMarket";
import { Kicker, MoreLink } from "@/components/ui";
import { CATEGORY_HUBS, categoryHub, hubNoun, type CategoryHub } from "@/lib/category-hubs";
import { SITE_URL } from "@/lib/constants";
import { fmtNum, gradeShort, shortCardName } from "@/lib/format";
import { POKEMON_HUBS } from "@/lib/pokemon-hubs";
import { alsoCalled } from "@/lib/i18n/aliases";
import { AlsoKnownAs } from "@/components/hubs/AlsoKnownAs";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { guideFor, hubFor } from "@/lib/i18n/content";
import { hubSeo, localFranchiseName, localPokemonName } from "@/lib/i18n/copy";
import { fmt, plural } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import { breadcrumbLd, categoryPath, jsonLd, ORGANIZATION_ID, pageMetadata, WEBSITE_ID } from "@/lib/seo";
import { loadCategoryView } from "./market";

// Every hub is prerendered at build, then served from the ISR cache and rebuilt at most
// every 15 minutes with up to four Collector Crypt reads. Any other slug is a 404.
export const revalidate = 900;
// Only English hubs are built ahead of time (the layout's generateStaticParams). Other languages
// render on first request, so dynamicParams stays on; an unknown slug is a notFound() below.
// The largest categories chain three cursor reads one after another.
export const maxDuration = 60;

export function generateStaticParams(): { category: string }[] {
  return CATEGORY_HUBS.map((hub) => ({ category: hub.slug }));
}

type Props = { params: Promise<{ category: string; lang: string }> };

/** The refresh time in the page's language, always in UTC. */
const utc = (lang: Locale, iso: string) =>
  `${new Intl.DateTimeFormat(localeMeta(lang).html, { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(iso))} UTC`;
const chip =
  "inline-block rounded-full border-2 border-sand bg-cream-hi px-3 py-1.5 text-sm font-bold text-ink-soft hover:border-poke hover:text-poke-deep";
const link = "font-bold text-azure-deep hover:text-poke-deep";
/** Per-Pokémon guides shown on the Pokémon hub, most collected first. */
const POKEMON_PICKS = POKEMON_HUBS.slice(0, 12);

/**
 * The hub's copy in this language (lib/i18n/content). A language without its own copy of this hub
 * gets the English hub back, plus the hubSeo() template for its title, description, h1 and intro.
 */
function hubCopy(lang: Locale, hub: CategoryHub) {
  const local = hubFor(lang, hub.slug) ?? hub;
  const template = lang === "en" || local !== hub ? null : hubSeo(lang, hub.slug, hub.name);
  return { local, template };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, lang: raw } = await params;
  const hub = categoryHub(category);
  if (!hub) return {};
  const lang = asLocale(raw);
  const { local, template } = hubCopy(lang, hub);
  const seo = template ?? local;
  return pageMetadata({ title: seo.title, description: seo.description, path: `/cards/${hub.slug}`, lang });
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
  const { category, lang: raw } = await params;
  const hub = categoryHub(category);
  if (!hub) notFound();
  const lang = asLocale(raw);
  const t = stringsFor(lang);
  const s = t.hubs.category;
  const { local, template } = hubCopy(lang, hub);
  const name = localFranchiseName(lang, hub.slug, hub.name);
  // English keeps the lower-case noun ("soccer cards"); other languages use the franchise's local name.
  const noun = lang === "en" ? hubNoun(hub) : name;
  const view = await loadCategoryView(hub.category);
  const path = `/cards/${hub.slug}`;
  const url = `${SITE_URL}${localePath(lang, path)}`;
  const scanner = categoryPath(hub.category);
  const shown = view ? [...new Map([...view.cheapest, ...view.highest].map((c) => [c.nftAddress, c])).values()] : [];
  const related = hub.related.map(categoryHub).filter((h): h is CategoryHub => h != null);
  const glossary = new Map(guideFor(lang).flatMap((section) => section.terms.map((term) => [term.id, term.term] as const)));
  const terms = hub.terms.flatMap((id) => {
    const term = glossary.get(id);
    return term ? [{ id, term }] : [];
  });

  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: template ? template.h1 : local.h1,
        description: (template ?? local).description,
        inLanguage: localeMeta(lang).html,
        isAccessibleForFree: true,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        about: { "@type": "Thing", name: fmt(s.ldAbout, { name }) },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(shown.length ? { mainEntity: { "@id": `${url}#listings` } } : {}),
      },
      breadcrumbLd(`${url}#breadcrumb`, [
        { name: t.hubs.crumbs.home, path: localePath(lang, "/") },
        ...(isHiddenPage("/cards") ? [] : [{ name: t.hubs.crumbs.cards, path: localePath(lang, "/cards") }]),
        { name, path: localePath(lang, path) },
      ]),
      ...(shown.length
        ? [
            {
              "@type": "ItemList",
              "@id": `${url}#listings`,
              name: fmt(s.ldListings, { noun }),
              numberOfItems: shown.length,
              itemListElement: shown.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: `${shortCardName(c.itemName)} ${gradeShort(c.gradingCompany, c.grade)}`.trim(),
                url: `${SITE_URL}${localePath(lang, `/card/${c.nftAddress}`)}`,
              })),
            },
          ]
        : []),
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: local.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={t.hubs.crumbs.label} className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {t.hubs.crumbs.home}
        </Link>
        <span aria-hidden>›</span>
        {!isHiddenPage("/cards") && (
          <>
            <Link href="/cards" className="hover:text-poke-deep">
              {t.hubs.crumbs.cards}
            </Link>
            <span aria-hidden>›</span>
          </>
        )}
        <span className="text-ink">{name}</span>
      </nav>

      <header className="mt-10 flex max-w-4xl flex-col gap-5">
        <Kicker>{s.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,6vw,4.4rem)]">{template ? template.h1 : <Headline text={local.h1} />}</h1>
        <p className="max-w-3xl text-xl leading-relaxed text-ink-soft">
          {template ? template.intro : fmt(view?.complete ? s.lede : s.ledeLowest, { noun })}
        </p>
        {lang !== "en" && <p className="text-sm text-ink-mute">{t.common.notice}</p>}
        {alsoCalled(lang, `/cards/${hub.slug}`, [name]) && (
          <p className="max-w-3xl text-base text-ink-soft">{alsoCalled(lang, `/cards/${hub.slug}`, [name])}</p>
        )}
        {view && (
          <p className="text-sm text-ink-mute">
            {slot(t.hubs.updated, "time", <time dateTime={view.fetchedAt}>{utc(lang, view.fetchedAt)}</time>)}
          </p>
        )}
      </header>

      {/* The per-Pokémon guides already cover single Pokémon in depth, so this hub sends people there. */}
      {hub.slug === "pokemon" && (
        <nav aria-labelledby="by-pokemon" className="paper mt-10 flex flex-col gap-4 p-6">
          <h2 id="by-pokemon" className="font-display text-2xl font-bold text-ink">
            {s.pokemonTitle}
          </h2>
          <p className="text-ink-soft">
            {plural(lang, POKEMON_HUBS.length - 3, s.pokemonText, { n: fmtNum(POKEMON_HUBS.length - 3) })}
          </p>
          <ul className="flex flex-wrap gap-2">
            {POKEMON_PICKS.map((p) => (
              <li key={p.slug}>
                <Link href={`/pokemon/${p.slug}`} prefetch={false} className={chip}>
                  {localPokemonName(lang, p.slug, p.name)}
                </Link>
              </li>
            ))}
          </ul>
          <MoreLink href="/pokemon">{plural(lang, POKEMON_HUBS.length, s.pokemonAll, { n: fmtNum(POKEMON_HUBS.length) })}</MoreLink>
        </nav>
      )}

      {view ? (
        <CategoryMarket noun={noun} view={view} scanner={scanner} />
      ) : (
        <p className="paper mt-10 p-6 text-ink-soft">
          {slot(
            fmt(s.unavailable, { noun }),
            "scanner",
            <Link href={scanner} className={link}>
              {s.unavailableLink}
            </Link>,
          )}
        </p>
      )}

      {/* The names collectors in this language use for the franchise's most listed subjects ("Shanks · Jeki"). */}
      <AlsoKnownAs lang={lang} slug={hub.slug} />

      <section aria-labelledby="about" className="mt-16 flex max-w-3xl flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">
        <h2 id="about" className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">
          {fmt(s.aboutTitle, { noun })}
        </h2>
        {local.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {terms.length > 0 && (
          <div className="flex flex-col gap-3 pt-2">
            <p className="font-pixel text-[9px] text-ink-mute">{s.terms}</p>
            <ul className="flex flex-wrap gap-2">
              {terms.map((term) => (
                <li key={term.id}>
                  <Link href={`/guide#${term.id}`} className={chip}>
                    {term.term}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-3 pt-2">
          <MoreLink href={scanner}>{fmt(s.scannerMore, { noun })}</MoreLink>
          <MoreLink href="/guide">{s.glossaryMore}</MoreLink>
          <MoreLink href="/tokenized-trading-cards">{s.explainerMore}</MoreLink>
          {!isHiddenPage("/sales") && <MoreLink href="/sales">{s.salesMore}</MoreLink>}
        </div>
      </section>

      {/* Native <details>, so answers are readable without JavaScript. The FAQPage data above uses the same list. */}
      <section aria-labelledby="faq" className="mt-16 flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Kicker>{fmt(s.faqKicker, { name })}</Kicker>
          <h2 id="faq" className="h-display text-[clamp(1.7rem,3.4vw,2.6rem)]">
            {s.faqTitle}
          </h2>
        </div>
        <div className="dash-divide">
          {local.faq.map((f) => (
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
          {s.relatedTitle}
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/cards/${r.slug}`}
                prefetch={false}
                className="paper group flex h-full flex-col gap-1.5 p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="font-display text-xl font-bold text-ink group-hover:text-poke-deep">
                  {fmt(s.relatedName, { name: localFranchiseName(lang, r.slug, r.name) })}
                </span>
                <span className="text-sm text-ink-soft">{s.relatedSub}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.everyFranchise}</h3>
        <BrowseByFranchise exclude={hub.slug} />
      </section>
    </article>
  );
}
