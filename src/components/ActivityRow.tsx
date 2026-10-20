"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Activity } from "@/lib/types";
import { fmtUsd, shortAddr, timeAgo, activityDisplay } from "@/lib/format";
import { cardImage, solscanTx } from "@/lib/constants";
import { Badge } from "@/components/ui";
import { clsx } from "@/lib/clsx";

export function priceText(a: Activity): string | null {
  if (a.priceUsdc != null) return fmtUsd(a.priceUsdc);
  if (a.priceSol != null) return `${a.priceSol}◎`;
  return null;
}

export function ActivityRow({ a, showCard = true }: { a: Activity; showCard?: boolean }) {
  const router = useRouter();
  const d = activityDisplay(a.kind);
  const price = priceText(a);
  const hasCard = Boolean(a.cardName && a.assetMint);

  // The whole row navigates to the card (or Solscan) via onClick, so inner
  // wallet links stay as real anchors without nesting <a> inside <a>.
  const navigate = () => {
    if (hasCard) router.push(`/card/${a.assetMint}`);
    else window.open(solscanTx(a.signature), "_blank", "noopener");
  };

  return (
    <div
      onClick={navigate}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate();
      }}
      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-panel-2/50"
    >
      {showCard &&
        (hasCard ? (
          <img
            src={cardImage(a.assetMint!, "front", 128)}
            alt=""
            loading="lazy"
            className="h-11 w-8 rounded object-cover bg-panel-2 shrink-0 ring-1 ring-line"
          />
        ) : (
          <div className="h-11 w-8 rounded bg-panel-2 shrink-0 grid place-items-center text-muted text-[9px]">
            ?
          </div>
        ))}

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Badge tone={d.tone}>{d.verb}</Badge>
          {a.gradingCompany && (
            <span className="text-[10px] font-mono text-dex-gold">
              {a.gradingCompany} {a.grade}
            </span>
          )}
        </div>
        {showCard && (
          <div className="mt-0.5 text-sm truncate">
            {a.cardName ?? <span className="text-muted">Unresolved card</span>}
          </div>
        )}
        <div className="mt-0.5 text-[11px] text-muted flex items-center gap-1 flex-wrap">
          {a.seller && (
            <Link
              href={`/wallet/${a.seller}`}
              onClick={(e) => e.stopPropagation()}
              className="hover:text-dex-yellow font-mono"
            >
              {shortAddr(a.seller)}
            </Link>
          )}
          {a.buyer && a.buyer !== a.seller && (
            <>
              <span className="text-dex-cyan">→</span>
              <Link
                href={`/wallet/${a.buyer}`}
                onClick={(e) => e.stopPropagation()}
                className="hover:text-dex-yellow font-mono"
              >
                {shortAddr(a.buyer)}
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="text-right shrink-0">
        {price ? (
          <div className={clsx("font-semibold tabular-nums text-sm", d.tone === "up" ? "text-up" : "text-ink")}>
            {price}
          </div>
        ) : (
          <div className="text-muted text-xs">·</div>
        )}
        <div className="text-[10px] text-muted tabular-nums mt-0.5">{timeAgo(a.blockTime)}</div>
      </div>
    </div>
  );
}
