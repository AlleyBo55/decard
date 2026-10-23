import { REPO_URL, SITE_URL } from "@/lib/constants";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { categoryName, categoryPath } from "@/lib/seo";

// llms.txt (https://llmstxt.org): a plain-text summary for AI assistants and
// answer engines. Most of them read raw HTML and skip data rendered in the browser.
export const dynamic = "force-static";

const categories = PRIMARY_CATEGORIES.map(
  (c) => `- [${categoryName(c)}](${SITE_URL}${categoryPath(c)}): live ${categoryName(c)} graded card listings ranked by deal score.`,
).join("\n");

const body = `# Decard

> Decard is a free, open-source scanner and tracker for Collector Crypt, the Solana marketplace where real graded trading cards (PSA, CGC and BGS slabs) are vaulted and traded as tokens. It ranks live Collector Crypt and Magic Eden listings by deal score, decodes every on-chain sale, listing and bid, and shows population reports and wallet holdings. No login, wallet connection or API key.

- Deal score: (1 - USDC listing price / insured value) x 100, clamped to 0-100. Higher means further under insured value. Only USDC listings with an insured value get one.
- Data: Collector Crypt's public marketplace API (listings, insured values, bids, population reports) and the Collector Crypt marketplace program on Solana (sales, listings, bids). There is no database; numbers are read live.
- Independent and fan-made: not affiliated with Collector Crypt, Magic Eden, Nintendo or The Pokémon Company. Not financial advice.

## Pages

- [Home](${SITE_URL}/): newest, most expensive and best-deal listings, recent sales and hot bids.
- [Listing scanner](${SITE_URL}/scanner): every live listing, sorted by best deal, newest or price, filtered by category, venue and price.
- [Graded card directory](${SITE_URL}/cards): crawlable, paginated index of currently listed cards with exact names, grades, sets, years, card numbers and canonical card links.
- [Pokémon card value checker](${SITE_URL}/pokemon-card-value-checker): search current graded Pokémon asking prices, insured references and PSA, CGC or BGS grades; explains how to compare identity, bids, sales and population without treating a listing as an appraisal.
- [Live trade tape](${SITE_URL}/tape): decoded marketplace sales, listings and bids as they land.
- [Tokenized trading cards on Solana](${SITE_URL}/tokenized-trading-cards): sourced guide to vault custody, Collector Crypt, on-chain ownership, USDC trading, insured value, deal scores, population reports, redemption and risks.
- [Trainer's guide](${SITE_URL}/guide): plain-language glossary of grading, PSA vs CGC vs BGS, pop reports, gem rate, insured value, bids and vaults.
- Card pages (${SITE_URL}/card/{mint}): listing price, insured value, best bid, population report and on-chain history for one card. Every listed card is in the [sitemap](${SITE_URL}/sitemap.xml).
- Wallet pages (${SITE_URL}/wallet/{address}): any Solana wallet's graded cards, insured total and marketplace activity.

## Categories

${categories}

## Optional

- [Source code on GitHub](${REPO_URL}): MIT-licensed Next.js app.
`;

export function GET() {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
