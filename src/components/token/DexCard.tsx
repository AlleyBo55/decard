// The hero's holographic trading card for CARDS. Server-rendered inside
// HoloCard (pointer tilt); only the price line is a client island.
import { HoloCard } from "@/components/motion";
import { fmt } from "@/lib/i18n/format";
import { getLocale, getStrings } from "@/lib/i18n/strings";
import { BurningCoin, FireChip, FireEnergy, Spark } from "./art";
import { fmtDay, fmtPrice, fmtShare, fmtShort, fmtUsdShort, NONE } from "./format";
import { PriceTicker, type Quote } from "./PriceTicker";
import "./token.css";

const hpColor = (v: number) => (v >= 50 ? "var(--color-up-fill)" : v >= 20 ? "var(--color-warn-fill)" : "var(--color-poke)");

const SPARKS = [
  { left: "14%", top: "22%", delay: "0s", size: 14 },
  { left: "80%", top: "16%", delay: "0.7s", size: 10 },
  { left: "72%", top: "70%", delay: "1.3s", size: 12 },
  { left: "20%", top: "68%", delay: "1.9s", size: 9 },
];

export async function DexCard({
  quote,
  ath,
  athDate,
  buyback30d,
  burned,
  burnedShare,
  unlockShare,
  unlockLabel,
}: {
  quote: Quote | null;
  ath: number | null;
  athDate: string | null;
  buyback30d: number | null;
  burned: number | null;
  burnedShare: number | null;
  unlockShare: number | null;
  unlockLabel: string;
}) {
  const [t, locale] = await Promise.all([getStrings(), getLocale()]);
  const c = t.tokenPage.card;
  const hp = quote && ath ? Math.max(1, Math.min(100, Math.round((quote.price / ath) * 100))) : null;
  const athDay = athDate && Number.isFinite(Date.parse(athDate)) ? fmtDay(Date.parse(athDate), locale) : null;
  const hpTitle =
    hp != null && ath ? fmt(athDay ? c.hpTitle : c.hpTitleNoDay, { hp, ath: fmtPrice(ath), day: athDay }) : c.hpUnavailable;

  return (
    <HoloCard className="tk-card-holo">
      <article className="tk-card" aria-label={c.label}>
        <header className="tk-card-head">
          <p className="tk-card-stage">{c.stage}</p>
          <div className="tk-card-title">
            <p className="tk-card-name">CARDS</p>
            <p className="tk-card-hpnum" title={hpTitle}>
              <span className="tk-card-hpword">{c.hp}</span>
              {hp ?? NONE}
            </p>
          </div>
          <div className="hp tk-card-hp" title={hpTitle} aria-hidden>
            <span className="hp-label">{c.hp}</span>
            <span className="hp-track">
              <span className="hp-fill" style={{ width: `${hp ?? 0}%`, ["--hp-color" as string]: hpColor(hp ?? 0) }} />
            </span>
          </div>
        </header>

        <div className="tk-art">
          <FireChip label={c.type} className="tk-art-chip" />
          {SPARKS.map((s) => (
            <Spark
              key={s.left}
              style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
            />
          ))}
          <span className="tk-art-shadow" aria-hidden />
          <BurningCoin />
        </div>

        <p className="tk-card-dex">
          {c.dex}
          {hp != null && ath ? ` · ${fmt(c.dexAth, { price: fmtPrice(ath) })}` : ""}
        </p>

        <PriceTicker initial={quote} />

        <ul className="tk-moves">
          <li className="tk-move">
            <span className="tk-move-cost">
              <FireEnergy />
              <FireEnergy />
            </span>
            <span className="tk-move-body">
              <span className="tk-move-name">{c.buyback}</span>
              <span className="tk-move-text">{c.buybackText}</span>
            </span>
            <span className="tk-move-dmg">{fmtUsdShort(buyback30d)}</span>
          </li>
          <li className="tk-move">
            <span className="tk-move-cost">
              <FireEnergy />
              <FireEnergy />
              <FireEnergy />
            </span>
            <span className="tk-move-body">
              <span className="tk-move-name">{c.burn}</span>
              <span className="tk-move-text">{burnedShare != null ? fmt(c.burnTextShare, { share: fmtShare(burnedShare) }) : c.burnText}</span>
            </span>
            <span className="tk-move-dmg">{fmtShort(burned)}</span>
          </li>
        </ul>

        <dl className="tk-card-foot">
          <div>
            <dt>{c.weakness}</dt>
            <dd>{fmt(unlockShare != null ? c.unlockShare : c.unlock, { day: unlockLabel, share: fmtShare(unlockShare) })}</dd>
          </div>
          <div>
            <dt>{c.resistance}</dt>
            <dd>{c.resistanceValue}</dd>
          </div>
        </dl>
        <p className="tk-card-credit">{c.credit}</p>
      </article>
    </HoloCard>
  );
}
