import type { Metadata } from "next";
import { LiveGacha } from "@/components/gacha/LiveGacha";
import { LuckAnalyzer } from "@/components/luck/LuckAnalyzer";
import { Kicker } from "@/components/ui";
import { parsePackMemo, parseWalletAddress } from "@/lib/luck";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Collector Crypt pull luck analyzer",
  description:
    "Score every verified Collector Crypt Solana pack pull in a wallet, or a single pull, against the cards and tier odds available when it was awarded.",
  path: "/luck",
});

const firstParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export default async function LuckPage({ searchParams }: PageProps<"/luck">) {
  const query = await searchParams;
  // A memo wins when both are present.
  const initialInput = (firstParam(query.memo) || firstParam(query.wallet)).slice(0, 500);
  const key = parsePackMemo(initialInput) ?? parseWalletAddress(initialInput) ?? "";

  return (
    <section className="pt-10 flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Kicker>Collector Crypt gacha hub</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          Live gacha, odds now, <span className="text-poke">pull luck.</span>
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">
          Watch Collector Crypt packs open as they land, check what the next pull can return before you buy, and score
          any pull against the exact card pool and tier odds it was drawn from. Paste a wallet to score every pull it
          opened, or one pack memo or official verify-selection URL.
        </p>
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {[
            ["#live", "Live pulls"],
            ["#hall-of-fame", "Hall of fame"],
            ["#odds", "Odds now"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-cream-hi px-4 text-sm font-extrabold shadow-[0_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
            >
              {label} <span aria-hidden className="text-poke">↓</span>
            </a>
          ))}
        </nav>
        <p className="text-sm text-ink-mute max-w-2xl">
          Collector Crypt Solana only. Values are insured values, not sale prices, returns or profit. Every pull is
          independent, so a cold streak doesn&apos;t make the next pack luckier.
        </p>
      </header>
      <LuckAnalyzer key={key} initialInput={initialInput} />
      {/* scroll-mt adds to the root's scroll-padding, so the sticky header never covers #live. */}
      <section id="live" aria-label="Live gacha" className="mt-10 scroll-mt-6">
        <LiveGacha />
      </section>
    </section>
  );
}
