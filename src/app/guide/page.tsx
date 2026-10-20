import type { Metadata } from "next";
import Link from "next/link";
import { Panel, PixelLabel, Badge } from "@/components/ui";
import { Pokedex } from "@/components/icons";

export const metadata: Metadata = {
  title: "Trainer's Guide · Cardex",
  description:
    "New to tokenized graded cards? Learn grading, insured value, gem rate, population reports, pNFT vs cNFT, floor, offers and every term a trader needs, in plain language.",
  alternates: { canonical: "/guide" },
};

interface Term {
  term: string;
  short: string;
  body: string;
  also?: string;
}

const SECTIONS: { title: string; terms: Term[] }[] = [
  {
    title: "Grading",
    terms: [
      {
        term: "Grading",
        short: "A professional score of a card's condition.",
        body: "An independent company inspects a card for centering, corners, edges and surface, then assigns a number. A higher grade means a cleaner card and, usually, a higher price. Once graded, the card is sealed so the grade is guaranteed.",
      },
      {
        term: "PSA / CGC / BGS",
        short: "The main grading companies.",
        body: "PSA (Professional Sports Authenticator), CGC (Certified Guaranty Company) and BGS (Beckett Grading Services) are the three names you see most. Each uses its own scale and label. The same card can carry different grades from different companies, and the market prices them differently, so always read which company graded it.",
      },
      {
        term: "The grade scale",
        short: "Usually 1 to 10.",
        body: "10 is flawless (PSA calls it GEM-MT 10, BGS calls a perfect card Black Label 10). 9 is near-mint, still strong. Below 8 the card shows visible wear and the price drops sharply. Half grades like CGC 9.5 exist too.",
        also: "GEM-MT = Gem Mint, the top tier.",
      },
      {
        term: "The slab",
        short: "The sealed plastic case.",
        body: "After grading, the card is encased in a tamper-evident plastic holder with a label showing the card, the grade and a certification number. 'Slabbed' means graded and sealed. The slab protects the grade's value.",
      },
    ],
  },
  {
    title: "Rarity & value signals",
    terms: [
      {
        term: "Population (Pop) Report",
        short: "How many copies exist at each grade.",
        body: "The grading company publishes how many of a given card it has graded at each level. If only 12 cards exist as PSA 10, that card is scarce at that grade, which supports a higher price. A low population at the top grade is a strong rarity signal.",
      },
      {
        term: "Gem Rate",
        short: "The share of a card that grades 10.",
        body: "Of every copy submitted, the percentage that came back as a perfect 10. A low gem rate means the card is hard to get in perfect condition, so each 10 is more special. A high gem rate means 10s are common and less of a premium.",
      },
      {
        term: "Insured Value",
        short: "The vault's declared worth of the card.",
        body: "Collector Crypt stores the physical card in a professional vault and records an insured value for it. It's a useful reference point for what the card is worth, though the live market price can sit above or below it.",
      },
      {
        term: "Parallel / Serial",
        short: "Special versions and numbering.",
        body: "A parallel is an alternate printing (holo, full-art, alternate-art) that's rarer than the base card. A serial number like 12/99 means only 99 were printed and this is the 12th, which adds scarcity.",
      },
    ],
  },
  {
    title: "Buying & selling",
    terms: [
      {
        term: "Floor",
        short: "The cheapest listing available.",
        body: "The lowest price anyone is currently asking for a card in a given set or category. 'Floor sweeping' means buying up the cheapest listings. The floor is the fastest read on what a card costs right now.",
      },
      {
        term: "Listing",
        short: "A card put up for sale at a set price.",
        body: "The owner picks a price and the card shows in the market until someone buys it or it's cancelled. On Collector Crypt the card stays in the owner's wallet while listed (non-custodial), delegated for sale.",
      },
      {
        term: "Offer / Bid",
        short: "A price a buyer proposes.",
        body: "Instead of paying the asking price, a buyer can offer less and wait for the owner to accept. Offers are backed by funds held in escrow. The owner can accept, ignore, or wait for a better one.",
      },
      {
        term: "Deal Score",
        short: "How far below insured value a listing sits.",
        body: "A Cardex number from 0 to 100. It compares the asking price to the card's insured value, so a card listed well under its insured worth scores high. It's a quick filter for underpriced listings, not a guarantee, so always check the card yourself.",
        also: "Only shown on USDC listings with an insured value.",
      },
    ],
  },
  {
    title: "On-chain & tokenization",
    terms: [
      {
        term: "Tokenized card",
        short: "A physical card represented by an on-chain token.",
        body: "The real card sits in a vault; ownership is tracked by a token on Solana. Holding the token means owning the card. You can trade the token instantly, or redeem it to have the physical card shipped to you.",
      },
      {
        term: "pNFT / cNFT / Core",
        short: "The token standards used.",
        body: "Different technical formats for the token. pNFT (programmable NFT) enforces royalties on transfer. cNFT (compressed NFT) is cheaper to mint at scale using a Merkle tree. Core is a newer single-account standard. For a trader the practical difference is small; it mostly affects fees and mechanics under the hood.",
      },
      {
        term: "Wallet",
        short: "Your on-chain account and its address.",
        body: "A Solana address that holds your tokens. Every address is public, so you can look up any wallet's holdings and trade history. On Cardex, paste an address to see what it owns and what it's been doing.",
      },
      {
        term: "USDC vs SOL",
        short: "The two currencies you'll see.",
        body: "Collector Crypt lists in USDC, a dollar-pegged stablecoin, so prices read like dollars. Magic Eden listings often settle in SOL, Solana's native token, whose dollar value floats. Cardex shows the SOL price live so you can compare.",
      },
    ],
  },
];

