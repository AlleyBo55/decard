import type { Metadata } from "next";
import { CardPage, cardMetadata } from "@/components/card/CardPage";

// Rendered per request and streamed: the shell and loading.tsx go out at once
// and each section fills in as its own data arrives. Not ISR yet: every <Link>
// in view would then prefetch a whole uncached card page (~70 ms of CPU against
// ~1 ms), and getCardMarket's 10s data-cache lifetime (lib/cc.ts) would cap the
// page cache at 10s. With both fixed, `revalidate = 300` and a
// generateStaticParams returning [] turn it on; the page already reads no
// cookies, headers or searchParams (pull receipts live at ./pull/[pack]).

export async function generateMetadata({ params }: PageProps<"/card/[mint]">): Promise<Metadata> {
  const { mint } = await params;
  return cardMetadata(mint, null);
}

export default async function Page({ params }: PageProps<"/card/[mint]">) {
  const { mint } = await params;
  return <CardPage mint={mint} pack={null} />;
}
