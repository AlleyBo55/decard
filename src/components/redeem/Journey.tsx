"use client";
import { useLocale, useT } from "@/components/LocaleProvider";
import type { useShipment } from "@/hooks/pages/Redeem/useJourney";
import { localeMeta, type Locale } from "@/lib/i18n";
import { fmt, plural } from "@/lib/i18n/format";
import type { Country } from "@/lib/redeem/countries";
import { cents } from "@/lib/redeem/rates";
import type { RedeemStatus, Shipment } from "@/lib/redeem/types";
import { clsx } from "@/lib/clsx";
import { HouseArt, SlabMarker, VaultArt } from "./art";
import { flagOf } from "./CountryPicker";
import { LazyGlobe } from "./maps";
import { noteText, useCountryName } from "./text";

// Stop 7: where the slabs are. Reads need a live shipping pass but never prompt the wallet on
// their own; a lapsed pass shows a renew button. Shipment ids are kept on this device only.

const KNOWN: readonly RedeemStatus[] = ["pending_burn", "processing", "shipped", "delivered", "failed", "cancelled"];
/** The provider's lifecycle, or null for a label it hasn't documented. */
export const statusOf = (s: Pick<Shipment, "redeemStatus">): RedeemStatus | null => (KNOWN.includes(s.redeemStatus) ? s.redeemStatus : null);

const TRAVEL: Record<RedeemStatus, number> = { pending_burn: 0, processing: 0.14, shipped: 0.58, delivered: 1, failed: 0, cancelled: 0 };

/** The timeline's stops; each one's words are t.redeem.journey.stops[i]. */
const STOPS: { s: RedeemStatus }[] = [{ s: "pending_burn" }, { s: "processing" }, { s: "shipped" }, { s: "delivered" }];

export function StatusChip({ s }: { s: Shipment | "error" | undefined }) {
  const j = useT().redeem.journey;
  if (s === undefined) return <span className="rd-status">{j.checking}</span>;
  if (s === "error") return <span className="rd-status">{j.unreadable}</span>;
  const k = statusOf(s);
  return (
    <span className="rd-status" data-s={k ?? "other"}>
      {k ? j.status[k] : s.status || j.inProgress}
    </span>
  );
}

const day = (iso: string | null, locale: Locale) => {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isFinite(t) ? new Intl.DateTimeFormat(localeMeta(locale).html, { day: "numeric", month: "short", year: "numeric" }).format(t) : null;
};

/** The vault-to-home strip, with the slab where the parcel is. */
const bez = (t: number, a: number, b: number, c: number, d: number) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;
const ROAD = "M62 66C120 30 200 30 258 66";

function RouteStrip({ t, stalled, to }: { t: number; stalled: boolean; to: string }) {
  const words = useT().redeem.journey;
  const x = bez(t, 62, 120, 200, 258);
  const y = bez(t, 66, 30, 30, 66);
  return (
    <svg viewBox="0 0 320 96" className="rd-strip" role="img" aria-label={fmt(words.strip, { place: to, pct: Math.round(t * 100) })}>
      <path d={ROAD} className="rd-strip-road" pathLength={1} />
      <path d={ROAD} className="rd-strip-done" pathLength={1} style={{ strokeDasharray: `${t} 1` }} />
      <VaultArt x={40} y={56} scale={0.42} />
      <HouseArt x={280} y={56} scale={0.42} lit={t >= 1} />
      <g style={{ transform: `translate(${(x - 10).toFixed(1)}px, ${(y - 32).toFixed(1)}px)` }} className={clsx("rd-strip-slab", stalled && "is-stalled")}>
        <SlabMarker size={20} />
      </g>
    </svg>
  );
}

export interface Destination {
  country: Country;
  city: string;
  declaredCents: number;
}

