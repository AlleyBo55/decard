import { Suspense } from "react";
import { CardTile } from "@/components/CardTile";
import { Rail } from "@/components/motion";
import { CardRailSkeleton, Kicker, MoreLink } from "@/components/ui";
import { getMarketplace } from "@/lib/cc";
import { isGradedCard } from "@/lib/credible";
import { shortCardName } from "@/lib/format";
import { hubForName, matchesHub } from "@/lib/pokemon-hubs";
import type { CardDetail, CardRow, MarketplaceQuery } from "@/lib/types";

// Two marketplace searches per card page, each kept 5 minutes in the Next data cache
// and shared by every card with the same name or set. Both rails are optional: a slow
// or throttled read gives up after 4s without retrying and the rail is left out, so a
// crawl burst never holds card pages open waiting on them.
const READ = { revalidate: 300, timeoutMs: 4_000, retries: 0 };
const MAX = 12;
const GRADERS = /^(psa|cgc|bgs|sgc|tag|ace|hga|beckett)$/i;
// Leading words of seller-style names ("BASE SET HOLO ALAKAZAM") that describe the set or finish, not the card.
const NOT_A_NAME = /^(pokemon|base|set|holo|japanese|english|1st|edition|full|art|promo|shadowless|unlimited)$/i;

async function search(q: MarketplaceQuery): Promise<CardRow[] | null> {
  try {
    return (await getMarketplace({ step: 48, page: 1, listPriceMin: 1, ...q }, READ)).cards;
  } catch {
    return null;
  }
}

interface SameCard {
  search: string;
  label: string;
  more: { href: string; label: string };
  matches: (itemName: string) => boolean;
}

/** What "the same card" means here: its Pokémon's price guide when it has one, else the first words of its name. */
function sameCard(card: CardDetail): SameCard | null {
  const hub = card.category === "Pokemon" ? hubForName(card.itemName) : null;
  if (hub) {
    return {
      search: hub.name,
      label: hub.name,
      more: { href: `/pokemon/${hub.slug}`, label: `${hub.name} card prices by grade` },
      matches: (name) => matchesHub(hub, name),
    };
  }
  const words = shortCardName(card.itemName)
    .split(/[\s/]+/)
    .filter((w) => /[a-z]/i.test(w) && !GRADERS.test(w));
  // Long names are set-first strings (CGC style) whose first words would match a whole set.
  if (!words.length || words.length > 4 || NOT_A_NAME.test(words[0])) return null;
  const pick = words.slice(0, 2);
  const first = pick[0].toLowerCase();
  return {
    search: pick.join(" "),
    label: pick.join(" "),
    more: { href: `/scanner?search=${encodeURIComponent(pick[0])}`, label: `Every ${pick[0]} listing in the scanner` },
    matches: (name) => shortCardName(name).toLowerCase().includes(first),
  };
}

/** USDC listings by price, then SOL ones: the raw price sort mixes both currencies. */
function byAskingPrice(a: CardRow, b: CardRow) {
  const sol = (c: CardRow) => (c.listing?.currency === "USDC" ? 0 : 1);
  return sol(a) - sol(b) || (a.listing?.price ?? 0) - (b.listing?.price ?? 0);
}

function RailSection({
  kicker,
  title,
  sub,
  label,
  cards,
  more,
}: {
  kicker: string;
  title: string;
  sub: string;
  label: string;
  cards: CardRow[];
  more: { href: string; label: string };
}) {
  return (
    <section className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Kicker>{kicker}</Kicker>
        <h2 className="h-display text-[clamp(1.5rem,3vw,2.2rem)]">{title}</h2>
        <p className="text-ink-soft">{sub}</p>
      </div>
      <Rail label={label}>
        {cards.map((c) => (
          <CardTile key={c.nftAddress} c={c} solUsd={null} />
        ))}
      </Rail>
      <MoreLink href={more.href}>{more.label}</MoreLink>
    </section>
  );
}

async function SameCardRail({ card }: { card: CardDetail }) {
  const same = sameCard(card);
  if (!same) return null;
  const rows = await search({ search: same.search, orderBy: "listedPriceAsc" });
  const cards = (rows ?? [])
    .filter((c) => c.nftAddress !== card.nftAddress && c.category === card.category && isGradedCard(c) && same.matches(c.itemName))
    .sort(byAskingPrice)
    .slice(0, MAX);
  if (!cards.length) return null;
  return (
    <RailSection
      kicker="Compare grades"
      title={`Other ${same.label} slabs listed now`}
      sub="Current asking prices, lowest first."
      label={`Other ${same.label} listings`}
      cards={cards}
      more={same.more}
    />
  );
}

async function SameSetRail({ card }: { card: CardDetail }) {
  const set = card.set?.trim();
  if (!set) return null;
  // Number-only words are dropped: a bare number after a word makes the upstream search return nothing.
  const words = set.split(/\s+/).filter((w) => /[a-z]/i.test(w));
  if (!words.length) return null;
  const rows = await search({ search: words.join(" "), orderBy: "listedDateDesc" });
  // The search is a loose substring match, so keep exact set matches only.
  const cards = (rows ?? [])
    .filter((c) => c.nftAddress !== card.nftAddress && isGradedCard(c) && c.set?.trim().toLowerCase() === set.toLowerCase())
    .slice(0, MAX);
  if (cards.length < 3) return null;
  return (
    <RailSection
      kicker="Same set"
      title={`More from ${set}`}
      sub="Newest listings first."
      label={`More listings from ${set}`}
      cards={cards}
      more={{ href: `/scanner?search=${encodeURIComponent(words.join(" "))}`, label: `Every ${set} listing in the scanner` }}
    />
  );
}

/** "Other copies of this card" and "more from this set" rails for a card page, each streamed on its own. */
export function RelatedCards({ card }: { card: CardDetail }) {
  return (
    <div className="flex flex-col gap-12">
      <Suspense fallback={<CardRailSkeleton />}>
        <SameCardRail card={card} />
      </Suspense>
      <Suspense fallback={<CardRailSkeleton />}>
        <SameSetRail card={card} />
      </Suspense>
    </div>
  );
}
