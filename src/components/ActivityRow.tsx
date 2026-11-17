"use client";

import Link from "@/components/LocaleLink";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { localizeHref } from "@/lib/i18n";
import { ago, fmt, plural } from "@/lib/i18n/format";
import type { Activity } from "@/lib/types";
import { activityDisplay, fmtNum, gradeShort, isBotChurn, priceText, shortAddr, shortCardName } from "@/lib/format";
import { cardImage, solscanTx } from "@/lib/constants";
import { useWalletLabel } from "@/lib/hooks";
import { GradePill, Tag } from "@/components/ui";
import { clsx } from "@/lib/clsx";

/** A wallet shown by label when we know it (yours or the shared list). */
export function WalletName({ address, title }: { address: string; title?: string }) {
  const label = useWalletLabel(address);
  return (
    <Link
      href={`/wallet/${address}`}
      onClick={(e) => e.stopPropagation()}
      title={title ?? address}
      // py-1 lifts the tap target past 24px tall; -my-1 keeps the line where it was.
      className={clsx(
        "inline-block py-1 -my-1 font-bold hover:text-poke-deep transition-colors",
        label ? "text-azure-deep" : "font-mono text-[13px] text-ink-soft",
      )}
    >
      {label ? label.label : shortAddr(address)}
    </Link>
  );
}

/** "from {wallet}" with the wallet's link in place of {wallet}, so translators keep the phrase whole. */
function withWallet(template: string, wallet: React.ReactNode) {
  const [before, after = ""] = template.split("{wallet}");
  return (
    <>
      {before.trim() && <span>{before.trim()}</span>}
      {wallet}
      {after.trim() && <span>{after.trim()}</span>}
    </>
  );
}

export function ActivityRow({ a, showCard = true }: { a: Activity; showCard?: boolean }) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const d = activityDisplay(a.kind);
  const price = priceText(a);
  const hasCard = Boolean(a.cardName && a.assetMint);
  // Sale: seller → buyer. Taken bid: owner → bidder. Bid: bidder → owner.
  // Listing, reprice, delist: the lister only.
  const isBid = a.kind.endsWith("Offer") && a.kind !== "AcceptOffer";
  const isListing = a.kind.startsWith("List") || a.kind === "UpdateListing" || a.kind === "CancelListing";
  const from =
    d.tone === "sale"
      ? a.seller ?? a.owner ?? null
      : isBid
        ? a.buyer ?? a.actor
        : isListing
          ? a.seller ?? a.actor
          : a.actor ?? a.seller ?? a.buyer;
  const to = d.tone === "sale" ? a.buyer : isBid ? a.owner ?? null : null;
  const toTitle = isBid && to && a.ownerIsCurrent ? fmt(t.ui.activity.currentHolder, { address: to }) : undefined;

  const navigate = () => {
    if (hasCard && showCard) router.push(localizeHref(locale, `/card/${a.assetMint}`));
    else window.open(solscanTx(a.signature), "_blank", "noopener");
  };
  // Rows aren't <Link>s, so nothing prefetches them: warm the card route on
  // hover/focus so the click shows its loading state at once.
  const warm = () => {
    if (hasCard && showCard) router.prefetch(`/card/${a.assetMint}`);
  };

  return (
    <div
      onClick={navigate}
      onPointerEnter={warm}
      onFocus={warm}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate()}
      className="group menu-item flex items-center gap-3 py-3 pl-1 pr-1 cursor-pointer rounded-lg hover:bg-cream-hi/80 transition-colors"
    >
      {showCard &&
        (hasCard ? (
          <img
            src={cardImage(a.assetMint!, "front", 128, { imageId: a.imageId })}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              // Direct image URL gone: fall back to the redirect route once.
              const el = e.currentTarget;
              if (!a.imageId || el.dataset.fallback) return;
              el.dataset.fallback = "1";
              el.src = cardImage(a.assetMint!, "front", 128);
            }}
            className="h-12 w-9 rounded-md object-contain bg-cream-lo shrink-0 transition-transform group-hover:-rotate-3 group-hover:scale-105"
          />
        ) : (
          <span className="pokeball shrink-0" style={{ ["--s" as string]: "30px" }} />
        ))}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag tone={d.tone}>{t.ui.verbs[d.verb] ?? d.verb}</Tag>
          {showCard && (
            <>
              <span className="font-extrabold truncate">{hasCard ? shortCardName(a.cardName) : t.ui.activity.unresolvedCard}</span>
              <GradePill label={gradeShort(a.gradingCompany, a.grade)} />
            </>
          )}
          {isBotChurn(a) && (
            <span
              className="font-pixel text-[8px] text-ink-mute"
              title={plural(locale, a.ixCount, t.ui.activity.botOffers, { n: fmtNum(a.ixCount) })}
            >
              {fmt(t.ui.activity.bot, { n: a.ixCount })}
            </span>
          )}
        </div>
        <div className="mt-1 text-[13px] text-ink-mute flex items-center gap-1.5 flex-wrap">
          {from &&
            withWallet(d.tone === "sale" ? t.ui.activity.fromWallet : t.ui.activity.byWallet, <WalletName address={from} />)}
          {to && to !== from && (
            <>
              <span className="text-poke">→</span>
              <WalletName address={to} title={toTitle} />
            </>
          )}
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className={clsx("font-num font-extrabold text-lg leading-none tabular-nums", d.tone === "sale" ? "text-up" : "text-ink")}>
          {price ?? ""}
        </div>
        <div className="mt-1 text-[11px] text-ink-mute tabular-nums">{ago(locale, a.blockTime)}</div>
      </div>
    </div>
  );
}
