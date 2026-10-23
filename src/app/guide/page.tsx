import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE } from "@/lib/guide";
import { GuideBook } from "@/components/guide/GuideBook";
import { DialogBox, Kicker } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

const count = GUIDE.reduce((n, s) => n + s.terms.length, 0);

export const metadata: Metadata = pageMetadata({
  title: "Graded card guide: PSA vs CGC, pop reports, gem rate",
  description:
    "New to tokenized graded cards? Plain-language guide to grading, PSA vs CGC vs BGS, population reports, gem rate, insured value, floor, bids, deal score, vaults, redeeming and collector slang.",
  path: "/guide",
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GUIDE.flatMap((s) =>
    s.terms.map((t) => ({
      "@type": "Question",
      name: `What is ${t.term.toLowerCase()}?`,
      acceptedAnswer: { "@type": "Answer", text: `${t.short} ${t.body}` },
    })),
  ),
};

export default function GuidePage() {
  return (
    <section className="pt-10 flex flex-col gap-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header className="grid gap-8 lg:grid-cols-[1fr_auto] items-end">
        <div className="flex flex-col gap-4">
          <Kicker>Trainer&apos;s guide</Kicker>
          <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
            Your graded-card <span className="text-poke">Pokédex.</span>
          </h1>
          <p className="text-lg text-ink-soft max-w-2xl">
            {count} entries covering everything a new trainer meets on Decard, from grading and pop reports to
            bids, vaults and collector slang. Plain words, no jargon left unexplained.
          </p>
        </div>
        <DialogBox className="max-w-sm hidden md:block">
          <p className="dialog-text">Hello there! Welcome to the world of graded cards.</p>
        </DialogBox>
      </header>

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
