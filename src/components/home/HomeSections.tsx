"use client";

import Link from "@/components/LocaleLink";
import { useId, useState, useSyncExternalStore } from "react";
import { useHomeActivity, useHomeListings, useHotBids } from "@/hooks/pages/Home/useHighlights";
import { CardTile } from "@/components/CardTile";
import { ActivityRow } from "@/components/ActivityRow";
import { GameBoy } from "@/components/gameboy/GameBoy";
import { DexEntry } from "@/components/home/DexEntry";
import { HighlightPanel, useHighlightInView } from "@/components/home/HighlightPanel";
import { Rail } from "@/components/motion";
import { CardRailSkeleton, DexMessage, FeedSkeleton, GradePill, MoreLink, SectionHead } from "@/components/ui";
import { useLocale, useT } from "@/components/LocaleProvider";
import { rich } from "@/components/home/rich";
import { useSolPrice } from "@/lib/hooks";
import { cardImage } from "@/lib/constants";
import { fmtNum, fmtUsd, gradeShort, isBotChurn, shortCardName } from "@/lib/format";
import { fmt, plural } from "@/lib/i18n/format";
import type { Activity } from "@/lib/types";

// One rail, three views of the same home feed. The copy is t.home.market.tabs[id].
const TABS = [
  { id: "deals", key: "bestDeals", ranked: true, href: "/scanner?orderBy=deal" },
  { id: "new", key: "newestListings", ranked: false, href: "/scanner?orderBy=listedDateDesc" },
  { id: "top", key: "topListings", ranked: true, href: "/scanner?orderBy=listedPriceDesc" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function MarketRail() {
  const listings = useHomeListings();
  const sol = useSolPrice();
  const uid = useId();
  const m = useT().home.market;
  const [tabId, setTabId] = useState<TabId>("deals");
  const tab = TABS.find((t) => t.id === tabId) ?? TABS[0];
  const copy = m.tabs[tab.id];
  const cards = listings.data?.[tab.key] ?? [];

  // Arrow keys move between tabs (WAI-ARIA tabs pattern); the panel follows the focus.
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = TABS[(i + step + TABS.length) % TABS.length];
    setTabId(next.id);
    document.getElementById(`${uid}-${next.id}`)?.focus();
  };

  return (
    <section aria-labelledby={`${uid}-title`} className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
        <div className="flex flex-col gap-3">
          <span className="kicker">{m.kicker}</span>
          <h2 id={`${uid}-title`} className="h-display text-[clamp(1.7rem,3.4vw,2.6rem)]">
            {rich(copy.title, { em: <span className="text-up">{copy.em}</span> })}
          </h2>
          <p className="text-ink-soft max-w-xl">{copy.sub}</p>
        </div>
        <div role="tablist" aria-label={m.tabsLabel} className="seg max-w-full overflow-x-auto no-scrollbar">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              id={`${uid}-${t.id}`}
              type="button"
              role="tab"
              aria-selected={t.id === tabId}
              aria-controls={`${uid}-panel`}
              tabIndex={t.id === tabId ? 0 : -1}
              onClick={() => setTabId(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className="whitespace-nowrap max-sm:min-h-11"
            >
              {m.tabs[t.id].label}
            </button>
          ))}
        </div>
      </div>
      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-${tabId}`}>
        {listings.isLoading ? (
          <CardRailSkeleton />
        ) : (
          <Rail key={tabId} label={copy.label}>
            {cards.map((c, i) => (
              <CardTile key={c.nftAddress} c={c} rank={tab.ranked ? i + 1 : undefined} solUsd={sol} />
            ))}
          </Rail>
        )}
      </div>
      <div className="[&>a]:py-2.5">
        <MoreLink href={tab.href}>{copy.more}</MoreLink>
      </div>
    </section>
  );
}

const WIDE = "(min-width: 768px)";
const subscribeWide = (onChange: () => void) => {
  const mq = window.matchMedia(WIDE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/**
 * The Game Boy prints and advances on timers, so it mounts only while the band is near the screen,
 * and not at all on phones (the moves list below says the same). The slot keeps its size meanwhile.
 */
function GameBoySlot({ events, loading }: { events: Activity[]; loading: boolean }) {
  const { visible } = useHighlightInView();
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false);
  if (wide && visible) return <GameBoy events={events} loading={loading} />;
  return <div aria-hidden style={{ width: "clamp(268px, 26vw, 330px)", aspectRatio: "0.6" }} />;
}

export function HomeSections() {
  // Three independent feeds: each section below renders as soon as its own lands.
  const listings = useHomeListings();
  const activity = useHomeActivity();
  const bids = useHotBids();
  const { locale, t } = useLocale();
  const { onChain: l, offline, snapshot } = t.home;

  if (listings.isError && !listings.data && activity.isError && !activity.data) {
    return (
      <DexMessage
        title={offline.title}
        action={
          <button type="button" onClick={() => window.location.reload()} className="btn btn-red">
            {offline.retry}
          </button>
        }
      >
        {offline.text}
      </DexMessage>
    );
  }

  const recent = activity.data?.recentActivity ?? [];
  const live = recent.filter((a) => !isBotChurn(a));
  const feed = (live.length >= 6 ? live : recent).slice(0, 6);
  const hotBids = bids.data?.hotBids ?? [];

  return (
    <div className="flex flex-col gap-24 sm:gap-28">
      <MarketRail />

      {/* live zone: a soft tinted frame, not a band */}
      <HighlightPanel className="rounded-[28px] bg-cream-hi/60 px-4 py-10 sm:px-10 sm:py-12">
        <section aria-label={l.kicker} className="flex flex-col gap-10">
          <SectionHead
            kicker={l.kicker}
            title={l.title}
            sub={l.sub}
            action={<MoreLink href="/tape">{l.more}</MoreLink>}
          />
          <div className="grid gap-10 md:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[auto_minmax(0,1fr)_320px] items-start">
            <div className="hidden md:flex flex-col items-center gap-4 lg:sticky lg:top-24">
              <GameBoySlot events={recent} loading={activity.isLoading} />
              <p className="max-w-[300px] text-center text-xs text-ink-mute">{l.gameBoy}</p>
            </div>

            <div className="min-w-0">
              <h3 className="font-extrabold text-lg mb-2 flex items-center gap-2">
                <span className="live-dot" /> {l.moves}
              </h3>
              {activity.isLoading || (activity.isError && !activity.data) ? (
                <FeedSkeleton rows={6} />
              ) : feed.length ? (
                // Phones get the four newest: the rows stack tall there.
                <div className="dash-divide max-md:[&>*:nth-child(n+5)]:hidden">
                  {feed.map((a) => (
                    <ActivityRow key={a.signature} a={a} />
                  ))}
                </div>
              ) : (
                <p className="text-ink-mute py-6">{l.quiet}</p>
              )}
            </div>

            <div className="min-w-0 md:col-span-2 xl:col-span-1">
              <h3 className="font-extrabold text-lg mb-1">{l.bidsTitle}</h3>
              <p className="text-sm text-ink-mute mb-3">{l.bidsSub}</p>
              {bids.isLoading || (bids.isError && !bids.data) ? (
                <FeedSkeleton rows={5} />
              ) : hotBids.length > 0 ? (
                <ol className="dash-divide max-md:[&>li:nth-child(n+5)]:hidden">
                  {hotBids.slice(0, 5).map((b, i) => (
                    <li key={b.mint}>
                      <Link href={`/card/${b.mint}`} className="group flex items-center gap-3 py-3">
                        <span className="font-pixel text-[10px] text-ink-mute w-5">{i + 1}</span>
                        <img
                          src={cardImage(b.mint, "front", 128)}
                          alt=""
                          loading="lazy"
                          className="h-12 w-9 rounded-md object-contain bg-cream shrink-0 transition-transform group-hover:-rotate-3"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block font-extrabold truncate group-hover:text-poke-deep">
                            {shortCardName(b.cardName)}
                          </span>
                          <span className="flex items-center gap-2 mt-1">
                            <GradePill label={gradeShort(b.gradingCompany, b.grade)} />
                            <span className="text-[11px] text-ink-mute">
                              {plural(locale, b.bidCount, l.bids, { n: fmtNum(b.bidCount) })}
                            </span>
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="block font-num font-extrabold text-lg leading-none tabular-nums text-warn">
                            {fmtUsd(b.topBid)}
                          </span>
                          {Number(b.insuredValue) > 0 && (
                            <span className="block text-[11px] text-ink-mute mt-1">
                              {fmt(l.ofInsured, { pct: Math.round((b.topBid / Number(b.insuredValue)) * 100) })}
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-ink-mute py-6">{l.noBids}</p>
              )}
            </div>
          </div>
        </section>
      </HighlightPanel>

      <section aria-label={snapshot.kicker} className="flex flex-col gap-8">
        <SectionHead kicker={snapshot.kicker} title={snapshot.title} sub={snapshot.sub} />
        <DexEntry counts={listings.data?.categories ?? {}} />
      </section>
    </div>
  );
}