export function Journey({
  tracked,
  passActive,
  passSigning,
  onRenewPass,
  trackId,
  onTrack,
  saved,
  summaries,
  destinations,
  imageOf,
  releaseBusy,
  onFinish,
  onNew,
}: {
  tracked: ReturnType<typeof useShipment>;
  passActive: boolean;
  passSigning: boolean;
  onRenewPass: () => void;
  trackId: string | null;
  onTrack: (id: string) => void;
  saved: string[];
  summaries: Record<string, Shipment | "error">;
  destinations: Record<string, Destination>;
  /** Card art by mint, from the wallet's cards when this page knows them. */
  imageOf: (mint: string) => string;
  releaseBusy: boolean;
  onFinish: (shipmentId: string, knownCents: number | null) => void;
  onNew: () => void;
}) {
  const t = useT();
  const { locale } = useLocale();
  const name = useCountryName();
  const j = t.redeem.journey;
  const { shipment, error, loading, refresh } = tracked;
  const dest = trackId ? destinations[trackId] : undefined;
  const k = shipment ? statusOf(shipment) : null;
  const stalled = k === "failed" || k === "cancelled";
  const travel = k ? TRAVEL[k] : shipment ? 0.3 : 0;
  const reached = k ? STOPS.findIndex((x) => x.s === k) : shipment ? 1 : -1;
  const to = dest ? fmt(t.redeem.place, { city: dest.city, country: name(dest.country) }) : j.yourDoor;
  const others = saved.filter((id) => id !== trackId);

  return (
    <div className="rd-journey">
      {!passActive && (
        <div className="rd-note rd-journey-wide">
          <b>{j.passLead}</b> {j.passText}{" "}
          <button type="button" className="rd-btn rd-btn-gold mt-2" onClick={onRenewPass} disabled={passSigning}>
            {passSigning ? t.redeem.actions.checkWallet : t.redeem.actions.renewFree}
          </button>
        </div>
      )}

      {trackId ? (
        <>
          {dest && (
            <section className="rd-journey-map" aria-label={j.where}>
              <LazyGlobe mode="route" selected={dest.country.num} travel={travel} stalled={stalled} label={fmt(t.redeem.map.globeRoute, { place: to })} />
            </section>
          )}
          <section className={clsx("rd-ship", !dest && "rd-journey-wide")} aria-labelledby="rd-ship-h" aria-busy={loading || undefined}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="rd-label">{shipment?.customId ? fmt(j.shipmentRef, { id: shipment.customId }) : j.shipment}</span>
                <h3 id="rd-ship-h" className="rd-display text-[1.9rem] leading-none">
                  {shipment
                    ? k
                      ? k === "delivered"
                        ? j.delivered
                        : k === "failed" || k === "cancelled"
                          ? j.stalledTitle[k]
                          : j.status[k]
                      : shipment.status || j.inProgress
                    : loading
                      ? j.reading
                      : j.yourShipment}
                </h3>
                <p className="mt-1 truncate font-mono text-xs text-[var(--rd-mute)]">{trackId}</p>
              </div>
              {shipment && <StatusChip s={shipment} />}
            </div>

            <RouteStrip t={travel} stalled={stalled} to={to} />

            <ol className="rd-timeline">
              {STOPS.map((x, i) => (
                <li key={x.s} data-state={stalled ? (i === 0 ? "done" : undefined) : i < reached ? "done" : i === reached ? "now" : undefined}>
                  <span className="rd-stage-dot" aria-hidden>
                    {!stalled && i < reached ? "✓" : i + 1}
                  </span>
                  <span>
                    <b className="block">{j.stops[i].title}</b>
                    <span className="rd-tl-text text-xs font-semibold text-[var(--rd-mute)]">{i === 3 && dest ? dest.city : j.stops[i].text}</span>
                  </span>
                </li>
              ))}
            </ol>

            {stalled && shipment && (k === "failed" || k === "cancelled") && (
              <p className="rd-alert">
                {shipment.status && shipment.status.toLowerCase() !== k ? fmt(j.stalledAs[k], { status: shipment.status }) : j.stalled[k]}
              </p>
            )}

            {shipment && k === "pending_burn" && (
              <div className="rd-note">
                <b>{j.pendingLead}</b> {j.pendingText}
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" className="rd-btn rd-btn-gold" onClick={() => onFinish(trackId, shipment.totalCents)} disabled={releaseBusy || !passActive}>
                    {j.finish}
                  </button>
                  <button type="button" className="rd-btn rd-btn-ghost" onClick={refresh}>
                    {t.redeem.actions.checkAgain}
                  </button>
                </div>
              </div>
            )}

            {shipment && (shipment.deliveryCompany || shipment.trackingIds.length > 0 || shipment.trackingUrls.length > 0) && (
              <div className="rd-track">
                <span className="rd-label">{shipment.deliveryCompany ? fmt(j.trackingWith, { carrier: shipment.deliveryCompany }) : j.tracking}</span>
                <ul className="flex flex-col gap-2">
                  {shipment.trackingIds.map((t, i) => (
                    <li key={t} className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold">{t}</span>
                      {shipment.trackingUrls[i] && (
                        <a className="rd-chip" href={shipment.trackingUrls[i]} target="_blank" rel="noopener noreferrer">
                          {j.trackIt}
                        </a>
                      )}
                    </li>
                  ))}
                  {shipment.trackingUrls.slice(shipment.trackingIds.length).map((u) => (
                    <li key={u}>
                      <a className="rd-chip" href={u} target="_blank" rel="noopener noreferrer">
                        {j.trackParcel}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {shipment && (
              <dl className="rd-ship-facts">
                {shipment.totalCents !== null && (
                  <div>
                    <dt>{j.paid}</dt>
                    <dd className="rd-money">{cents(shipment.totalCents)}</dd>
                  </div>
                )}
                {shipment.shippingCents !== null && (
                  <div>
                    <dt>{j.shipping}</dt>
                    <dd className="rd-money">{cents(shipment.shippingCents)}</dd>
                  </div>
                )}
                {shipment.insuranceCents !== null && shipment.insuranceCents > 0 && (
                  <div>
                    <dt>{j.insurance}</dt>
                    <dd className="rd-money">{cents(shipment.insuranceCents)}</dd>
                  </div>
                )}
                {day(shipment.createdAt, locale) && (
                  <div>
                    <dt>{j.booked}</dt>
                    <dd>{day(shipment.createdAt, locale)}</dd>
                  </div>
                )}
                {day(shipment.updatedAt, locale) && (
                  <div>
                    <dt>{j.updated}</dt>
                    <dd>{day(shipment.updatedAt, locale)}</dd>
                  </div>
                )}
              </dl>
            )}

            {shipment && shipment.nftAddresses.length > 0 && (
              <ul className="rd-cargo" aria-label={plural(locale, shipment.nftAddresses.length, j.cards)}>
                {shipment.nftAddresses.slice(0, 12).map((m) => (
                  <li key={m}>
                    <img src={imageOf(m)} alt="" width={40} height={56} loading="lazy" decoding="async" className="rd-thumb" style={{ width: 40, height: 56 }} />
                  </li>
                ))}
                {shipment.nftAddresses.length > 12 && <li className="rd-cargo-more">+{shipment.nftAddresses.length - 12}</li>}
              </ul>
            )}

            {error && (
              <p className="rd-alert" role="alert">
                {noteText(t.redeem.errors, error)}{" "}
                <button type="button" className="rd-link" onClick={refresh}>
                  {t.redeem.actions.tryAgain}
                </button>
              </p>
            )}
            {!passActive && !shipment && !error && <p className="text-sm font-bold text-[var(--rd-mute)]">{j.renewToRead}</p>}
            {shipment && k !== "pending_burn" && (
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="rd-chip" onClick={refresh}>
                  {t.redeem.actions.checkAgain}
                </button>
                <span className="text-xs font-bold text-[var(--rd-mute)]">{k === "delivered" || stalled ? j.final : j.polling}</span>
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="rd-ship rd-journey-wide">
          <p className="rd-display text-2xl">{saved.length ? j.pickTitle : j.noneTitle}</p>
          <p className="text-sm font-semibold text-[var(--rd-mute)]">{saved.length ? j.pickText : j.noneText}</p>
        </section>
      )}

      {others.length > 0 && (
        <section className="rd-journeys rd-journey-wide" aria-labelledby="rd-journeys-h">
          <h3 id="rd-journeys-h" className="rd-label">
            {trackId ? j.others : j.all}
          </h3>
          <ul>
            {others.map((id) => {
              const s = summaries[id];
              const d = destinations[id];
              return (
                <li key={id}>
                  <button type="button" className="rd-journey-row" onClick={() => onTrack(id)}>
                    <span className="min-w-0">
                      <b className="block truncate">
                        {d ? (
                          <>
                            <span aria-hidden>{flagOf(d.country.a2)}</span> {d.city}
                          </>
                        ) : s && s !== "error" && s.customId ? (
                          s.customId
                        ) : (
                          j.shipment
                        )}
                      </b>
                      <span className="block truncate font-mono text-xs text-[var(--rd-mute)]">{id}</span>
                    </span>
                    <span className="flex flex-col items-end gap-1">
                      {passActive ? <StatusChip s={s} /> : <span className="rd-status">{j.passNeeded}</span>}
                      {s && s !== "error" && (
                        <span className="text-xs font-bold text-[var(--rd-mute)]">
                          {plural(locale, s.nftAddresses.length, t.redeem.slabs)}
                          {day(s.createdAt, locale) ? ` · ${day(s.createdAt, locale)}` : ""}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="rd-actions rd-journey-wide">
        <button type="button" className="rd-btn rd-btn-ghost" onClick={onNew} disabled={releaseBusy}>
          {j.more}
        </button>
      </div>
    </div>
  );
}
