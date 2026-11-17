"use client";
import { useEffect, useRef } from "react";
import { useT } from "@/components/LocaleProvider";
import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/i18n/format";
import { haptic, sfx } from "@/lib/rip/sfx";
import type { OddsTier, PoolCard, RipPack } from "@/lib/rip/types";
import { thumbSet } from "@/lib/thumb";
import { Ball } from "./Ball";
import { Emblem } from "./Emblem";
import { TELL, band, oneIn, tierOf, usd } from "./shared";
import { TierMark } from "./TierMark";
import { artOf, groupPacks, universeOf, type Universe } from "./universes";

const HOLD_MS = 850;

export interface MachineProps {
  packs: RipPack[];
  selected: RipPack;
  onSelect: (p: RipPack) => void;
  /** The typical share of insured value a sell-back pays out. */
  sellBackPct: number;
  turbo: boolean;
  onTurbo: (on: boolean) => void;
  onRip: (p: RipPack) => void;
  busy: boolean;
  /** The cutscene is up: every loop here pauses. */
  paused: boolean;
  grails: PoolCard[];
  /** The pack's pool is still loading: the odds panel holds the chase cards' place. */
  grailsLoading?: boolean;
  onGrails: () => void;
  /** The top row: wallet, mode badges. */
  top: React.ReactNode;
  /** True once the main rip button has scrolled up out of view: the mobile dock takes over. */
  onPastButton: (past: boolean) => void;
}

/** The arena: a full-width world per universe, with the pack, its odds and the rip button. */
export function RipMachine(props: MachineProps) {
  const { packs, selected, onSelect, busy, paused, onPastButton } = props;
  const t = useT().rip;
  const root = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const groups = groupPacks(packs);
  const u = universeOf(selected.type);
  const shelf = groups.find((g) => g.universe.id === u.id)?.packs ?? [selected];
  const index = Math.max(0, shelf.findIndex((p) => p.id === selected.id));
  const canRip = selected.active && !selected.paused && !busy;

  // Every loop in the arena pauses off screen and behind the cutscene.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.offscreen = String(!e.isIntersecting);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const b = button.current;
    if (!b) return;
    const io = new IntersectionObserver(([e]) => onPastButton(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(b);
    return () => io.disconnect();
  }, [onPastButton]);

  const go = (step: number) => {
    const next = shelf[(index + step + shelf.length) % shelf.length];
    if (next && next.id !== selected.id) {
      sfx.tick();
      onSelect(next);
    }
  };
  const pickUniverse = (to: Universe) => {
    const g = groups.find((x) => x.universe.id === to.id);
    if (!g || to.id === u.id) return;
    // Land on the pack nearest the current price: $50 Pokémon → $50 One Piece.
    const near = [...g.packs].sort((a, b) => Math.abs(a.priceCents - selected.priceCents) - Math.abs(b.priceCents - selected.priceCents))[0];
    sfx.tick();
    haptic(10);
    onSelect(near);
  };
  const rip = () => {
    if (!canRip) return;
    sfx.tick();
    haptic(20);
    props.onRip(selected);
  };

  return (
    <section
      ref={root}
      aria-label={t.machine.arena}
      className="ra full-bleed"
      data-u={u.id}
      data-paused={paused}
      style={{ ["--u-ink" as string]: u.ink, ["--u-glow" as string]: u.glow }}
    >
      <div className="rp-arena ra-world" data-u={u.id} aria-hidden />
      <div key={u.id} className="ra-wipe" aria-hidden />
      <div className="ra-shell">
        <div className="ra-top">
          <div className="ra-rail" role="group" aria-label={t.machine.universes}>
            {groups.map(({ universe: g, packs: list }) => (
              <button
                key={g.id}
                type="button"
                className="ra-uni"
                aria-pressed={g.id === u.id}
                onClick={() => pickUniverse(g)}
                style={{ ["--c" as string]: g.glow, ["--ci" as string]: g.ink }}
              >
                <span className="ra-uni-icon">
                  <Emblem id={g.id} />
                </span>
                <span className="ra-uni-name">{t.universeNames[g.id] ?? g.name}</span>
                <span className="ra-uni-count">{list.length}</span>
              </button>
            ))}
          </div>
          <div className="ra-top-end">{props.top}</div>
        </div>

        <div className="ra-grid">
          <Stage u={u} shelf={shelf} index={index} canRip={canRip} onGo={go} onSelect={onSelect} onRip={rip} />
          <BuyPanel {...props} u={u} canRip={canRip} onRip={rip} buttonRef={button} />
          <OddsPanel u={u} pack={selected} grails={props.grails} grailsLoading={props.grailsLoading} onGrails={props.onGrails} />
        </div>
      </div>
    </section>
  );
}

