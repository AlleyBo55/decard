import Link from "@/components/LocaleLink";
import { getStrings } from "@/lib/i18n/strings";
import { GachaHighlightLive } from "./GachaHighlightLive";
import { HighlightPanel } from "./HighlightPanel";

/**
 * Home highlight for the live Collector Crypt gacha (/luck): the pull rate and the biggest hit
 * lately, next to the rip and redeem cards. Static copy from the server; the numbers fill in once
 * the card nears the screen.
 */
export async function GachaHighlight() {
  const g = (await getStrings()).home.gachaCard;
  return (
    <HighlightPanel className="hl-card hl-gacha">
      <div className="min-w-0">
        <span className="hl-live">
          <span className="live-dot" aria-hidden /> {g.live}
        </span>
        <h3 className="hl-title hl-title-sm mt-4">{g.title}</h3>
        <p className="hl-body mt-3">{g.body}</p>
        <GachaHighlightLive part="stats" />
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/luck#live" className="hl-stretch hl-more">
            {g.cta}
            <span aria-hidden>→</span>
          </Link>
          <Link href="/luck" className="hl-sub">
            {g.score}
          </Link>
        </div>
      </div>
      <GachaHighlightLive part="art" />
    </HighlightPanel>
  );
}
