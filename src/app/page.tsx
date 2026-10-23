import Link from "next/link";
import { WalletSearch } from "@/components/WalletSearch";
import { HeroCatch } from "@/components/HeroCatch";
import { HeroStats } from "@/components/home/HeroStats";
import { TickerBands } from "@/components/home/TickerBands";
import { HomeSections } from "@/components/home/HomeSections";
import { DialogBox, MoreLink, SectionHead, TypeChip } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { jsonLd } from "@/lib/seo";

// Plain text rendered on the server: search engines and AI assistants read it
// without running the page's JavaScript. The same list feeds the FAQPage data.
const FAQ = [
  {
    q: "What is Decard?",
    a: "A free, open-source scanner and tracker for Collector Crypt graded cards on Solana. It ranks live Collector Crypt and Magic Eden listings by deal score, decodes every on-chain sale, listing and bid, and shows population reports and any wallet's cards.",
  },
  {
    q: "What is a deal score?",
    a: "How far a USDC listing sits under the card's insured value, from 0 to 100. A card insured at $100 and listed at $80 scores 20. Sorting the scanner by best deal puts the deepest discounts first.",
  },
  {
    q: "Is Decard part of Collector Crypt?",
    a: "No. Decard is independent and fan-made. It reads Collector Crypt's public marketplace API and the Solana blockchain, and links out to Collector Crypt and Magic Eden when you want to buy.",
  },
  {
    q: "Do I need to sign up or connect a wallet?",
    a: "No. Decard is read-only: no account, no wallet connection and no API key. Paste any Solana address to see that wallet's graded cards and marketplace activity.",
  },
  {
    q: "Which cards does Decard cover?",
    a: "Every graded card listed on Collector Crypt: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam and sports cards, graded by PSA, CGC, Beckett (BGS) and others.",
  },
  {
    q: "Where does the data come from?",
    a: "Listings, insured values, bids and population reports come from Collector Crypt's public API. The trade tape is decoded from the Collector Crypt marketplace program on Solana. There is no database: every number is read live.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      {/* hero */}
      <section className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center pt-10 sm:pt-16">
        <div className="relative z-10">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="kicker">Solana · graded card dex</span>
            <span className="inline-flex items-center gap-2 font-pixel text-[9px] text-up">
              <span className="live-dot" /> LIVE
            </span>
          </div>
          <h1 className="h-display mt-6 text-[clamp(3rem,7.4vw,5.8rem)]">
            Gotta <span className="text-poke">scan</span>
            <br />
            <span className="swash">&apos;em all.</span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-ink-soft max-w-xl leading-relaxed">
            Live listings, deal scores, real bids and every wallet&apos;s moves for tokenized graded cards on
            Collector Crypt and Magic Eden. No login, no keys.
          </p>
          <div className="mt-8 max-w-xl">
            <WalletSearch />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {PRIMARY_CATEGORIES.slice(0, 6).map((c) => (
              <TypeChip key={c} category={c} href={`/scanner?search=${encodeURIComponent(c)}`} />
            ))}
          </div>
          <HeroStats />
        </div>
        <HeroCatch />
      </section>

      <TickerBands />

      <HomeSections />

      {/* professor's tip */}
      <Reveal className="mt-24">
        <DialogBox className="max-w-3xl mx-auto !p-6 sm:!p-8">
          <p className="dialog-text !text-[12px]">PROFESSOR&apos;S TIP</p>
          <p className="mt-3 text-lg text-ink-soft leading-relaxed">
            A PSA 10 with a population of 12 is a different beast from a PSA 10 everyone owns. Before you buy,
            check the pop report, the gem rate and how far the price sits from insured value.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/guide" className="btn btn-red">
              Read the Trainer&apos;s Guide
            </Link>
            <Link href="/scanner?orderBy=deal" className="btn btn-cream">
              Find a deal
            </Link>
          </div>
        </DialogBox>
      </Reveal>

      {/* FAQ: native <details>, so it works and is readable without JavaScript. */}
      <section className="mt-24 max-w-3xl mx-auto flex flex-col gap-6">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqLd) }} />
        <SectionHead kicker="Trainer FAQ" title="Questions, answered." />
        <div className="dash-divide">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="shrink-0 text-xs text-poke transition-transform group-open:rotate-90">
                  ▶
                </span>
              </summary>
              <p className="mt-3 text-ink-soft leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <MoreLink href="/cards">Browse every listed card</MoreLink>
          <MoreLink href="/tokenized-trading-cards">How tokenized trading cards work</MoreLink>
          <MoreLink href="/guide">Every term in the Trainer&apos;s Guide</MoreLink>
        </div>
      </section>
    </>
  );
}
