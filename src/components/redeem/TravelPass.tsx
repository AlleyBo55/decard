"use client";
import { useEffect, useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import type { PassStatus } from "@/hooks/pages/Redeem/useShippingPass";
import { plural } from "@/lib/i18n/format";
import type { Country } from "@/lib/redeem/countries";
import { cents, indicative, regionOf } from "@/lib/redeem/rates";
import type { Estimate } from "@/lib/redeem/types";
import { SlabMarker } from "./art";
import { slots, useCountryName } from "./text";

// The trip so far, as a paper shipping pass: from the vault to the trainer's town, the cargo,
// what it's declared at and what it costs. Indicative until the real estimate lands.

/** "13:42" left on the shipping pass, ticking once a second. */
export function PassTimer({ until }: { until: number }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const t = setInterval(tick, 1000);
    const first = setTimeout(tick, 0);
    return () => {
      clearInterval(t);
      clearTimeout(first);
    };
  }, []);
  if (now === null) return <span className="tabular-nums">--:--</span>;
  const s = Math.max(0, Math.round((until - now) / 1000));
  return (
    <span className="tabular-nums">
      {Math.floor(s / 60)}:{String(s % 60).padStart(2, "0")}
    </span>
  );
}

/** A decorative barcode drawn from the pass holder: bar x and width, bars only. */
function bars(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const out: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < 34; i++) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const w = 1 + ((h >>> 0) % 3);
    if (i % 2 === 0) out.push({ x, w });
    x += w + 0.6;
  }
  return { bars: out, width: x };
}

export interface PassProps {
  holder: string | null;
  status: PassStatus;
  expiresAt: number | null;
  cards: number;
  declaredCents: number;
  country: Country | null;
  city: string | null;
  estimate: Estimate | null;
  shipmentId: string | null;
  /** A shipment already on its way (the journey): what it carries and what was paid. */
  ticket?: { cards: number | null; declaredCents: number | null; shippingCents: number | null; totalCents: number | null } | null;
}

