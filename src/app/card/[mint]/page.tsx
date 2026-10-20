import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCard, getCardMarket, getCardOffers } from "@/lib/cc";
import { dealScore, fmtNum, fmtPct, fmtUsd, gradeShort, shortCardName, timeAgo, venueName } from "@/lib/format";
import { cardImage, ccAssetUrl, solscanAddr } from "@/lib/constants";
import { CardFlip } from "@/components/card/CardFlip";
import { CardActivity } from "@/components/card/CardActivity";
import { WalletName } from "@/components/ActivityRow";
import { GradePill, HPBar, Kicker, StatBar, TypeChip } from "@/components/ui";

export const revalidate = 10;

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function generateMetadata({ params }: { params: Promise<{ mint: string }> }): Promise<Metadata> {
  const { mint } = await params;
  const card = ADDRESS.test(mint) ? await getCard(mint) : null;
  if (!card) return { title: "Card not found" };
  const title = `${shortCardName(card.itemName)} ${gradeShort(card.gradingCompany, card.grade)}`.trim();
  const description = `${card.itemName}. Insured at ${fmtUsd(Number(card.insuredValue))}. Live price, population report, bids and on-chain history on Cardex.`;
  return {
    title,
    description,
    alternates: { canonical: `/card/${mint}` },
    openGraph: { title, description, images: [{ url: cardImage(mint, "front", 1024), alt: card.itemName }] },
    twitter: { card: "summary_large_image", title, description, images: [cardImage(mint, "front", 1024)] },
  };
}

function rarity(pop: number) {
  if (pop <= 10) return { label: "LEGENDARY", cls: "bg-[#6f35fc] text-white" };
  if (pop <= 50) return { label: "RARE", cls: "bg-poke-deep text-white" };
  if (pop <= 250) return { label: "UNCOMMON", cls: "bg-azure text-white" };
  return { label: "COMMON", cls: "bg-cream-lo text-ink-soft" };
}

function certUrl(company: string | null, cert: string | null) {
  if (!cert) return null;
  if (company === "PSA") return `https://www.psacard.com/cert/${cert}`;
  if (company === "CGC") return `https://www.cgccards.com/certlookup/${cert}/`;
  return null;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="leader-row">
      <span className="font-bold text-ink-mute">{label}</span>
      <span className="leader" />
      <span className="font-extrabold text-right min-w-0 truncate">{children}</span>
    </div>
  );
}

