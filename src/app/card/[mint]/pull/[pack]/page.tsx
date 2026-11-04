import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardPage, cardMetadata } from "@/components/card/CardPage";
import { parsePack } from "@/lib/pull";

// A shared pull receipt: the card page with the sharer's pack price, its own
// link preview and receipt image. Keep it rendered per request even once the
// plain card page is cached: every pack price is its own URL, and few get
// opened. Old /card/<mint>?pull=50 links redirect here (next.config.ts).

export async function generateMetadata({ params }: PageProps<"/card/[mint]/pull/[pack]">): Promise<Metadata> {
  const { mint, pack } = await params;
  const price = parsePack(pack);
  return price ? cardMetadata(mint, price) : { title: "Card not found" };
}

export default async function PullPage({ params }: PageProps<"/card/[mint]/pull/[pack]">) {
  const { mint, pack } = await params;
  const price = parsePack(pack);
  if (!price) notFound();
  return <CardPage mint={mint} pack={price} />;
}
