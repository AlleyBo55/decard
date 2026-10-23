import type { Metadata } from "next";
import {
  CardDirectory,
  cardDirectoryDescription,
  cardDirectoryPath,
  cardDirectoryTitle,
} from "@/components/cards/CardDirectory";
import { pageMetadata } from "@/lib/seo";

export const maxDuration = 30;

export const metadata: Metadata = pageMetadata({
  title: cardDirectoryTitle(1),
  description: cardDirectoryDescription(1),
  path: cardDirectoryPath(1),
});

export default function CardsPage() {
  return <CardDirectory page={1} />;
}
