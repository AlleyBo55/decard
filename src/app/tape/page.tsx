import type { Metadata } from "next";
import { TapeBoard } from "@/components/tape/TapeBoard";
import { Kicker } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Collector Crypt live sales and trade tape",
  description:
    "Every graded-card sale, listing and bid on the Collector Crypt marketplace program, decoded live with card, grade, price and wallets. Filter out bulk bid bots.",
  path: "/tape",
});

export default function TapePage() {
  return (
    <section className="pt-10 flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Kicker>Live trade tape</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          The market&apos;s <span className="text-poke">heartbeat.</span>
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">
          Every move on the Collector Crypt marketplace program, decoded in real time: who bought what, at what
          grade, for how much, and from whom.
        </p>
      </header>
      <TapeBoard />
    </section>
  );
}
