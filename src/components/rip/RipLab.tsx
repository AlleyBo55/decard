"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useT } from "@/components/LocaleProvider";
import { usePreviewFlow } from "@/hooks/pages/Rip/usePreviewFlow";
import { fmt } from "@/lib/i18n/format";
import { useRipFlow } from "@/hooks/pages/Rip/useRipFlow";
import { sfx } from "@/lib/rip/sfx";
import { acknowledge, getVersion, loadAt, mergePulls, news as trainerNews, recordSale, stats as trainerStats, subscribe } from "@/lib/rip/trainer";
import type { PoolCard, RipPack, RipTx } from "@/lib/rip/types";
import { selectView, useMyPullsInfiniteQuery, useRipPacksQuery, useRipPoolInfiniteQuery } from "@/store/api";
import { Ball } from "./Ball";
import { Cutscene } from "./Cutscene";
import { Grails } from "./Grails";
import { HitsStrip } from "./HitsStrip";
import { PCBox } from "./PCBox";
import { rich } from "./rich";
import { MachineSkeleton, RipDock, RipMachine } from "./RipMachine";
import { RipProvider, useRipWallet } from "./RipProvider";
import { TrainerCard } from "./TrainerCard";
import { universeOf } from "./universes";
import { WalletBar, WalletPicker } from "./WalletBar";
import "./rip.css";

/** The /rip page's live part: the arena, the rip itself, and the trainer's collection. */
export function RipLab() {
  return (
    <RipProvider>
      <Lab />
    </RipProvider>
  );
}

interface Fixture {
  packs: RipPack[];
  pools: Record<string, PoolCard[]>;
}

/** Pokémon 50 first, as on Slabz; otherwise the cheapest Pokémon pack, then the cheapest pack. */
function pickDefault(packs: RipPack[]) {
  const live = packs.filter((p) => p.active && !p.paused);
  const pool = live.length ? live : packs;
  const poke = pool.filter((p) => universeOf(p.type).id === "pokemon").sort((a, b) => a.priceCents - b.priceCents);
  return pool.find((p) => p.type === "pokemon_50") ?? poke[0] ?? [...pool].sort((a, b) => a.priceCents - b.priceCents)[0];
}

/** Low-end phones get a lighter arena: no drifting layers, fewer particles. */
function detectLite() {
  if (typeof navigator === "undefined") return false;
  const n = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (n.deviceMemory !== undefined && n.deviceMemory <= 2) || (n.hardwareConcurrency !== undefined && n.hardwareConcurrency <= 2) || n.connection?.saveData === true;
}

