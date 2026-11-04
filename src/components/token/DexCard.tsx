// The hero's holographic trading card for CARDS. Server-rendered inside
// HoloCard (pointer tilt); only the price line is a client island.
import { HoloCard } from "@/components/motion";
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

export function DexCard({
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
  const hp = quote && ath ? Math.max(1, Math.min(100, Math.round((quote.price / ath) * 100))) : null;
  const athDay = athDate && Number.isFinite(Date.parse(athDate)) ? fmtDay(Date.parse(athDate)) : null;
  const hpTitle =
    hp != null && ath
      ? `HP ${hp}/100: the price is ${hp}% of the all-time high of ${fmtPrice(ath)}${athDay ? ` (${athDay})` : ""}`
      : "HP needs the price and the all-time high, which are unavailable right now";

  return (
    <HoloCard className="tk-card-holo">
      <article className="tk-card" aria-label="CARDS as a trading card">
        <header className="tk-card-head">
          <p className="tk-card-stage">BASIC · SOLANA SPL TOKEN</p>
          <div className="tk-card-title">
            <p className="tk-card-name">CARDS</p>
            <p className="tk-card-hpnum" title={hpTitle}>
              <span className="tk-card-hpword">HP</span>
              {hp ?? NONE}
            </p>
          </div>
          <div className="hp tk-card-hp" title={hpTitle} aria-hidden>
            <span className="hp-label">HP</span>
            <span className="hp-track">
              <span className="hp-fill" style={{ width: `${hp ?? 0}%`, ["--hp-color" as string]: hpColor(hp ?? 0) }} />
            </span>
          </div>
        </header>

        <div className="tk-art">
          <FireChip label="Fire · Burn" className="tk-art-chip" />
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
          Burning Coin Token · Ht: 6 decimals · Wt: 2B max supply
          {hp != null && ath ? ` · ATH ${fmtPrice(ath)}` : ""}
        </p>

        <PriceTicker initial={quote} />

        <ul className="tk-moves">
          <li className="tk-move">
            <span className="tk-move-cost">
              <FireEnergy />
              <FireEnergy />
            </span>
            <span className="tk-move-body">
              <span className="tk-move-name">Buyback</span>
              <span className="tk-move-text">Pack revenue buys CARDS, last 30 days</span>
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
              <span className="tk-move-name">Burn</span>
              <span className="tk-move-text">CARDS gone for good{burnedShare != null ? `, ${fmtShare(burnedShare)} of max` : ""}</span>
            </span>
            <span className="tk-move-dmg">{fmtShort(burned)}</span>
          </li>
        </ul>

        <dl className="tk-card-foot">
          <div>
            <dt>weakness</dt>
            <dd>
              Unlock {unlockLabel}
              {unlockShare != null ? ` +${fmtShare(unlockShare)}` : ""}
            </dd>
          </div>
          <div>
            <dt>resistance</dt>
            <dd>Buyback &amp; burn</dd>
          </div>
        </dl>
        <p className="tk-card-credit">Fan-made card by Decard · not affiliated with Collector Crypt</p>
      </article>
    </HoloCard>
  );
}
