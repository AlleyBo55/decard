"use client";
import { useLocale, useT } from "@/components/LocaleProvider";
import { fmt, plural } from "@/lib/i18n/format";
import type { Country } from "@/lib/redeem/countries";
import { countryByNum } from "@/lib/redeem/names";
import { cents, indicative, INSURANCE_OVER_CENTS, PER_EXTRA_CARD_CENTS, REGIONS, regionOf, US_SIGNATURE_CENTS, US_SIGNATURE_OVER_CENTS } from "@/lib/redeem/rates";
import { CountryPicker, flagOf } from "./CountryPicker";
import type { GlobeFocus } from "./Globe";
import { LazyGlobe } from "./maps";
import { useCountryName } from "./text";

// Stop 3: spin the globe and pick the country the slabs travel to. The globe (d3-geo and the
// 110m atlas) loads with this stop, never on first paint; the list does the same job without it.

export function Region({
  country,
  focus,
  cards,
  declaredCents,
  onPick,
  onNext,
  onBack,
}: {
  country: Country | null;
  focus: GlobeFocus | null;
  cards: number;
  declaredCents: number;
  onPick: (c: Country, fromList: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const t = useT();
  const { locale } = useLocale();
  const name = useCountryName();
  const s = t.redeem.region;
  const guess = country ? indicative(country, cards, declaredCents) : null;
  const region = country ? REGIONS[regionOf(country)] : null;
  return (
    <div className="rd-region">
      <LazyGlobe
        mode="pick"
        selected={country?.num ?? null}
        focus={focus}
        onPick={(num) => {
          const c = countryByNum(num);
          if (c) onPick(c, false);
        }}
        label={country ? fmt(t.redeem.map.globePicked, { country: name(country) }) : t.redeem.map.globeEmpty}
      />
      <div className="rd-region-side">
        <CountryPicker value={country} onPick={(c) => onPick(c, true)} />
        {country && guess && region ? (
          <div className="rd-dest" aria-live="polite">
            <div className="flex items-center gap-3">
              <span className="rd-flag rd-flag-lg" aria-hidden>
                {flagOf(country.a2)}
              </span>
              <div className="min-w-0">
                <span className="rd-label">{s.destination}</span>
                <p className="rd-display truncate text-[1.7rem]">{name(country)}</p>
              </div>
            </div>
            <dl className="rd-dest-grid">
              <div>
                <dt>{s.zone}</dt>
                <dd>{t.redeem.regions[regionOf(country)]}</dd>
              </div>
              <div>
                <dt>{t.redeem.rates.firstSlab}</dt>
                <dd className="rd-money">{cents(region.baseCents)}</dd>
              </div>
              <div>
                <dt>{t.redeem.rates.extraSlab}</dt>
                <dd className="rd-money">{cents(PER_EXTRA_CARD_CENTS)}</dd>
              </div>
              <div>
                <dt>{plural(locale, cards, s.yourSlabs)}</dt>
                <dd className="rd-money text-[var(--rd-gold)]">≈ {cents(guess.totalCents)}</dd>
              </div>
            </dl>
            <ul className="rd-dest-notes">
              {guess.signatureCents > 0 && <li>{fmt(s.signature, { price: cents(US_SIGNATURE_CENTS), over: cents(US_SIGNATURE_OVER_CENTS) })}</li>}
              {guess.insuranceCents > 0 && <li>{fmt(s.insurance, { price: cents(guess.insuranceCents), over: cents(INSURANCE_OVER_CENTS) })}</li>}
              <li>{s.published}</li>
            </ul>
          </div>
        ) : (
          <div className="rd-dest is-empty">
            <p className="rd-display text-xl">{s.emptyTitle}</p>
            <p className="text-sm font-semibold text-[var(--rd-mute)]">{s.emptyText}</p>
          </div>
        )}
        <div className="rd-actions">
          <button type="button" className="rd-btn rd-btn-ghost" onClick={onBack}>
            {t.redeem.actions.back}
          </button>
          <button type="button" className="rd-btn rd-btn-red" onClick={onNext} disabled={!country}>
            {country ? fmt(s.next, { country: name(country) }) : s.pick} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