export default async function CardPage({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  if (!ADDRESS.test(mint)) notFound();
  const [card, market, offers] = await Promise.all([getCard(mint), getCardMarket(mint), getCardOffers(mint)]);
  if (!card) notFound();

  const listing = market?.listing ?? null;
  const owner = market?.owner ?? null;
  const pop = card.population;
  const insured = Number(card.insuredValue) || 0;
  const score = listing?.currency === "USDC" ? dealScore(listing.price, card.insuredValue) : null;
  const spread = listing?.currency === "USDC" && insured > 0 ? listing.price / insured - 1 : null;
  const grade = gradeShort(card.gradingCompany, card.grade);
  const cert = certUrl(card.gradingCompany, card.gradingID);
  const bestBid = offers[0] ? Number(offers[0].price) : null;
  const tier = pop ? rarity(pop.gradePopulation) : null;

  return (
    <article className="pt-8 flex flex-col gap-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/scanner" className="hover:text-poke-deep">
          Scanner
        </Link>
        <span>›</span>
        {card.category && (
          <>
            <Link href={`/scanner?search=${encodeURIComponent(card.category)}`} className="hover:text-poke-deep">
              {card.category}
            </Link>
            <span>›</span>
          </>
        )}
        <span className="text-ink truncate">{shortCardName(card.itemName)}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[minmax(300px,420px)_1fr] items-start">
        <div className="lg:sticky lg:top-24 flex flex-col gap-6">
          <CardFlip mint={card.nftAddress} name={card.itemName} />
          <div className="flex flex-wrap justify-center gap-3">
            <a href={ccAssetUrl(card.nftAddress)} target="_blank" rel="noreferrer" className="btn btn-red">
              View on Collector Crypt ↗
            </a>
            <a href={solscanAddr(card.nftAddress)} target="_blank" rel="noreferrer" className="btn btn-cream">
              Solscan ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-10 min-w-0">
          {/* title */}
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <TypeChip category={card.category} href={`/scanner?search=${encodeURIComponent(card.category ?? "")}`} />
              <GradePill label={grade} className="!text-[10px] !py-1.5" />
              {card.authenticated && (
                <span className="inline-flex items-center gap-1 rounded-full bg-up/12 text-up border border-up/30 px-2.5 py-1 text-xs font-extrabold">
                  ✓ Authenticated
                </span>
              )}
              {tier && <span className={`rounded-md px-2 py-1 font-pixel text-[8px] ${tier.cls}`}>{tier.label}</span>}
            </div>
            <h1 className="h-display text-[clamp(2.3rem,5vw,3.8rem)]">{shortCardName(card.itemName)}</h1>
            <p className="text-ink-soft text-lg -mt-1">{card.itemName}</p>
          </header>

          {/* price */}
          <section className="paper p-6 sm:p-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Kicker>{listing ? "Listed price" : "Not listed"}</Kicker>
                <p className="mt-3 font-display font-bold text-5xl leading-none tabular-nums">
                  {listing ? (listing.currency === "USDC" ? fmtUsd(listing.price) : `${listing.price} SOL`) : "·"}
                </p>
                {listing && (
                  <p className="mt-2 text-sm text-ink-mute">
                    on {venueName(listing.marketplace)} · updated{" "}
                    {timeAgo(listing.updatedAt)} ago
                  </p>
                )}
              </div>
              <div className="flex gap-8">
                <div>
                  <span className="font-pixel text-[9px] text-ink-mute">INSURED</span>
                  <p className="mt-2 font-display font-bold text-2xl">{insured ? fmtUsd(insured) : "·"}</p>
                </div>
                <div>
                  <span className="font-pixel text-[9px] text-ink-mute">BEST BID</span>
                  <p className="mt-2 font-display font-bold text-2xl text-warn">{bestBid ? fmtUsd(bestBid) : "·"}</p>
                </div>
              </div>
            </div>
            {score != null && score > 0 && <HPBar value={score} className="max-w-md" />}
            {spread != null && (
              <p className={`font-bold ${spread < 0 ? "text-up" : "text-down"}`}>
                {spread < 0
                  ? `${Math.round(-spread * 100)}% under insured value`
                  : `${Math.round(spread * 100)}% over insured value`}
              </p>
            )}
          </section>

          {/* pokédex data */}
          <section className="flex flex-col gap-4">
            <Kicker>Pokédex data</Kicker>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
              {card.set && <Row label="Set">{card.set}</Row>}
              {card.year ? <Row label="Year">{card.year}</Row> : null}
              {card.serial && <Row label="Number">#{card.serial}</Row>}
              {card.parallel && <Row label="Parallel">{card.parallel}</Row>}
              {card.gradingCompany && <Row label="Grader">{card.gradingCompany}</Row>}
              {card.grade && <Row label="Grade">{card.grade}</Row>}
              {card.gradingID && (
                <Row label="Cert #">
                  {cert ? (
                    <a href={cert} target="_blank" rel="noreferrer" className="text-azure-deep hover:text-poke-deep">
                      {card.gradingID} ↗
                    </a>
                  ) : (
                    card.gradingID
                  )}
                </Row>
              )}
              {card.vault && <Row label="Vault">{card.vault}</Row>}
              <Row label="Token">{card.nftStandard?.toUpperCase() ?? "·"}</Row>
            </div>
          </section>

          {/* base stats */}
          {pop && (
            <section className="flex flex-col gap-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Kicker>Base stats · {pop.gradingCompany} pop report</Kicker>
                {pop.setUrl && (
                  <a href={pop.setUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-azure-deep hover:text-poke-deep">
                    Full pop report ↗
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-3 max-w-2xl">
                <StatBar label={`Pop ${grade.split(" ").pop()}`} value={pop.gradePopulation} max={pop.totalPopulation} display={fmtNum(pop.gradePopulation)} color="var(--color-up-fill)" />
                <StatBar label="Higher" value={pop.populationHigher} max={pop.totalPopulation} display={fmtNum(pop.populationHigher)} color="var(--color-poke)" />
                <StatBar label="Total" value={pop.totalPopulation} max={pop.totalPopulation} display={fmtNum(pop.totalPopulation)} color="var(--color-azure)" />
                <StatBar label="Gem rate" value={pop.gemRate * 100} max={100} display={fmtPct(pop.gemRate)} color="var(--color-pika-deep)" />
              </div>
              <p className="text-sm text-ink-mute max-w-2xl">
                {pop.gradePopulation} graded at this grade out of {fmtNum(pop.totalPopulation)} total
                {pop.populationHigher === 0 ? ", and none higher." : `, ${pop.populationHigher} higher.`}
                {pop.lastGem && ` Last gem graded ${pop.lastGem}.`}
              </p>
            </section>
          )}

          {/* bids + owner */}
          <section className="grid md:grid-cols-[1.4fr_1fr] gap-10">
            <div className="flex flex-col gap-3">
              <Kicker>Live bids ({offers.length})</Kicker>
              {offers.length === 0 ? (
                <p className="text-ink-mute">No live bids. Be the first trainer to make an offer.</p>
              ) : (
                <ol className="dash-divide">
                  {offers.slice(0, 8).map((o, i) => (
                    <li key={o.id} className="flex items-center gap-3 py-2.5">
                      <span className="font-pixel text-[9px] text-ink-mute w-5">{i + 1}</span>
                      <span className="font-display font-bold text-xl tabular-nums text-warn">{fmtUsd(Number(o.price))}</span>
                      {insured > 0 && (
                        <span className="text-xs text-ink-mute">{Math.round((Number(o.price) / insured) * 100)}% of ins</span>
                      )}
                      <span className="ml-auto flex items-center gap-2 text-xs text-ink-mute">
                        {ADDRESS.test(o.buyerId) && <WalletName address={o.buyerId} />}
                        {timeAgo(o.createdAt)} ago
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <Kicker>Trainer</Kicker>
              {owner ? (
                <div className="flex flex-col gap-2">
                  <span className="text-lg">
                    <WalletName address={owner.wallet} />
                  </span>
                  {owner.name && <span className="text-sm text-ink-mute">Collector Crypt name: {owner.name}</span>}
                  <Link href={`/wallet/${owner.wallet}`} className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
                    Open trainer card →
                  </Link>
                </div>
              ) : (
                <p className="text-ink-mute">Owner unknown.</p>
              )}
            </div>
          </section>

          {/* history */}
          <section className="flex flex-col gap-3">
            <Kicker>On-chain history</Kicker>
            <CardActivity mint={card.nftAddress} />
          </section>
        </div>
      </div>
    </article>
  );
}
