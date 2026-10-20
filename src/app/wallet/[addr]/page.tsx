import { WalletView } from "@/components/wallet/WalletView";

export const metadata = { title: "Wallet · Cardex" };

export default async function WalletPage({ params }: { params: Promise<{ addr: string }> }) {
  const { addr } = await params;
  return (
    <section className="py-6 flex flex-col gap-4">
      <h1 className="pixel text-base sm:text-lg text-dex-yellow">TRAINER WALLET</h1>
      <WalletView wallet={addr} />
    </section>
  );
}
