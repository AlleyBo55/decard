"use client";
import Link from "@/components/LocaleLink";
import { useEffect, useMemo, useRef, useState } from "react";
import { Flame } from "@/components/icons";
import { useLocale } from "@/components/LocaleProvider";
import { Emblem } from "@/components/rip/Emblem";
import { TierMark } from "@/components/rip/TierMark";
import { TELL, tierOf, usd } from "@/components/rip/shared";
import { UNIVERSES, artOf, packName, universeById, type UniverseId } from "@/components/rip/universes";
import type { GymPacks } from "@/hooks/pages/Gym/useGyms";
import { clsx } from "@/lib/clsx";
import { fmtNum, shortCardName } from "@/lib/format";
import { fmt, plural } from "@/lib/i18n/format";
import type { PoolCard } from "@/lib/rip/types";
import { thumbSet } from "@/lib/thumb";
import type { DecardLeaderboard, LeaguePack, SlabzLeague } from "@/services/Gym/types";
import { useRipPoolInfiniteQuery } from "@/store/api";
import { GymBadge } from "./GymBadge";
import { METRICS, around, oneIn, pct, rankGyms, ratioPct, spanLabel, tiedAt, type Gym, type GymMetric } from "./shared";

/** Gyms shown before "show all": three rows on desktop. */
const FIRST = 9;

