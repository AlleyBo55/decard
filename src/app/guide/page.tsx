import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE } from "@/lib/guide";
import { GuideBook } from "@/components/guide/GuideBook";
import { DialogBox, Kicker } from "@/components/ui";
import { SITE_URL } from "@/lib/constants";
import { jsonLd, pageMetadata } from "@/lib/seo";

const count = GUIDE.reduce((n, s) => n + s.terms.length, 0);

export const metadata: Metadata = pageMetadata({
  title: "Card glossary: PSA vs CGC, hobby and crypto slang",
  description:
    "Plain-language glossary for tokenized graded cards: PSA vs CGC vs BGS, pop reports, SIR and manga rares, plus the collector and Solana slang you see on X.",
  path: "/guide",
});

const pageUrl = `${SITE_URL}/guide`;
const glossaryId = `${pageUrl}#glossary`;
const structured = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: GUIDE.flatMap((s) =>
        s.terms.map((t) => ({
          "@type": "Question",
          name: `What is ${t.term.toLowerCase()}?`,
          acceptedAnswer: { "@type": "Answer", text: `${t.short} ${t.body}` },
        })),
      ),
    },
    // The glossary itself: one DefinedTerm per entry, each at its stable anchor.
    {
      "@type": "DefinedTermSet",
      "@id": glossaryId,
      name: "Decard glossary of graded card, collector and crypto terms",
      url: pageUrl,
      inLanguage: "en",
      hasDefinedTerm: GUIDE.flatMap((s) =>
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

export default function GuidePage() {
  return (
    <section className="pt-10 flex flex-col gap-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <header className="grid gap-8 lg:grid-cols-[1fr_auto] items-end">
        <div className="flex flex-col gap-4">
          <Kicker>Trainer&apos;s guide</Kicker>
          <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
            Your graded-card <span className="text-poke">Pokédex.</span>
          </h1>
          <p className="text-lg text-ink-soft max-w-2xl">
            {count} entries covering everything a new trainer meets on Decard, from grading and pop reports to
            bids and vaults, plus the collector and crypto slang you see on X. Plain words, no jargon left unexplained.
          </p>
        </div>
        <DialogBox className="max-w-sm hidden md:block">
          <p className="dialog-text">Hello there! Welcome to the world of graded cards.</p>
        </DialogBox>
      </header>

      <div className="paper p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-display font-bold text-xl">New to on-chain cards?</p>
          <p className="mt-1 text-ink-soft">Start with vault custody, tokenized ownership, redemption, deal scores and risks.</p>
        </div>
        <Link href="/tokenized-trading-cards" className="btn btn-yellow shrink-0">Read the 10-minute guide</Link>
      </div>

      <GuideBook sections={GUIDE} />

      <DialogBox className="max-w-2xl mx-auto !p-7 text-center" arrow={false}>
        <p className="dialog-text">Ready to put it to work?</p>
        <p className="mt-3 text-ink-soft">Open the scanner, sort by Best deal, and find a card trading under its insured value.</p>
        <Link href="/scanner?orderBy=deal" className="btn btn-red mt-5">
          Open the scanner
        </Link>
      </DialogBox>
    </section>
  );
}
