import type { Metadata } from "next";
import { TapeBoard } from "@/components/tape/TapeBoard";

export const metadata: Metadata = {
  title: "Live Trade Tape · Cardex",
  description:
    "Every on-chain graded-card sale, listing and offer on Collector Crypt as it lands, decoded and enriched with card, grade and price. Filter by sales, listings or offers.",
  alternates: { canonical: "/tape" },
};

export default function TapePage() {
  return (
    <section className="py-6 flex flex-col gap-4">
      <header>
        <h1 className="pixel text-base sm:text-lg text-dex-yellow">LIVE TRADE TAPE</h1>
        <p className="text-sm text-muted mt-2 max-w-2xl">
          Every marketplace event on-chain, decoded in real time: who bought what, at what grade,
          for how much, and from whom. The pulse of the Collector Crypt economy.
        </p>
      </header>
      <TapeBoard />
    </section>
  );
}