/** Every pack is a gym, ranked by the chance of a big pull. */
export function Gyms({ data, league, decard }: { data: GymPacks; league?: SlabzLeague; decard?: DecardLeaderboard }) {
  const { locale, t } = useLocale();
  const s = t.gym.gyms;
  const [metric, setMetric] = useState<GymMetric>("epic");
  const [only, setOnly] = useState<UniverseId | null>(null);
  const [all, setAll] = useState(false);
  const gyms = useMemo(() => rankGyms(data.packs ?? [], metric), [data.packs, metric]);
  const groups = useMemo(
    () => UNIVERSES.map((u) => ({ u, n: gyms.filter((g) => g.u.id === u.id).length })).filter((g) => g.n > 0),
    [gyms],
  );
  const heat = useMemo(() => new Map((league?.packs ?? []).map((p) => [p.type, p])), [league]);
  const ours = useMemo(() => new Map((decard?.packs ?? []).map((p) => [p.packId, p.rips])), [decard]);
  const picked = only ? gyms.filter((g) => g.u.id === only) : gyms;
  const shown = all || only ? picked : picked.slice(0, FIRST);
  const tie = tiedAt(gyms, metric);
  const span = spanLabel(locale, t.gym.span, league?.from, league?.to);
  const labels: Record<GymMetric, string> = { epic: s.epic, legendary: t.ui.ripTiers.legendary.label, ev: s.ev };
  const label = labels[metric];

  // Picking a universe dresses the whole page in its colours, as picking a pack does on /rip.
  useEffect(() => {
    if (!only) return;
    const u = universeById(only);
    const s = document.documentElement.style;
    s.setProperty("--u-ink", u.ink);
    s.setProperty("--u-glow", u.glow);
    return () => {
      s.removeProperty("--u-ink");
      s.removeProperty("--u-glow");
    };
  }, [only]);

  return (
    <section id="gyms" aria-labelledby="gy-gyms" className="mt-16 flex scroll-mt-24 flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="rw-head">
          <span className="rw-kicker">{s.kicker}</span>
          <h2 id="gy-gyms">{s.title}</h2>
          <p className="max-w-2xl text-sm font-semibold text-[var(--rw-mute)]">{s.lede}</p>
        </div>
        {gyms.length > 0 && (
          <p className="rw-label">
            {plural(locale, gyms.length, s.count, { n: fmtNum(gyms.length) })} · {plural(locale, groups.length, s.universes, { n: fmtNum(groups.length) })}
          </p>
        )}
      </div>
      <div className="gy-controls">
        <div role="group" aria-label={s.rankBy} className="gy-seg">
          {METRICS.map((m) => (
            <button key={m} type="button" aria-pressed={metric === m} onClick={() => setMetric(m)}>
              {labels[m]}
            </button>
          ))}
        </div>
        {groups.length > 1 && (
          <div role="group" aria-label={s.showFrom} className="gy-case no-scrollbar">
            <button type="button" aria-pressed={only === null} onClick={() => setOnly(null)}>
              {s.all} <span className="gy-case-n">{gyms.length}</span>
            </button>
            {groups.map(({ u, n }) => (
              <button
                key={u.id}
                type="button"
                aria-pressed={only === u.id}
                onClick={() => setOnly(only === u.id ? null : u.id)}
                style={{ ["--c" as string]: u.glow, ["--ci" as string]: u.ink }}
                title={fmt(s.universeTitle, { universe: u.name, badge: t.gym.badges[u.id] })}
              >
                <GymBadge u={u.id} size={26} />
                {u.name} <span className="gy-case-n">{n}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="gy-note" aria-live="polite">
        <b>{fmt(s.noteLabel, { label })}</b> {s.about[metric]}
        {tie != null && (
          <>
            {" "}
            {fmt(metric === "epic" ? s.tieEpic : s.tieLegendary, { pct: pct(tie), oneIn: oneIn(tie, t.gym.odds) })}
          </>
        )}
      </p>
      {data.isLoading ? (
        <ul className="gy-gyms" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="gy-gym gy-skel" />
          ))}
        </ul>
      ) : gyms.length === 0 ? (
        <p className="rw-card px-5 py-6 text-center font-extrabold">
          {data.isError ? s.error : s.none}
        </p>
      ) : (
        <ol className="gy-gyms">
          {shown.map((g) => (
            <GymCard
              key={g.pack.id}
              g={g}
              metric={metric}
              pool={data.preview ? (data.pools?.[g.pack.id] ?? []) : undefined}
              heat={heat.get(g.pack.type)}
              ours={ours.get(g.pack.id) ?? 0}
              span={span}
            />
          ))}
        </ol>
      )}
      {!only && picked.length > FIRST && (
        <div className="flex justify-center">
          <button type="button" className="ra-chip" aria-expanded={all} onClick={() => setAll((v) => !v)}>
            {all ? fmt(t.gym.showTop, { n: FIRST }) : plural(locale, picked.length, s.showAll, { n: fmtNum(picked.length) })}
          </button>
        </div>
      )}
    </section>
  );
}

/** True once `ref` comes within `margin` of the viewport, and from then on. */
function useNear(ref: React.RefObject<Element | null>, margin: string) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        setNear(true);
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}

/** The gym's top legendary card: from the preview pool, or fetched once the card nears the screen. */
function useLeader(packId: string, pool: PoolCard[] | undefined, near: boolean) {
  const q = useRipPoolInfiniteQuery({ packId, rarity: "legendary" }, { skip: pool !== undefined || !near });
  const list = pool ?? q.data?.pages[0]?.data;
  const leader = useMemo(
    () => (list ?? []).filter((c) => tierOf(c.rarity) === "legendary").reduce<PoolCard | null>((b, c) => (!b || c.insuredValueCents > b.insuredValueCents ? c : b), null),
    [list],
  );
  return { leader, pending: pool === undefined && (!near || q.isLoading) };
}

function GymCard({ g, metric, pool, heat, ours, span }: { g: Gym; metric: GymMetric; pool?: PoolCard[]; heat?: LeaguePack; ours: number; span: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const near = useNear(ref, "300px 0px");
  const { leader, pending } = useLeader(g.pack.id, pool, near);
  const { locale, t } = useLocale();
  const s = t.gym.gyms.card;
  const [rankPre, rankPost] = around(t.gym.rank);
  const art = artOf(g.pack.type);
  const name = packName(g.pack);
  const odds = g.pack.odds ?? [];
  const hot = (heat?.pulls ?? 0) >= 10;
  return (
    <li
      ref={ref}
      className="gy-gym"
      data-open={g.open}
      data-medal={g.rank <= 3 ? g.rank : undefined}
      style={{ ["--gi" as string]: g.u.ink, ["--gg" as string]: g.u.glow, ["--ga" as string]: art?.accent ?? g.u.ink }}
    >
      <div className="gy-gym-head">
        <span className="gy-gym-rank">
          {rankPre && <span className="sr-only">{rankPre}</span>}
          {g.rank}
          {rankPost && <span className="sr-only">{rankPost}</span>}
        </span>
        <div className="min-w-0 flex-1">
          <p className="gy-gym-kind">{fmt(s.kind, { universe: g.u.name, badge: t.gym.badges[g.u.id] })}</p>
          <h3 className="rw-display gy-gym-name">{name}</h3>
        </div>
        <GymBadge u={g.u.id} size={50} labelled className="gy-gym-badge" />
      </div>
      {/* The pack squares up to the gym leader on the universe's own arena (rip.css). */}
      <div className="gy-gym-arena rp-arena" data-u={g.u.id} style={{ ["--u-ink" as string]: g.u.ink, ["--u-glow" as string]: g.u.glow }} aria-hidden>
        {art ? (
          <img className="gy-gym-pack" src={art.small} alt="" width={art.w} height={art.h} loading="lazy" decoding="async" />
        ) : (
          <span className="gy-gym-pack gy-gym-pack-blank">
            <Emblem id={g.u.id} className="h-10 w-10" />
          </span>
        )}
        {leader?.imageUrl && (
          <>
            <span className="gy-gym-vs">{s.vs}</span>
            <img className="gy-gym-boss" {...thumbSet(leader.imageUrl, 96)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
          </>
        )}
      </div>
      <div className="gy-gym-leader">
        <span className="gy-gym-leader-label">{s.leader}</span>
        {leader ? (
          <>
            <TierMark u={g.u.id} tier="legendary" size={18} label={t.ui.ripTiers.legendary.label} />
            <span className="min-w-0 flex-1 truncate font-extrabold" title={leader.name}>
              {shortCardName(leader.name)}
            </span>
            <b className="rw-money shrink-0 text-lg leading-none" style={{ color: TELL.legendary }}>
              {usd(leader.insuredValueCents, true)}
            </b>
          </>
        ) : (
          <span className="min-w-0 flex-1 truncate font-bold text-[var(--rw-mute)]">{pending ? s.scouting : s.hiding}</span>
        )}
      </div>
      <dl className="gy-metrics">
        <Metric on={metric === "epic"} label={t.gym.epicPlus} value={pct(g.epicPct)} sub={oneIn(g.epicPct, t.gym.odds)} />
        <Metric on={metric === "legendary"} label={t.ui.ripTiers.legendary.label} value={pct(g.legendaryPct)} sub={oneIn(g.legendaryPct, t.gym.odds)} />
        <Metric on={metric === "ev"} label={s.ret} value={ratioPct(g.evRatio)} sub={g.pack.evCents != null ? fmt(s.avg, { value: usd(g.pack.evCents) }) : ""} />
      </dl>
      {odds.length > 0 && (
        <div className="ra-bar gy-gym-odds" aria-hidden>
          {odds.map((o) => (
            <span key={o.tier} style={{ width: `${o.percent}%`, background: TELL[tierOf(o.tier)] }} />
          ))}
        </div>
      )}
      <div className="gy-gym-foot">
        <span className={clsx("gy-heat", hot && "gy-heat-hot")}>
          {hot && <Flame className="h-3.5 w-3.5 shrink-0" />}
          <span>
            {heat ? plural(locale, heat.pulls, s.heat, { n: fmtNum(heat.pulls), span }) : fmt(s.cold, { span })}
            {ours > 0 && <> · {plural(locale, ours, s.ours, { n: fmtNum(ours) })}</>}
          </span>
        </span>
        {g.open ? (
          <Link
            href={`/rip?pack=${encodeURIComponent(g.pack.type)}`}
            className="gy-challenge"
            aria-label={fmt(s.challengeLabel, { name, price: usd(g.pack.priceCents) })}
          >
            {s.challenge}
            <b className="rw-money">{usd(g.pack.priceCents)}</b>
          </Link>
        ) : (
          <span className="gy-closed">{g.pack.paused ? s.paused : s.closed}</span>
        )}
      </div>
    </li>
  );
}

function Metric({ on, label, value, sub }: { on: boolean; label: string; value: string; sub: string }) {
  return (
    <div className="gy-metric" data-on={on}>
      <dt>{label}</dt>
      <dd className="rw-money gy-metric-value">{value}</dd>
      {sub && <dd className="gy-metric-sub">{sub}</dd>}
    </div>
  );
}