export function TravelPass({ holder, status, expiresAt, cards, declaredCents, country, city, estimate, shipmentId, ticket = null }: PassProps) {
  const t = useT();
  const { locale } = useLocale();
  const name = useCountryName();
  const s = t.redeem.pass;
  const guess = country && cards > 0 ? indicative(country, cards, declaredCents) : null;
  const code = bars(shipmentId ?? holder ?? "decard");
  if (ticket) {
    return (
      <section className="rd-pass" aria-label={s.ticket}>
        <header className="rd-pass-top">
          <span className="rd-pass-title">{s.ticket}</span>
          <span className="rd-pass-state" data-state={status}>
            {status === "active" && expiresAt ? <>● {slots(s.passValid, { timer: <PassTimer until={expiresAt} /> })}</> : s.passExpired}
          </span>
        </header>
        <div className="rd-pass-route">
          <div>
            <span className="rd-pass-k">{s.from}</span>
            <b>{s.vault}</b>
            <span className="rd-pass-sub">{s.vaultSub}</span>
          </div>
          <div className="rd-pass-line" aria-hidden>
            <span />
            <SlabMarker size={18} />
            <span />
          </div>
          <div className="text-right">
            <span className="rd-pass-k">{s.to}</span>
            <b>{city || (country ? name(country) : s.yourDoor)}</b>
            <span className="rd-pass-sub">{city && country ? name(country) : country ? t.redeem.regions[regionOf(country)] : s.savedHere}</span>
          </div>
        </div>
        <dl className="rd-pass-grid">
          <div>
            <dt>{s.cargo}</dt>
            <dd>{ticket.cards === null ? "—" : plural(locale, ticket.cards, t.redeem.slabs)}</dd>
          </div>
          <div>
            <dt>{s.declared}</dt>
            <dd className="rd-money">{cents(ticket.declaredCents)}</dd>
          </div>
          <div>
            <dt>{s.region}</dt>
            <dd>{country ? t.redeem.regions[regionOf(country)] : "—"}</dd>
          </div>
          <div>
            <dt>{s.shipping}</dt>
            <dd className="rd-money">{cents(ticket.shippingCents)}</dd>
          </div>
        </dl>
        <div className="rd-pass-tear" aria-hidden />
        <div className="rd-pass-total">
          <div>
            <span className="rd-pass-k">{s.paid}</span>
            <span className="rd-pass-sub">{s.paidSub}</span>
          </div>
          <b className="rd-money">{cents(ticket.totalCents)}</b>
        </div>
        <div className="rd-pass-code" aria-hidden>
          <svg viewBox={`0 0 ${code.width} 22`} preserveAspectRatio="none">
            {code.bars.map((b, i) => (
              <rect key={i} x={b.x} y="0" width={b.w} height="22" fill="#0b1430" />
            ))}
          </svg>
          <span>{shipmentId ?? "DECARD"}</span>
        </div>
      </section>
    );
  }
  return (
    <section className="rd-pass" aria-label={s.label}>
      <header className="rd-pass-top">
        <span className="rd-pass-title">{s.label}</span>
        <span className="rd-pass-state" data-state={status}>
          {status === "active" && expiresAt ? (
            <>● {slots(s.valid, { timer: <PassTimer until={expiresAt} /> })}</>
          ) : status === "signing" ? (
            s.signing
          ) : status === "expired" ? (
            s.expired
          ) : (
            s.notIssued
          )}
        </span>
      </header>
      <div className="rd-pass-route">
        <div>
          <span className="rd-pass-k">{s.from}</span>
          <b>{s.vault}</b>
          <span className="rd-pass-sub">{s.vaultSub}</span>
        </div>
        <div className="rd-pass-line" aria-hidden>
          <span />
          <SlabMarker size={18} />
          <span />
        </div>
        <div className="text-right">
          <span className="rd-pass-k">{s.to}</span>
          <b>{city || (country ? name(country) : s.yourTown)}</b>
          <span className="rd-pass-sub">{city && country ? name(country) : country ? t.redeem.regions[regionOf(country)] : s.pickOnGlobe}</span>
        </div>
      </div>
      <dl className="rd-pass-grid">
        <div>
          <dt>{s.cargo}</dt>
          <dd>{plural(locale, cards, t.redeem.slabs)}</dd>
        </div>
        <div>
          <dt>{s.declared}</dt>
          <dd className="rd-money">{cents(estimate?.declaredValueCents ?? declaredCents)}</dd>
        </div>
        <div>
          <dt>{s.region}</dt>
          <dd>{estimate?.region ?? (country ? t.redeem.regions[regionOf(country)] : "—")}</dd>
        </div>
        <div>
          <dt>{estimate ? s.shipping : s.estShipping}</dt>
          <dd className="rd-money">{estimate ? cents(estimate.shippingCents) : guess ? cents(guess.shippingCents + guess.signatureCents) : "—"}</dd>
        </div>
      </dl>
      <div className="rd-pass-tear" aria-hidden />
      <div className="rd-pass-total">
        <div>
          <span className="rd-pass-k">{estimate ? s.charged : s.estimated}</span>
          <span className="rd-pass-sub">{estimate ? s.chargedSub : s.estimatedSub}</span>
        </div>
        <b className="rd-money">{estimate ? cents(estimate.totalCents) : guess ? `≈ ${cents(guess.totalCents)}` : "—"}</b>
      </div>
      <div className="rd-pass-code" aria-hidden>
        <svg viewBox={`0 0 ${code.width} 22`} preserveAspectRatio="none">
          {code.bars.map((b, i) => (
            <rect key={i} x={b.x} y="0" width={b.w} height="22" fill="#0b1430" />
          ))}
        </svg>
        <span>{shipmentId ?? (holder ? `${holder.slice(0, 4)}…${holder.slice(-4)}` : "DECARD")}</span>
      </div>
    </section>
  );
}
