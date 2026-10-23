import type { Metadata } from "next";
import { ScannerTable } from "@/components/scanner/ScannerTable";
import { Kicker } from "@/components/ui";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { categoryName, categoryPath, pageMetadata } from "@/lib/seo";

type ScannerSearch = Promise<{ search?: string; source?: string; orderBy?: string }>;

// One indexable URL per category; every other filter or sort canonicalizes to /scanner.
export async function generateMetadata({ searchParams }: { searchParams: ScannerSearch }): Promise<Metadata> {
  const { search } = await searchParams;
  if (!search || !PRIMARY_CATEGORIES.includes(search)) {
    return pageMetadata({
      title: "Collector Crypt listings ranked by deal score",
      description:
        "Every live graded-card listing on Collector Crypt and Magic Eden, ranked by deal score, price or freshness. Filter by Pokémon, One Piece, Riftbound and more.",
      path: "/scanner",
    });
  }
  const name = categoryName(search);
  return pageMetadata({
    title: `${name} graded cards for sale on Collector Crypt`,
    description: `Live ${name} graded card listings on Collector Crypt and Magic Eden, ranked by deal score: how far each slab sits under its insured value.`,
    path: categoryPath(search),
  });
}

export default async function ScannerPage({ searchParams }: { searchParams: ScannerSearch }) {
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
