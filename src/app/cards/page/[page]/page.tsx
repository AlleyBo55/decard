import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import {
  CARD_DIRECTORY_MAX_PAGES,
  CardDirectory,
  cardDirectoryDescription,
  cardDirectoryPath,
  cardDirectoryTitle,
} from "@/components/cards/CardDirectory";
import { pageMetadata } from "@/lib/seo";

type CardsPageProps = {
  params: Promise<{ page: string }>;
};

export const maxDuration = 30;

function parsePage(rawPage: string) {
  if (!/^[1-9]\d*$/.test(rawPage)) notFound();

  const page = Number(rawPage);
  if (!Number.isSafeInteger(page) || page > CARD_DIRECTORY_MAX_PAGES) notFound();
  return page;
}

export async function generateMetadata({ params }: CardsPageProps): Promise<Metadata> {
  const { page: rawPage } = await params;
  const page = parsePage(rawPage);
  const canonicalPage = page === 1 ? 1 : page;

  return pageMetadata({
    title: cardDirectoryTitle(canonicalPage),
    description: cardDirectoryDescription(canonicalPage),
    path: cardDirectoryPath(canonicalPage),
  });
}

export default async function PaginatedCardsPage({ params }: CardsPageProps) {
  const { page: rawPage } = await params;
  const page = parsePage(rawPage);

  if (page === 1) permanentRedirect("/cards");

  return <CardDirectory page={page} />;
}
