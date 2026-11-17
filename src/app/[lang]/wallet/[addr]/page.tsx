import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WalletView } from "@/components/wallet/WalletView";
import { Kicker } from "@/components/ui";
import { shortAddr } from "@/lib/format";
import { asLocale } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import { pageMetadata } from "@/lib/seo";

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function generateMetadata({ params }: { params: Promise<{ addr: string; lang: string }> }): Promise<Metadata> {
  const { addr, lang } = await params;
  const t = stringsFor(asLocale(lang)).market.wallet;
  return {
    ...pageMetadata({
      title: fmt(t.title, { addr: shortAddr(addr) }),
      description: fmt(t.description, { addr }),
      path: `/wallet/${addr}`,
      lang: asLocale(lang),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function WalletPage({ params }: { params: Promise<{ addr: string; lang: string }> }) {
  const { addr, lang } = await params;
  if (!ADDRESS.test(addr)) notFound();
  const t = stringsFor(asLocale(lang)).market.wallet;
  return (
    <section className="pt-10 flex flex-col gap-6">
      <Kicker>{t.kicker}</Kicker>
      <WalletView wallet={addr} />
    </section>
  );
}
