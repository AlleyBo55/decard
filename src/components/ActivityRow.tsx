"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Activity } from "@/lib/types";
import { activityDisplay, gradeShort, isBotChurn, priceText, shortAddr, shortCardName, timeAgo } from "@/lib/format";
import { cardImage, solscanTx } from "@/lib/constants";
import { useWalletLabel } from "@/lib/hooks";
import { GradePill, Tag } from "@/components/ui";
import { clsx } from "@/lib/clsx";

/** A wallet shown by label when we know it (yours or the shared list). */
export function WalletName({ address }: { address: string }) {
  const label = useWalletLabel(address);
  return (
    <Link
      href={`/wallet/${address}`}
      onClick={(e) => e.stopPropagation()}
      title={address}
      className={clsx(
        "font-bold hover:text-poke-deep transition-colors",
        label ? "text-azure-deep" : "font-mono text-[13px] text-ink-soft",
      )}
    >
      {label ? label.label : shortAddr(address)}
    </Link>
  );
}

export function ActivityRow({ a, showCard = true }: { a: Activity; showCard?: boolean }) {
  const router = useRouter();
  const d = activityDisplay(a.kind);
  const price = priceText(a);
  const hasCard = Boolean(a.cardName && a.assetMint);
  const from = d.tone === "sale" ? a.seller : a.actor ?? a.seller ?? a.buyer;
  const to = d.tone === "sale" ? a.buyer : null;

  const navigate = () => {
    if (hasCard && showCard) router.push(`/card/${a.assetMint}`);
    else window.open(solscanTx(a.signature), "_blank", "noopener");
  };

  return (
    <div
      onClick={navigate}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate()}
      className="group menu-item flex items-center gap-3 py-3 pl-1 pr-1 cursor-pointer rounded-lg hover:bg-cream-hi/80 transition-colors"
    >
      {showCard &&
        (hasCard ? (
          <img
            src={cardImage(a.assetMint!, "front", 128)}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-12 w-9 rounded-md object-contain bg-cream-lo shrink-0 transition-transform group-hover:-rotate-3 group-hover:scale-105"
          />
        ) : (
          <span className="pokeball shrink-0" style={{ ["--s" as string]: "30px" }} />
        ))}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag tone={d.tone}>{d.verb}</Tag>
          {showCard && (
            <>
              <span className="font-extrabold truncate">{hasCard ? shortCardName(a.cardName) : "Unresolved card"}</span>
              <GradePill label={gradeShort(a.gradingCompany, a.grade)} />
            </>
          )}
          {isBotChurn(a) && (
            <span className="font-pixel text-[8px] text-ink-mute" title={`${a.ixCount} offers in one transaction`}>
              BOT ×{a.ixCount}
            </span>
          )}
        </div>
        <div className="mt-1 text-[13px] text-ink-mute flex items-center gap-1.5 flex-wrap">
          {from && (
            <>
              <span>{d.tone === "sale" ? "from" : "by"}</span>
              <WalletName address={from} />
            </>
          )}
          {to && to !== from && (
            <>
              <span className="text-poke">→</span>
              <WalletName address={to} />
            </>
          )}
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className={clsx("font-display font-bold text-lg leading-none tabular-nums", d.tone === "sale" ? "text-up" : "text-ink")}>
          {price ?? ""}
        </div>
        <div className="mt-1 text-[11px] text-ink-mute tabular-nums">{timeAgo(a.blockTime)} ago</div>
      </div>
    </div>
  );
}
