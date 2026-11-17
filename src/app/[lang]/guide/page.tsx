import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "@/components/LocaleLink";
import { GuideBook } from "@/components/guide/GuideBook";
import { DialogBox, Kicker } from "@/components/ui";
import { SITE_URL } from "@/lib/constants";
import { fmtNum } from "@/lib/format";
import { asLocale, localeMeta, localePath } from "@/lib/i18n";
import { guideFor } from "@/lib/i18n/content";
import { pageSeo } from "@/lib/i18n/copy";
import { fmt, plural } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import { jsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/guide";
const TITLE = "Card glossary: PSA vs CGC, hobby and crypto slang";
const DESCRIPTION =
  "Plain-language glossary for tokenized graded cards: PSA vs CGC vs BGS, pop reports, SIR and manga rares, plus the collector and Solana slang you see on X.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
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

export default async function GuidePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const copy = stringsFor(lang).learn.guide;
  const sections = guideFor(lang);
  const count = sections.reduce((n, s) => n + s.terms.length, 0);
  const inLanguage = localeMeta(lang).html;
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  const glossaryId = `${pageUrl}#glossary`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        inLanguage,
        mainEntity: sections.flatMap((s) =>
          s.terms.map((t) => ({
            "@type": "Question",
            // English lowercases the term mid-sentence. Other languages keep it as written (German nouns, acronyms).
            name: fmt(copy.question, { term: lang === "en" ? t.term.toLowerCase() : t.term }),
            acceptedAnswer: { "@type": "Answer", text: `${t.short} ${t.body}` },
          })),
        ),
      },
      // The glossary itself: one DefinedTerm per entry, each at its stable anchor.
      {
        "@type": "DefinedTermSet",
        "@id": glossaryId,
        name: copy.glossaryName,
        url: pageUrl,
        inLanguage,
        hasDefinedTerm: sections.flatMap((s) =>
          s.terms.map((t) => ({
            "@type": "DefinedTerm",
            "@id": `${pageUrl}#${t.id}`,
            url: `${pageUrl}#${t.id}`,
            name: t.term,
            description: `${t.short} ${t.body}`,
            inDefinedTermSet: { "@id": glossaryId },
          })),
        ),
      },
    ],
  };

  return (
    <section className="pt-10 flex flex-col gap-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <header className="grid gap-8 lg:grid-cols-[1fr_auto] items-end">
        <div className="flex flex-col gap-4">
          <Kicker>{copy.kicker}</Kicker>
          <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
            {slot(copy.h1, "accent", <span className="text-poke">{copy.h1Accent}</span>)}
          </h1>
          <p className="text-lg text-ink-soft max-w-2xl">{plural(lang, count, copy.lede, { n: fmtNum(count) })}</p>
        </div>
        <DialogBox className="max-w-sm hidden md:block">
          <p className="dialog-text">{copy.hello}</p>
        </DialogBox>
      </header>

      <div className="paper p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-display font-bold text-xl">{copy.explainer.title}</p>
          <p className="mt-1 text-ink-soft">{copy.explainer.text}</p>
        </div>
        <Link href="/tokenized-trading-cards" className="btn btn-yellow shrink-0">{copy.explainer.cta}</Link>
      </div>

      <GuideBook sections={sections} />

      <DialogBox className="max-w-2xl mx-auto !p-7 text-center" arrow={false}>
        <p className="dialog-text">{copy.outro.title}</p>
        <p className="mt-3 text-ink-soft">{copy.outro.text}</p>
        <Link href="/scanner?orderBy=deal" className="btn btn-red mt-5">
          {copy.outro.cta}
        </Link>
      </DialogBox>
    </section>
  );
}
