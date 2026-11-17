"use client";
import type { EstimateState } from "@/hooks/pages/Redeem/useEstimate";
import { useLocale, useT } from "@/components/LocaleProvider";
import { fmt, plural } from "@/lib/i18n/format";
import type { Country } from "@/lib/redeem/countries";
import { cents, insuredCents } from "@/lib/redeem/rates";
import { MAX_COMMENT, type Address } from "@/lib/redeem/types";
import { shortCardName } from "@/lib/format";
import type { CardRow } from "@/lib/types";
import { flagOf } from "./CountryPicker";
import { LazyGlobe } from "./maps";
import { CardThumb } from "./Party";
import { noteText, slots, useCountryName } from "./text";

// Stop 5: the whole trip on one screen before anything is signed: the cargo, the address, the
// live quote (the amount that gets charged), the route on the globe, and what can't be undone.

/** Comments are plain text: newlines and tabs, no other control characters. */
const plain = (s: string) =>
  Array.from(s)
    .filter((ch) => {
      const c = ch.codePointAt(0) ?? 0;
      return c === 9 || c === 10 || !(c < 32 || (c >= 127 && c <= 159));
    })
    .join("")
    .slice(0, MAX_COMMENT);

export function AddressLines({ a, country }: { a: Address; country: Country | null }) {
  const name = useCountryName();
  return (
    <address className="not-italic">
      <b className="block">{a.name}</b>
      <span className="block">
        {a.line1}
        {a.line2 ? `, ${a.line2}` : ""}
      </span>
      <span className="block">
        {a.city}, {a.state} {a.postalCode}
      </span>
      <span className="block">{country ? name(country) : a.country}</span>
      <span className="mt-1 block text-sm text-[var(--rd-mute)]">
        {a.phoneNumber} · {a.email}
      </span>
    </address>
  );
}