function BuyPanel({
  selected,
  sellBackPct,
  turbo,
  onTurbo,
  busy,
  u,
  canRip,
  onRip,
  buttonRef,
  onGrails,
}: MachineProps & { u: Universe; canRip: boolean; onRip: () => void; buttonRef: React.RefObject<HTMLButtonElement | null> }) {
  const t = useT().rip;
  const copy = t.machine;
  const ev = selected.evCents;
  const evPct = ev != null && selected.priceCents > 0 ? Math.round((ev / selected.priceCents) * 100) : null;
  return (
    <aside className="ra-panel ra-buy" aria-label={copy.buy}>
      <div className="ra-buy-head flex items-center gap-2">
        <span className="ra-uni-icon" style={{ ["--c" as string]: u.glow }}>
          <Emblem id={u.id} />
        </span>
        <span className="rw-label">{t.universeNames[u.id] ?? u.name}</span>
        {selected.paused && <span className="ra-flag">{copy.paused}</span>}
      </div>
      <h2 className="rw-display ra-name">{selected.name}</h2>
      <dl className="ra-stats">
        <div>
          <dt className="rw-label">{copy.price}</dt>
          <dd className="rw-money">{usd(selected.priceCents)}</dd>
        </div>
        <div title={copy.avgPullHint}>
          <dt className="rw-label">{copy.avgPull}</dt>
          <dd className={clsx("rw-money", evPct != null && evPct >= 100 && "text-[#7cf29a]")}>{ev != null ? usd(ev) : "·"}</dd>
        </div>
        <div title={copy.sellBackHint}>
          <dt className="rw-label">{copy.sellBack}</dt>
          <dd className="rw-money">85%</dd>
        </div>
      </dl>
      {evPct != null && (
        <p className="ra-ev">
          <span style={{ width: `${Math.min(100, (evPct / 130) * 100)}%` }} />
          <b>{fmt(copy.avgPullPct, { pct: evPct })}</b>
        </p>
      )}
      <label className="ra-switch" title={copy.turboHint}>
        <input type="checkbox" checked={turbo} onChange={(e) => onTurbo(e.target.checked)} />
        <span>
          <b>{copy.turbo}</b>
          <small>{copy.turboSub}</small>
        </span>
      </label>
      <button ref={buttonRef} type="button" className="ra-rip" disabled={!canRip} onClick={onRip}>
        <span className="ra-rip-icon">{u.id === "pokemon" ? <Ball size={26} /> : <Emblem id={u.id} className="h-7 w-7" />}</span>
        <span className="ra-rip-text">{selected.paused ? copy.paused : busy ? copy.ripping : copy.rip}</span>
        {!selected.paused && !busy && <span className="ra-rip-price">{usd(selected.priceCents)}</span>}
      </button>
      <p className="ra-fine">{copy.fine}</p>
      <div className="ra-buy-links flex flex-wrap gap-2">
        <button type="button" className="ra-chip" onClick={onGrails}>
          ◆ {copy.topGrails}
        </button>
        <a href="#how" className="ra-chip">
          ? {copy.howItWorks}
        </a>
      </div>
    </aside>
  );
}

