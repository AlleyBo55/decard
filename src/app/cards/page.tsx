import type { Metadata } from "next";
import { connection } from "next/server";
import {
  CardDirectory,
  cardDirectoryDescription,
  cardDirectoryPath,
  cardDirectoryTitle,
} from "@/components/cards/CardDirectory";
import { pageMetadata } from "@/lib/seo";

// Only serverless hosts read this. The first request after a start waits for the catalogue walk.
export const maxDuration = 60;

export const metadata: Metadata = pageMetadata({
  title: cardDirectoryTitle(1),
  description: cardDirectoryDescription(1),
  path: cardDirectoryPath(1),
});

export default async function CardsPage() {
  // Rendered per request: prerendering would walk the marketplace during `next
  // build`, and unlike /cards/page/[page] a static route can't defer its first
  // render to a request. Cheap anyway: the catalogue is in memory.
  await connection();
  return <CardDirectory page={1} />;
}
