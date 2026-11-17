"use client";

import Link from "@/components/LocaleLink";
import { useHomeListings } from "@/hooks/pages/Home/useHighlights";
import { fmtSol, fmtUsd, gradeShort, shortCardName } from "@/lib/format";
import { useT } from "@/components/LocaleProvider";
import { HighlightPanel } from "./HighlightPanel";

/** One slim, straight tape of the newest listings under the hero. Pauses on hover and off screen. */
export function JustListedTicker() {
  const { data, isLoading } = useHomeListings();
  const s = useT().home.ticker;
  const items = (data?.newestListings ?? []).slice(0, 14);

  return (
    <section aria-label={s.label} className="mt-14 sm:mt-20">
      <HighlightPanel className="tape">
        <span className="tape-label">
          <span className="tape-dot" aria-hidden />
          {s.label}
        </span>
        {items.length ? (
          <div className="marquee tape-reel" style={{ ["--marquee-duration" as string]: `${Math.max(48, items.length * 6)}s` }}>
            <div className="marquee-track">
              {/* The second copy only closes the loop: hidden from screen readers and the tab order, still clickable. */}
              {[0, 1].map((copy) => (
                <ul key={copy} className="tape-items" aria-hidden={copy === 1 || undefined}>
                  {items.map((c) => (
                    <li key={c.nftAddress}>
                      <Link href={`/card/${c.nftAddress}`} prefetch={false} tabIndex={copy ? -1 : undefined} className="tape-item">
                        <b>{shortCardName(c.itemName)}</b>
                        <span>{gradeShort(c.gradingCompany, c.grade)}</span>
                        {c.listing && (
                          <em>{c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : fmtSol(c.listing.price)}</em>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ) : (
          <p className="tape-idle">{isLoading ? s.loading : s.empty}</p>
        )}
      </HighlightPanel>
    </section>
  );
}
