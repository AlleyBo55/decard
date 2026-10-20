import { notFound } from "next/navigation";
import Link from "next/link";
import { getCard, getCardMarket, getCardOffers } from "@/lib/cc";
import { fmtUsd, fmtNum, fmtPct, shortAddr, timeAgo } from "@/lib/format";
import { ccAssetUrl, solscanAddr } from "@/lib/constants";
import { Panel, PixelLabel, Badge, Stat } from "@/components/ui";
import { CardFlip } from "@/components/card/CardFlip";
import { CardActivity } from "@/components/card/CardActivity";

export const revalidate = 10;

export default async function CardPage({ params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  const [card, market, offers] = await Promise.all([
    getCard(mint),
    getCardMarket(mint),
    getCardOffers(mint),
  ]);

  if (!card) notFound();

  const listing = market?.listing ?? null;
  const owner = market?.owner ?? null;
  const pop = card.population;

  return (
    <section className="py-6 grid gap-6 lg:grid-cols-[minmax(300px,400px)_1fr]">
      <div className="flex flex-col gap-4">
        <CardFlip mint={card.nftAddress} name={card.itemName} />
        <CardActivity mint={card.nftAddress} />
      </div>

      <div className="flex flex-col gap-5">
        <header className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {card.gradingCompany && (
              <Badge tone="warn">
                {card.gradingCompany} {card.grade}
              </Badge>
            )}
            {card.category && <Badge>{card.category}</Badge>}
            {card.year ? <Badge>{card.year}</Badge> : null}
            {card.authenticated && <Badge tone="up">authenticated</Badge>}
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold leading-tight">{card.itemName}</h1>
          {card.set && <p className="text-sm text-muted">{card.set}</p>}
        </header>

        <Panel screen className="p-4 flex flex-wrap gap-8">
          <Stat
            label="List Price"
            value={
              listing
                ? listing.currency === "USDC"
                  ? fmtUsd(listing.price)
                  : `${listing.price} SOL`
                : "Not listed"
            }
            sub={listing ? `on ${listing.marketplace === "CC" ? "Collector Crypt" : "Magic Eden"}` : undefined}
          />
          <Stat label="Insured" value={fmtUsd(Number(card.insuredValue))} />
          {card.serial && <Stat label="Serial" value={`#${card.serial}`} />}
          <Stat label="Standard" value={card.nftStandard?.toUpperCase() ?? "—"} />
        </Panel>

        {pop && (
          <Panel className="p-4">
            <PixelLabel>Population Report · {pop.gradingCompany}</PixelLabel>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat label={`Pop ${pop.grade}`} value={fmtNum(pop.gradePopulation)} />
              <Stat label="Higher" value={fmtNum(pop.populationHigher)} />
              <Stat label="Total" value={fmtNum(pop.totalPopulation)} />
              <Stat label="Gem Rate" value={fmtPct(pop.gemRate)} />
            </div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
              {pop.lastGem && <span>last gem {pop.lastGem}</span>}
              {pop.setUrl && (
                <a href={pop.setUrl} target="_blank" rel="noreferrer" className="hover:text-dex-yellow underline">
                  PSA pop page ↗
                </a>
              )}
            </div>
          </Panel>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Panel className="p-4">
            <PixelLabel>Owner</PixelLabel>
            {owner ? (
              <Link
                href={`/wallet/${owner.wallet}`}
                className="mt-2 block font-mono text-sm hover:text-dex-yellow"
              >
                {owner.name || shortAddr(owner.wallet, 6)}
              </Link>
            ) : (
              <p className="mt-2 text-muted text-sm">unknown</p>
            )}
            <div className="mt-3 flex gap-3 text-xs">
              {owner && (
                <a href={solscanAddr(owner.wallet)} target="_blank" rel="noreferrer" className="text-muted hover:text-dex-yellow">
                  Solscan ↗
                </a>
              )}
            </div>
          </Panel>

          <Panel className="p-4">
            <PixelLabel>Offers ({offers.length})</PixelLabel>
            {offers.length === 0 ? (
              <p className="mt-2 text-muted text-sm">No live offers.</p>
            ) : (
              <ul className="mt-2 flex flex-col gap-1.5 max-h-40 overflow-y-auto thin-scroll">
                {offers.slice(0, 20).map((o) => (
                  <li key={o.id} className="flex items-center justify-between text-sm">
                    <span className="font-semibold tabular-nums">{fmtUsd(o.price)}</span>
                    <span className="text-xs text-muted">
                      {o.status} · {timeAgo(o.createdAt)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={ccAssetUrl(card.nftAddress)}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-dex-red px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            View on Collector Crypt ↗
          </a>
          {card.externalURL && (
            <a
              href={card.externalURL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-4 py-2 text-sm text-muted hover:text-ink"
            >
              Solscan ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
