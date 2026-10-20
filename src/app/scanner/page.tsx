import { ScannerTable } from "@/components/scanner/ScannerTable";

export const metadata = { title: "Scanner · Cardex" };

export default async function ScannerPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; source?: string; orderBy?: string }>;
}) {
  const sp = await searchParams;
  const initialSource = sp.source === "CC" || sp.source === "ME" ? sp.source : "";

  return (
    <section className="py-6 flex flex-col gap-4">
      <header>
        <h1 className="pixel text-base sm:text-lg text-dex-yellow">LISTING SCANNER</h1>
        <p className="text-sm text-muted mt-2 max-w-2xl">
          Every live graded-card listing across Collector Crypt and Magic Eden. Deal score ranks how
          far below insured value a card sits, so the best buys rise to the top. Refreshes every 10s.
        </p>
      </header>
      <ScannerTable
        initialSearch={sp.search ?? ""}
        initialSource={initialSource}
        initialOrder={sp.orderBy ?? "deal"}
      />
    </section>
  );
}