function Lab() {
  const t = useT().rip;
  const wallet = useRipWallet();
  const params = useSearchParams();
  const [lite] = useState(detectLite);

  // Dev preview: the production catalog with simulated rips (devnet has a single pack).
  const previewWanted = process.env.NODE_ENV !== "production" && params.has("preview");
  const [fixture, setFixture] = useState<Fixture | null>(null);
  useEffect(() => {
    if (!previewWanted) return;
    fetch("/api/rip/preview")
      .then((r) => (r.ok ? r.json() : null))
      .then(setFixture)
      .catch(() => setFixture(null));
  }, [previewWanted]);
  const preview = previewWanted && fixture !== null;

  const live = useRipPacksQuery(undefined, { pollingInterval: 60_000, skipPollingIfUnfocused: true, selectFromResult: selectView });
  const packs = preview ? fixture!.packs : live.data;
  const packsById = useMemo(() => new Map((packs ?? []).map((p) => [p.id, p])), [packs]);
  const wanted = params.get("pack");
  const selected = useMemo(() => (packs?.length ? (packs.find((p) => p.type === wanted) ?? pickDefault(packs)) : null), [packs, wanted]);
  // ?pack=onepiece_50 deep-links a pack. replaceState keeps browsing a client-only change.
  const select = useCallback((p: RipPack) => {
    const url = new URL(window.location.href);
    url.searchParams.set("pack", p.type);
    window.history.replaceState(null, "", url);
  }, []);
  const u = universeOf(selected?.type ?? "pokemon");

  // The whole page (background, footer, every section) takes the universe's colours.
  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty("--u-ink", u.ink);
    s.setProperty("--u-glow", u.glow);
    return () => {
      s.removeProperty("--u-ink");
      s.removeProperty("--u-glow");
    };
  }, [u]);
  useEffect(() => {
    const d = document.documentElement.dataset;
    if (lite) d.ripLite = "1";
    return () => {
      delete d.ripLite;
    };
  }, [lite]);

  const poolQ = useRipPoolInfiniteQuery({ packId: selected?.id ?? "" }, { skip: !selected || preview });
  const grails = useMemo(() => {
    if (!selected) return [];
    if (preview) return [...(fixture!.pools[selected.id] ?? [])].sort((a, b) => b.insuredValueCents - a.insuredValueCents);
    return poolQ.data?.pages[0]?.data ?? [];
  }, [selected, preview, fixture, poolQ.data]);

  const me = wallet.ready && wallet.session ? wallet.session.wallet : null;
  const pullsQ = useMyPullsInfiniteQuery(me ?? "", { skip: !me });
  const pulls = useMemo(() => pullsQ.data?.pages.flatMap((p) => p.data) ?? [], [pullsQ.data]);
  const refetch = useRef(pullsQ.refetch);
  useEffect(() => {
    refetch.current = pullsQ.refetch;
  });
  const refreshPulls = useCallback(() => {
    if (me) void refetch.current();
  }, [me]);

  // Trainer progress, folded from the wallet's pulls into this device's record.
  const version = useSyncExternalStore(subscribe, getVersion, () => 0);
  const store = me ? loadAt(me, version) : null;
  const stats = useMemo(() => (store ? trainerStats(store) : null), [store]);
  const fresh = useMemo(() => (store && stats ? trainerNews(store, stats) : null), [store, stats]);
  useEffect(() => {
    if (me && pulls.length) mergePulls(me, pulls, (id) => universeOf(packsById.get(id)?.type ?? "").id);
  }, [me, pulls, packsById]);
  const hasNews = Boolean(fresh && (fresh.levelUp != null || fresh.badges.length > 0));
  useEffect(() => {
    if (!me || !fresh || !stats || !hasNews) return;
    sfx.levelUp();
    const t = setTimeout(() => acknowledge(me, stats.level, fresh.earned), 9000);
    return () => clearTimeout(t);
  }, [me, fresh, stats, hasNews]);

  const real = useRipFlow(wallet.signAll, refreshPulls);
  const poolOf = useCallback((id: string) => fixture?.pools[id] ?? [], [fixture]);
  const sim = usePreviewFlow(poolOf);
  const phase = sim.phase.step !== "idle" ? sim.phase : real.phase;

  const [turbo, setTurbo] = useState(false);
  const [seq, setSeq] = useState(0);
  // The cutscene shows while a rip is under way. Only an opening pack (already paid) can be
  // tucked away; it comes back by itself when the card is dealt.
  const [tucked, setTucked] = useState(false);
  const stageOpen = phase.step !== "idle" && !(tucked && phase.step === "opening");
  const busy = phase.step === "buying" || phase.step === "signing" || phase.step === "paying" || phase.step === "opening";
  const [pastButton, setPastButton] = useState(false);

  // A rip asked for before signing in starts once the sign-in lands, never later.
  const queued = useRef<{ pack: RipPack; turbo: boolean } | null>(null);
  useEffect(() => {
    const q = queued.current;
    if (!q) return;
    if (wallet.ready) {
      queued.current = null;
      void real.rip(q.pack, q.turbo);
    } else if (!wallet.pickerOpen) {
      queued.current = null;
    }
  }, [wallet.ready, wallet.pickerOpen, real]);

  const start = (p: RipPack, withTurbo = turbo) => {
    setTucked(false);
    setSeq((s) => s + 1);
    if (preview) {
      void sim.rip(p);
      return;
    }
    if (!wallet.ready) {
      queued.current = { pack: p, turbo: withTurbo };
      wallet.openPicker();
      return;
    }
    void real.rip(p, withTurbo);
  };
  const close = () => {
    if (sim.phase.step !== "idle") return sim.reset();
    if (phase.step === "opening") setTucked(true);
    else real.reset();
  };
  const packOf = (tx: RipTx): RipPack =>
    packsById.get(tx.packId) ?? {
      id: tx.packId,
      name: t.lab.unknownPack,
      description: "",
      imageUrl: "",
      priceCents: tx.priceCents,
      type: "pokemon",
      active: false,
      paused: false,
      evCents: null,
      odds: null,
    };


  return (
    <>
      {previewWanted && (
        <p className="fixed left-3 top-[74px] z-[45] max-w-[calc(100vw-24px)] rounded-full bg-[#ffcb05] px-3 py-1.5 text-xs font-black text-[#29263d] shadow-lg">
          {preview ? "Preview: production catalog, simulated rips" : "Loading the preview catalog… (scripts/rip-preview.mjs)"}
        </p>
      )}

      {selected && packs ? (
        <RipMachine
          packs={packs}
          selected={selected}
          onSelect={select}
          sellBackPct={wallet.sellBackPct}
          turbo={turbo}
          onTurbo={setTurbo}
          onRip={(p) => start(p)}
          busy={busy}
          paused={stageOpen}
          grails={grails}
          grailsLoading={!preview && poolQ.isLoading}
          onGrails={() => document.getElementById("grails")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          onPastButton={setPastButton}
          top={
            <>
              {wallet.cluster === "devnet" && !preview && <span className="ra-mode">{t.lab.devnet}</span>}
              <WalletBar trainer={stats} />
            </>
          }
        />
      ) : live.isLoading || previewWanted ? (
        <MachineSkeleton />
      ) : (
        <p className="rw-card my-10 px-5 py-6 text-center font-extrabold">{live.isError ? t.lab.offline : t.lab.empty}</p>
      )}
      <HitsStrip />

      {selected && <Grails key={selected.id} pack={selected} preview={preview ? fixture!.pools[selected.id] ?? [] : undefined} />}

      <section id="my-pulls" aria-labelledby="rp-pulls" className="mt-16 flex scroll-mt-24 flex-col gap-5">
        <div className="rw-head">
          <span className="rw-kicker">{t.lab.pullsKicker}</span>
          <h2 id="rp-pulls">{t.lab.pullsTitle}</h2>
          <p className="max-w-2xl text-sm font-semibold text-[var(--rw-mute)]">{t.lab.pullsText}</p>
        </div>
        <TrainerCard wallet={me} stats={stats} onConnect={wallet.openPicker} />
        {me && (
          <PCBox
            pulls={pulls}
            packsById={packsById}
            loading={pullsQ.isLoading}
            error={pullsQ.isError}
            hasMore={Boolean(pullsQ.hasNextPage)}
            fetchingMore={pullsQ.isFetchingNextPage}
            onMore={() => void pullsQ.fetchNextPage()}
            onOpen={(tx) => {
              setTucked(false);
              setSeq((s) => s + 1);
              void real.resume(packOf(tx), tx.id);
            }}
            onView={(tx) => {
              setSeq((s) => s + 1);
              real.show(packOf(tx), tx);
            }}
          />
        )}
      </section>

      {selected && <RipDock pack={selected} show={pastButton && !stageOpen} busy={busy} onRip={() => start(selected)} />}

      <Cutscene
        phase={phase}
        open={stageOpen}
        seq={seq}
        cluster={wallet.cluster}
        preview={sim.phase.step !== "idle"}
        lite={lite}
        signAll={wallet.signAll}
        news={hasNews && fresh && stats ? { levelUp: fresh.levelUp, title: stats.title, badges: fresh.badges } : null}
        onClose={close}
        onRip={() => phase.step !== "idle" && start(phase.pack)}
        onTurbo={() => phase.step !== "idle" && start(phase.pack, true)}
        onResume={(txId) => phase.step !== "idle" && void real.resume(phase.pack, txId)}
        onSold={() => {
          if (me) recordSale(me);
          refreshPulls();
        }}
      />
      <WalletPicker />

      {phase.step === "opening" && !stageOpen && (
        <button type="button" onClick={() => setTucked(false)} className="rw-btn rw-btn-gold fixed bottom-[150px] right-4 z-30 md:bottom-6">
          <Ball size={20} motion="shake" /> {t.lab.opening}
        </button>
      )}
      {hasNews && !stageOpen && fresh && stats && (
        <div role="status" className="fixed bottom-[150px] left-4 z-30 flex max-w-xs flex-col gap-2 md:bottom-6">
          {fresh.levelUp && (
            <div className="rc-toast">
              {rich(t.news.levelUp, {
                level: <b>{fmt(t.trainer.level, { n: fresh.levelUp })}</b>,
                title: t.trainer.titles[stats.title] ?? stats.title,
              })}
            </div>
          )}
          {fresh.badges.map((b) => (
            <div key={b.id} className="rc-toast" style={{ background: `linear-gradient(90deg, ${b.color}, #fff)` }}>
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-white/70 text-sm">{b.glyph}</span>
              {fmt(t.news.badge, { name: (t.trainer.badges[b.id] ?? b).name })}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