export default function GuidePage() {
  return (
    <section className="py-6 flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Pokedex className="h-5 w-5 text-dex-yellow" />
          <h1 className="pixel text-base sm:text-lg text-dex-yellow">TRAINER&apos;S GUIDE</h1>
        </div>
        <p className="text-sm text-muted max-w-2xl">
          Everything a newcomer needs to read a graded-card market with confidence. Plain-language
          definitions of every term you&apos;ll meet on Cardex.
        </p>
      </header>

      {/* quick jump */}
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a
            key={s.title}
            href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
            className="rounded-lg border-2 border-line bg-panel px-3 py-1.5 text-sm hover:border-dex-yellow transition-colors"
          >
            {s.title}
          </a>
        ))}
      </div>

      {SECTIONS.map((section) => (
        <div
          key={section.title}
          id={section.title.replace(/\s+/g, "-").toLowerCase()}
          className="scroll-mt-20 flex flex-col gap-3"
        >
          <PixelLabel className="text-dex-cyan">{section.title}</PixelLabel>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.terms.map((t) => (
              <Panel key={t.term} className="p-4 flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-ink">{t.term}</h3>
                </div>
                <p className="text-sm text-dex-yellow/90">{t.short}</p>
                <p className="text-sm text-muted leading-relaxed">{t.body}</p>
                {t.also && (
                  <p className="text-xs text-muted/80 border-t border-line pt-2 mt-1">{t.also}</p>
                )}
              </Panel>
            ))}
          </div>
        </div>
      ))}

      <Panel screen className="p-5 text-center flex flex-col gap-3 items-center">
        <Badge tone="cc">Ready?</Badge>
        <p className="text-sm text-muted max-w-md">
          Put it to work. Open the scanner, sort by Best Deal, and find a card trading under its
          insured value.
        </p>
        <Link
          href="/scanner?orderBy=deal"
          className="rounded-lg bg-dex-yellow px-4 py-2 text-sm font-semibold text-black hover:brightness-105"
        >
          Open the Scanner
        </Link>
      </Panel>
    </section>
  );
}