export function Review({
  cards,
  country,
  address,
  quote,
  passActive,
  onRenewPass,
  comment,
  onComment,
  onDrop,
  onNext,
  onBack,
  onParty,
  onAddress,
}: {
  cards: CardRow[];
  country: Country;
  address: Address;
  quote: EstimateState;
  passActive: boolean;
  onRenewPass: () => void;
  comment: string;
  onComment: (s: string) => void;
  onDrop: (mints: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  onParty: () => void;
  onAddress: () => void;
}) {
  const t = useT();
  const { locale } = useLocale();
  const name = useCountryName();
  const r = t.redeem.review;
  const place = fmt(t.redeem.place, { city: address.city, country: name(country) });
  const declared = cards.reduce((s, c) => s + insuredCents(c.insuredValue), 0);
  const listed = cards.filter((c) => c.listing).length;
  const flagged = cards.filter((c) => quote.problems[c.nftAddress]);
  const e = quote.estimate;
  const n = cards.length;
  return (
    <div className="rd-review">
      <section className="rd-review-map" aria-label={r.route}>
        <LazyGlobe mode="route" selected={country.num} travel={null} label={fmt(t.redeem.map.globeRoute, { place })} />
        <p className="rd-route-legend">
          <span>{t.redeem.pass.vault}</span>
          <span className="rd-route-legend-line" aria-hidden />
          <span>{place}</span>
        </p>
      </section>

      <section className="rd-quote" aria-labelledby="rd-quote-h" aria-busy={quote.loading || undefined}>
        <div className="flex items-baseline justify-between gap-3">
          <h3 id="rd-quote-h" className="rd-display text-2xl">
            {r.quote}
          </h3>
          <span className="rd-label">{r.live}</span>
        </div>
        {!passActive && !e ? (
          <div className="rd-note">
            <b>{r.passLead}</b>{" "}
            {slots(r.passText, {
              renew: (
                <button type="button" className="rd-link" onClick={onRenewPass}>
                  {t.redeem.actions.renewTheLink}
                </button>
              ),
            })}
          </div>
        ) : quote.loading ? (
          <div className="flex flex-col gap-2" role="status" aria-label={r.loading}>
            <span className="rd-skel h-5 w-3/4 rounded-lg" />
            <span className="rd-skel h-5 w-2/3 rounded-lg" />
            <span className="rd-skel h-5 w-1/2 rounded-lg" />
            <span className="rd-skel mt-2 h-10 w-full rounded-xl" />
          </div>
        ) : quote.error && quote.error.code === "REDEEM_INVALID_CARDS" ? (
          <div className="flex flex-col gap-3" role="alert">
            <p className="font-extrabold">
              {flagged.length === n ? r.noneCanTravel : plural(locale, flagged.length, r.someCantTravel, { total: n })}
            </p>
            <ul className="rd-flagged">
              {flagged.map((c) => {
                const p = quote.problems[c.nftAddress];
                return (
                  <li key={c.nftAddress}>
                    <CardThumb card={c} size={34} />
                    <span className="min-w-0">
                      <b className="block truncate">{shortCardName(c.itemName)}</b>
                      <span className="rd-problem-text block text-xs font-bold">
                        {t.redeem.problems[p.code]}
                        {p.message ? `: ${p.message}` : ""}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
            {flagged.length < n ? (
              <button type="button" className="rd-btn rd-btn-gold self-start" onClick={() => onDrop(flagged.map((c) => c.nftAddress))}>
                {plural(locale, flagged.length, r.takeOut)}
              </button>
            ) : (
              <button type="button" className="rd-btn rd-btn-gold self-start" onClick={onParty}>
                {t.redeem.actions.backToParty}
              </button>
            )}
            {flagged.length === 0 && <p className="text-sm font-semibold text-[var(--rd-mute)]">{noteText(t.redeem.errors, quote.error)}</p>}
          </div>
        ) : quote.error ? (
          <div className="flex flex-col gap-3" role="alert">
            <p className="rd-alert">{noteText(t.redeem.errors, quote.error)}</p>
            <button type="button" className="rd-btn rd-btn-ghost self-start" onClick={quote.retry}>
              {r.askAgain}
            </button>
          </div>
        ) : e ? (
          <>
            <dl className="rd-lines">
              {e.lines.length > 0 ? (
                e.lines.map((l, i) => (
                  <div key={`${l.code}-${i}`}>
                    <dt>{l.label || l.code}</dt>
                    <dd className="rd-money">{cents(l.amountCents)}</dd>
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <dt>{fmt(r.shipping, { zone: e.region || r.yourZone })}</dt>
                    <dd className="rd-money">{cents(e.shippingCents)}</dd>
                  </div>
                  <div>
                    <dt>{r.insurance}</dt>
                    <dd className="rd-money">{cents(e.insuranceCents)}</dd>
                  </div>
                  <div>
                    <dt>{r.fees}</dt>
                    <dd className="rd-money">{cents(e.feesCents)}</dd>
                  </div>
                </>
              )}
            </dl>
            <div className="rd-total">
              <span>
                <b className="block">{r.total}</b>
                <span className="text-xs font-bold text-[var(--rd-mute)]">
                  {fmt(r.totalMeta, { slabs: plural(locale, e.cardCount || n, t.redeem.slabs), price: cents(e.declaredValueCents || declared) })}
                  {e.region ? ` · ${e.region}` : ""}
                </span>
              </span>
              <b className="rd-money text-[2rem] leading-none">{cents(e.totalCents)}</b>
            </div>
            {e.notes.length > 0 && (
              <ul className="rd-dest-notes">
                {e.notes.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}
            <p className="text-xs font-bold text-[var(--rd-mute)]">{r.networkFee}</p>
          </>
        ) : null}
      </section>

      <section className="rd-review-box" aria-labelledby="rd-cargo-h">
        <div className="flex items-baseline justify-between gap-3">
          <h3 id="rd-cargo-h" className="rd-label">
            {fmt(r.cargo, { slabs: plural(locale, n, t.redeem.slabs) })}
          </h3>
          <button type="button" className="rd-link" onClick={onParty}>
            {t.redeem.actions.change}
          </button>
        </div>
        <ul className="rd-cargo">
          {cards.slice(0, 12).map((c) => (
            <li key={c.nftAddress} title={c.itemName} data-flagged={quote.problems[c.nftAddress] ? "" : undefined}>
              <CardThumb card={c} size={44} />
            </li>
          ))}
          {n > 12 && <li className="rd-cargo-more">+{n - 12}</li>}
        </ul>
        <p className="text-sm font-bold">{slots(r.declared, { price: <span className="rd-money ml-1 text-lg">{cents(declared)}</span> })}</p>
        {listed > 0 && <p className="text-xs font-bold text-[var(--rd-mute)]">{plural(locale, listed, r.listed)}</p>}
      </section>

      <section className="rd-review-box" aria-labelledby="rd-dest-h">
        <div className="flex items-baseline justify-between gap-3">
          <h3 id="rd-dest-h" className="rd-label">
            <span aria-hidden>{flagOf(country.a2)}</span> {r.destination}
          </h3>
          <button type="button" className="rd-link" onClick={onAddress}>
            {t.redeem.actions.change}
          </button>
        </div>
        <AddressLines a={address} country={country} />
      </section>

      <section className="rd-review-box rd-review-wide">
        <label htmlFor="rd-comment" className="rd-label">
          {r.note}
        </label>
        <textarea
          id="rd-comment"
          className="rd-textarea"
          rows={2}
          maxLength={MAX_COMMENT}
          value={comment}
          onChange={(ev) => onComment(plain(ev.target.value))}
          placeholder={r.notePlaceholder}
          aria-describedby="rd-comment-n"
        />
        <span id="rd-comment-n" className="self-end text-xs font-bold text-[var(--rd-mute)]">
          {comment.length}/{MAX_COMMENT}
        </span>
      </section>

      <section className="rd-final rd-review-wide" aria-labelledby="rd-final-h">
        <h3 id="rd-final-h" className="rd-display text-xl">
          {r.finalTitle}
        </h3>
        <ul>
          <li>{slots(plural(locale, n, r.finalBurn), { burns: <b>{plural(locale, n, r.finalBurns)}</b> })}</li>
          <li>
            {slots(plural(locale, n, r.finalPay, { city: address.city }), {
              pays: <b>{fmt(r.finalPays, { amount: e ? cents(e.totalCents) : r.theQuote })}</b>,
            })}
          </li>
          <li>{r.finalCheck}</li>
        </ul>
      </section>

      <div className="rd-actions rd-review-wide">
        <button type="button" className="rd-btn rd-btn-ghost" onClick={onBack}>
          {t.redeem.actions.back}
        </button>
        <button type="button" className="rd-btn rd-btn-red" onClick={onNext} disabled={!e || quote.loading || flagged.length > 0}>
          {e ? fmt(r.next, { price: cents(e.totalCents) }) : r.waiting} <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
