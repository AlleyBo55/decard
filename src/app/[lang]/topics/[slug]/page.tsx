import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/LocaleLink";
import { notFound } from "next/navigation";
import { Kicker, MoreLink } from "@/components/ui";
import { SITE_URL } from "@/lib/constants";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { topicFor } from "@/lib/i18n/content";
import { topicSeo } from "@/lib/i18n/copy";
import { stringsFor } from "@/lib/i18n/strings";
import { breadcrumbLd, faqLd, jsonLd, pageMetadata, WEBSITE_ID } from "@/lib/seo";
import { TOPICS, TOPICS_UPDATED, topicBySlug } from "@/lib/topics";

// dynamicParams stays on: only English is built ahead of time, other languages render on first
// request, and an unknown slug is a notFound() below.

export function generateStaticParams(): { slug: string }[] {
  return TOPICS.map((topic) => ({ slug: topic.slug }));
}

type Props = { params: Promise<{ slug: string; lang: string }> };

/**
 * The topic in this language and its title, description and h1. A translated topic brings its own;
 * an English one keeps topicSeo's override (or the English). Null for an unknown slug.
 */
function localTopic(lang: Locale, slug: string) {
  const english = topicBySlug(slug);
  if (!english) return null;
  const topic = topicFor(lang, slug) ?? english;
  return { topic, seo: topic === english ? topicSeo(lang, slug, english) : topic };
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang: raw } = await params;
  const lang = asLocale(raw);
  const local = localTopic(lang, slug);
  if (!local) return {};
  return pageMetadata({ title: local.seo.title, description: local.seo.description, path: `/topics/${local.topic.slug}`, lang });
}

export default async function TopicPage({ params }: Props) {
  const { slug, lang: raw } = await params;
  const lang = asLocale(raw);
  const local = localTopic(lang, slug);
  if (!local) notFound();
  const { topic, seo } = local;
  const t = stringsFor(lang);
  const inLanguage = localeMeta(lang).html;
  const updated = new Intl.DateTimeFormat(inLanguage, { dateStyle: "long", timeZone: "UTC" }).format(new Date(TOPICS_UPDATED));
  const path = `/topics/${topic.slug}`;
  const url = `${SITE_URL}${localePath(lang, path)}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: seo.title,
        description: seo.description,
        datePublished: TOPICS_UPDATED,
        dateModified: TOPICS_UPDATED,
        inLanguage,
        isAccessibleForFree: true,
        mainEntityOfPage: url,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@type": "Organization", name: "Decard", url: SITE_URL },
        about: topic.about.map((name) => ({ "@type": "Thing", name })),
      },
      breadcrumbLd(`${url}#breadcrumb`, [
        { name: t.learn.crumbs.home, path: localePath(lang, "/") },
        { name: t.learn.crumbs.topics, path: localePath(lang, "/topics") },
        { name: seo.title, path: localePath(lang, path) },
      ]),
      { ...faqLd(topic.faq), inLanguage },
    ],
  };

  return (
    <article className="pb-12 pt-8 sm:pt-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={t.learn.crumbs.label} className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {t.learn.crumbs.home}
        </Link>
        <span aria-hidden>›</span>
        <Link href="/topics" className="hover:text-poke-deep">
          {t.learn.crumbs.topics}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{seo.title}</span>
      </nav>

      <header className="mt-10 flex max-w-3xl flex-col gap-5">
        <Kicker>{topic.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,6vw,4.6rem)]">
          {seo.h1}
          {seo.h1Accent ? (
            <>
              {" "}
              <span className="text-poke">{seo.h1Accent}</span>
            </>
          ) : null}
        </h1>
        <p className="text-xl leading-relaxed text-ink-soft">{topic.lede}</p>
        {lang !== "en" && <p className="text-sm text-ink-mute">{t.common.notice}</p>}
        <p className="text-sm text-ink-mute">
          {slot(t.learn.topic.updated, "date", <time dateTime={TOPICS_UPDATED}>{updated}</time>)}
        </p>
      </header>

      <div className="mt-14 flex max-w-3xl flex-col gap-14">
        {topic.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28 flex flex-col gap-4">
            <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[1.05rem] leading-8 text-ink-soft">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <section id="faq" className="scroll-mt-28">
          <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{t.learn.topic.faq}</h2>
          <div className="dash-divide mt-4 border-y border-sand">
            {topic.faq.map((item) => (
              <div key={item.q} className="py-5">
                <h3 className="font-display text-xl font-bold text-ink">{item.q}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="h-display text-[clamp(1.6rem,3.5vw,2.3rem)]">{t.learn.topic.more}</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {topic.links.filter((link) => !isHiddenPage(link.href)).map((link) => (
              <li key={link.href}>
                <MoreLink href={link.href}>{link.label}</MoreLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
