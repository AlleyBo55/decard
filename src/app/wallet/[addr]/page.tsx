import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WalletView } from "@/components/wallet/WalletView";
import { Kicker } from "@/components/ui";
import { shortAddr } from "@/lib/format";

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function generateMetadata({ params }: { params: Promise<{ addr: string }> }): Promise<Metadata> {
  const { addr } = await params;
  return {
    title: `Trainer ${shortAddr(addr)}`,
    description: `Graded card collection, insured value and on-chain marketplace activity for wallet ${addr}.`,
    alternates: { canonical: `/wallet/${addr}` },
    robots: { index: false, follow: true },
  };
}

export default async function WalletPage({ params }: { params: Promise<{ addr: string }> }) {
  const { addr } = await params;
  if (!ADDRESS.test(addr)) notFound();
  return (
    <section className="pt-10 flex flex-col gap-6">
      <Kicker>Trainer lookup</Kicker>
      <WalletView wallet={addr} />
    </section>
  );
}
