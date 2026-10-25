import type { Metadata } from "next";
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
        <Kicker>Pull luck analyzer</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          How lucky was <span className="text-poke">that pull?</span>
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">
          Compare Collector Crypt Solana pulls with the historical tier odds and exact card pool available when each
          was awarded. Paste a wallet to score every pull it opened, or one pack memo or official verify-selection URL.
        </p>
        <p className="text-sm text-ink-mute max-w-2xl">
          Collector Crypt Solana only. This measures historical pull rarity from insured values; it does not
          estimate a sale price, return, or profit. Every pull is independent, so a low score doesn&apos;t make the
          next pack luckier.
        </p>
      </header>
      <LuckAnalyzer key={key} initialInput={initialInput} />
    </section>
  );
}
