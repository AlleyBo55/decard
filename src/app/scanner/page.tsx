import type { Metadata } from "next";
import { ScannerTable } from "@/components/scanner/ScannerTable";
import { Kicker } from "@/components/ui";

export const metadata: Metadata = {
  title: "Listing Scanner",
  description:
    "Every live graded-card listing on Collector Crypt and Magic Eden, ranked by deal score, price or freshness. Filter by Pokémon, One Piece, Riftbound and more.",
  alternates: { canonical: "/scanner" },
};

export default async function ScannerPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; source?: string; orderBy?: string }>;
}) {
  const sp = await searchParams;
  const source = sp.source === "CC" || sp.source === "ME" ? sp.source : "";

  return (
    <section className="pt-10 flex flex-col gap-6">
      <header className="flex flex-col gap-4">
        <Kicker>Listing scanner</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          Every listing, <span className="text-poke">ranked.</span>
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">
          Live graded cards across Collector Crypt and Magic Eden. The deal score shows how far each USDC
          listing sits under its insured value, so the best buys float to the top.
        </p>
      </header>
      <ScannerTable initialSearch={sp.search ?? ""} initialSource={source} initialOrder={sp.orderBy ?? "deal"} />
    </section>
  );
}