function OddsPanel({
  u,
  pack,
  grails,
  grailsLoading,
  onGrails,
}: {
  u: Universe;
  pack: RipPack;
  grails: PoolCard[];
  grailsLoading?: boolean;
  onGrails: () => void;
}) {
  const copy = useT().rip.odds;
  const odds = pack.odds;
  return (
    <aside className="ra-panel ra-odds" aria-label={copy.title}>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="rw-display text-xl">{copy.title}</h3>
        <span className="rw-label">{copy.perPack}</span>
      </div>
      {odds?.length ? <Odds u={u} odds={odds} /> : <p className="text-sm text-[var(--rw-mute)]">{copy.refreshing}</p>}
      {grails.length > 0 ? (
        <button type="button" className="ra-chase" onClick={onGrails} aria-label={copy.seeGrails}>
          <span className="rw-label">{copy.chase}</span>
          <span className="ra-chase-row">
            {grails.slice(0, 3).map((c) => (
              <span key={c.id} className="ra-chase-card" style={{ ["--c" as string]: TELL[tierOf(c.rarity)] }}>
                {c.imageUrl ? <img {...thumbSet(c.imageUrl, 128)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" /> : null}
                <b className="rw-money">{usd(c.insuredValueCents, true)}</b>
              </span>
            ))}
          </span>
        </button>
      ) : (
        grailsLoading && (
          // Holds the chase cards' place while the pool loads, so the panel doesn't grow and shift.
          <div className="ra-chase" aria-hidden>
            <span className="rw-label">{copy.chase}</span>
            <span className="ra-chase-row">
              {[0, 1, 2].map((i) => (
                <span key={i} className="ra-chase-card" style={{ ["--c" as string]: "rgb(255 255 255 / 0.3)" }}>
                  <span className="block aspect-[5/8] animate-pulse rounded bg-white/10" />
                </span>
              ))}
            </span>
          </div>
        )
      )}
    </aside>
  );
}

function Odds({ u, odds }: { u: Universe; odds: OddsTier[] }) {
  const { ui, rip } = useT();
  return (
    <>
      <div className="ra-bar" aria-hidden>
        {odds.map((o) => (
          <span key={o.tier} style={{ width: `${o.percent}%`, background: TELL[tierOf(o.tier)] }} />
        ))}
      </div>
      <ul className="ra-odds-list">
        {odds.map((o) => {
          const t = tierOf(o.tier);
          return (
            <li key={o.tier}>
              <TierMark u={u.id} tier={t} size={24} label={ui.ripTiers[t].label} />
              <span className="ra-odds-main">
                <b style={{ color: TELL[t] }}>{ui.ripTiers[t].label}</b>
                <small className="rw-money">{band(o)}</small>
              </span>
              <span className="ra-odds-num">
                <b className="rw-money">{o.percent}%</b>
                <small>{oneIn(o.percent, rip.odds)}</small>
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** The packs on a carousel: swipe or arrow to browse, hold the centre pack to rip. */
function Stage({
  u,
  shelf,
  index,
  canRip,
  onGo,
  onSelect,
  onRip,
}: {
  u: Universe;
  shelf: RipPack[];
  index: number;
  canRip: boolean;
  onGo: (step: number) => void;
  onSelect: (p: RipPack) => void;
  onRip: () => void;
}) {
  const t = useT().rip;
  const copy = t.machine;
  const stage = useRef<HTMLDivElement>(null);
  const hold = useRef({ id: 0, start: 0, x: 0, y: 0, moved: false, raf: 0, last: 0 });
  const setCharge = (v: number) => stage.current?.style.setProperty("--charge", String(v));
  const stopHold = () => {
    cancelAnimationFrame(hold.current.raf);
    hold.current.id = 0;
    setCharge(0);
  };
  useEffect(() => () => cancelAnimationFrame(hold.current.raf), []);

  const centre = () => stage.current?.querySelector<HTMLElement>('[data-off="0"] .rp-pack');
  const leave = () => {
    const pack = centre();
    if (!pack) return;
    pack.dataset.live = "false";
    pack.style.setProperty("--ry", "0deg");
    pack.style.setProperty("--rx", "0deg");
  };
  const onDown = (e: React.PointerEvent) => {
    const h = hold.current;
    h.id = e.pointerId;
    h.start = performance.now();
    h.last = 0;
    h.x = e.clientX;
    h.y = e.clientY;
    h.moved = false;
    if (!(e.target as HTMLElement).closest('[data-off="0"]') || !canRip) return;
    const tick = (now: number) => {
      if (h.id !== e.pointerId || h.moved) return;
      const p = Math.min(1, (now - h.start) / HOLD_MS);
      setCharge(p);
      if (now - h.last > 90) {
        h.last = now;
        sfx.charge(p);
        haptic(8);
      }
      if (p >= 1) {
        stopHold();
        onRip();
        return;
      }
      h.raf = requestAnimationFrame(tick);
    };
    h.raf = requestAnimationFrame(tick);
  };
  const onMove = (e: React.PointerEvent) => {
    const h = hold.current;
    if (h.id === e.pointerId && !h.moved && Math.hypot(e.clientX - h.x, e.clientY - h.y) > 12) {
      h.moved = true;
      setCharge(0);
    }
    if (e.pointerType !== "mouse") return;
    const pack = centre();
    if (!pack) return;
    const r = pack.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    if (x < -0.3 || x > 1.3 || y < -0.2 || y > 1.2) return leave();
    pack.dataset.live = "true";
    pack.style.setProperty("--ry", `${(x - 0.5) * 18}deg`);
    pack.style.setProperty("--rx", `${(0.5 - y) * 14}deg`);
    pack.style.setProperty("--mx", `${x * 100}%`);
    pack.style.setProperty("--my", `${y * 100}%`);
  };
  const onUp = (e: React.PointerEvent) => {
    const h = hold.current;
    if (h.id !== e.pointerId) return;
    const dx = e.clientX - h.x;
    stopHold();
    if (h.moved && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - h.y)) onGo(dx < 0 ? 1 : -1);
  };

  return (
    <div
      ref={stage}
      className="ra-stage"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={fmt(copy.stage, { universe: t.universeNames[u.id] ?? u.name })}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onGo(1);
        if (e.key === "ArrowLeft") onGo(-1);
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={stopHold}
      onPointerLeave={(e) => {
        leave();
        onUp(e);
      }}
    >
      <p key={u.id} className="ra-tagline rw-display" aria-hidden>
        {t.universes[u.id].tagline}
      </p>
      <span className="ra-floor" aria-hidden />
      {shelf.map((p, i) => {
        let off = i - index;
        if (shelf.length > 2) {
          if (off > shelf.length / 2) off -= shelf.length;
          if (off < -shelf.length / 2) off += shelf.length;
        }
        if (Math.abs(off) > 2) return null;
        const art = artOf(p.type);
        const a = Math.abs(off);
        return (
          <div
            key={p.id}
            className="rp-slot"
            data-off={off}
            role="group"
            aria-label={fmt(off === 0 ? copy.slotSelected : copy.slot, { name: p.name, price: usd(p.priceCents) })}
            onClick={() => off !== 0 && onSelect(p)}
            style={{
              ["--off" as string]: off,
              ["--sc" as string]: off === 0 ? 1 : a === 1 ? 0.68 : 0.5,
              ["--op" as string]: off === 0 ? 1 : a === 1 ? 0.72 : 0.32,
              ["--z" as string]: 10 - a,
            }}
          >
            <div className="rp-pack-float" style={{ animationDelay: `${i * -0.7}s` }}>
              <div className="rp-pack" style={art ? { ["--ar" as string]: `${art.w} / ${art.h}`, ["--mask" as string]: `url("${art.small}")` } : undefined}>
                {art ? (
                  <img
                    src={off === 0 ? art.src : art.small}
                    alt=""
                    width={art.w}
                    height={art.h}
                    decoding="async"
                    loading={off === 0 ? "eager" : "lazy"}
                    fetchPriority={off === 0 ? "high" : "low"}
                    draggable={false}
                  />
                ) : (
                  <div className="grid h-full place-items-center rounded-xl border-2 border-white/30 bg-white/10">
                    <Ball size={70} />
                  </div>
                )}
                <span className="rp-pack-glare" />
              </div>
            </div>
            {off === 0 && canRip && (
              <span className="rp-hold" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="rgb(255 255 255 / .22)" strokeWidth="3" />
                  <circle cx="12" cy="12" r="10" fill="none" stroke={u.glow} strokeWidth="3" strokeLinecap="round" />
                </svg>
                {copy.hold}
              </span>
            )}
          </div>
        );
      })}
      {shelf.length > 1 && (
        <>
          <button type="button" className="rp-nav rp-nav-l" aria-label={copy.prev} onClick={() => onGo(-1)}>
            ‹
          </button>
          <button type="button" className="rp-nav rp-nav-r" aria-label={copy.next} onClick={() => onGo(1)}>
            ›
          </button>
        </>
      )}
      <div className="rp-tiers" role="group" aria-label={copy.prices}>
        {shelf.map((p, i) => (
          <button key={p.id} type="button" aria-pressed={i === index} onClick={() => onSelect(p)}>
            {usd(p.priceCents, true)}
          </button>
        ))}
      </div>
    </div>
  );
}

/** The mobile dock: the rip button stays one thumb away once the main one scrolls off. */
export function RipDock({ pack, show, busy, onRip }: { pack: RipPack; show: boolean; busy: boolean; onRip: () => void }) {
  const t = useT().rip;
  const u = universeOf(pack.type);
  const art = artOf(pack.type);
  return (
    <div className="ra-dock" data-show={show} style={{ ["--u-ink" as string]: u.ink, ["--u-glow" as string]: u.glow }} aria-hidden={!show}>
      {art && <img src={art.small} alt="" width={art.w} height={art.h} className="ra-dock-art" />}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-black">{pack.name}</div>
        <div className="rw-label !text-[10px]">{t.universeNames[u.id] ?? u.name}</div>
      </div>
      <button type="button" className="ra-rip ra-rip-sm" tabIndex={show ? 0 : -1} disabled={busy || pack.paused || !pack.active} onClick={onRip}>
        <span className="ra-rip-text">{t.machine.dockRip}</span>
        <span className="ra-rip-price">{usd(pack.priceCents)}</span>
      </button>
    </div>
  );
}

/** Placeholder while the catalog loads: the arena's own shape, so nothing jumps. */
export function MachineSkeleton() {
  return (
    <section className="ra full-bleed" aria-busy data-u="pokemon">
      <div className="rp-arena ra-world" data-u="pokemon" aria-hidden />
      <div className="ra-shell">
        <div className="ra-top">
          <div className="ra-rail">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="h-11 w-32 shrink-0 animate-pulse rounded-2xl bg-white/10" />
            ))}
          </div>
        </div>
        <div className="ra-grid">
          <div className="ra-stage grid place-items-center">
            <Ball size={90} motion="float" />
          </div>
          <div className="ra-panel ra-buy">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="h-10 animate-pulse rounded-xl bg-white/10" />
            ))}
          </div>
          <div className="ra-panel ra-odds">
            <span className="h-40 animate-pulse rounded-xl bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
