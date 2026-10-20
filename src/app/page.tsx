import Link from "next/link";
import { TradeTape } from "@/components/TradeTape";
import { SolTicker } from "@/components/SolTicker";
import { WalletSearch } from "@/components/WalletSearch";
import { HeroBall } from "@/components/HeroBall";
import { Highlights } from "@/components/Highlights";
import { MarketStats } from "@/components/MarketStats";
import { PixelLabel } from "@/components/ui";
import { Pulse } from "@/components/icons";
import { CATEGORIES } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-6">
      {/* hero — Pokédex faceplate */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-dex-red-dark chassis p-5 sm:p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <PixelLabel className="text-white/90">SOLANA · GRADED CARDS</PixelLabel>
              <SolTicker />
            </div>
            <h1 className="pixel text-3xl sm:text-5xl leading-tight text-white drop-shadow">
              CARD<span className="text-dex-yellow">EX</span>
            </h1>
            <p className="text-base sm:text-lg text-white/85 max-w-lg">
              Gotta scan &apos;em all. The live dashboard for tokenized graded cards. Track
              listings, deal scores, and every wallet&apos;s moves across Collector Crypt and Magic
              Eden. On-chain, no login.
            </p>
            <div id="track" className="scroll-mt-20">
              <WalletSearch />
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {CATEGORIES.slice(0, 6).map((c) => (
                <Link
                  key={c}
                  href={`/scanner?search=${encodeURIComponent(c)}`}
                  className="rounded-full border border-white/25 bg-black/15 px-3 py-1 text-xs text-white/85 hover:bg-dex-yellow hover:text-black hover:border-dex-yellow transition-colors"
                >
                  {c}
                </Link>
              ))}
            </div>
            <Link href="/guide" className="text-xs text-white/70 hover:text-dex-yellow w-fit">
              New to graded cards? Read the Trainer&apos;s Guide →
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="lcd rounded-full p-3 sm:p-5">
              <HeroBall size={280} />
            </div>
          </div>
        </div>
      </section>

      {/* market snapshot — per category / platform */}
      <MarketStats />

      {/* highlight rails */}
      <Highlights />

      {/* live tape */}
      <section id="tape" className="scroll-mt-20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pulse className="h-4 w-4 text-dex-yellow" />
            <PixelLabel className="text-dex-yellow">LIVE TRADE TAPE</PixelLabel>
          </div>
          <Link href="/tape" className="text-xs text-muted hover:text-dex-yellow">
            full tape →
          </Link>
        </div>
        <TradeTape />
      </section>
    </div>
  );
}
