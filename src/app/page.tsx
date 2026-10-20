import Link from "next/link";
import { WalletSearch } from "@/components/WalletSearch";
import { HeroCatch } from "@/components/HeroCatch";
import { HeroStats } from "@/components/home/HeroStats";
import { TickerBands } from "@/components/home/TickerBands";
import { HomeSections } from "@/components/home/HomeSections";
import { DialogBox, TypeChip } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";

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
    </>
  );
}
