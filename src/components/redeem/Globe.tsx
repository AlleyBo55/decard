"use client";
import { geoCircle, geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/format";
import { frameOf, ll, loadAtlas, ringOf, routeEnd, VAULT_AT, type Atlas, type Frame, type LonLat } from "@/lib/redeem/atlas";
import { countryByA2, countryByNum } from "@/lib/redeem/names";
import { PLACES } from "@/lib/redeem/places";
import { regionOf } from "@/lib/redeem/rates";
import { SlabMarker, VaultArt } from "./art";
import { GlobeEngine } from "./globeEngine";
import { countryName } from "./text";

// The maps of the journey, loaded only when a map step mounts (with d3-geo and the 110m atlas).
// Globe: the spinning picker (region step) and the vault-to-home route (review, journey).
// CountryMap: the flat card of the chosen country (hometown step).
// Both mark a destination the same way: its whole shape lit and one circle around all of it
// (lib/redeem/atlas.ts frameOf). Nothing pins a point inside a country or zooms into one part.

/** The map data, shared by every map on the page and fetched once. */
function useAtlas() {
  const [state, setState] = useState<{ atlas: Atlas | null; failed: boolean }>({ atlas: null, failed: false });
  const [round, setRound] = useState(0);
  useEffect(() => {
    let alive = true;
    loadAtlas()
      .then((atlas) => alive && setState({ atlas, failed: false }))
      .catch(() => alive && setState({ atlas: null, failed: true }));
    return () => {
      alive = false;
    };
  }, [round]);
  const retry = useCallback(() => {
    setState({ atlas: null, failed: false });
    setRound((r) => r + 1);
  }, []);
  return { ...state, retry };
}

const nameOf = (num: string | null, locale: Locale) => {
  const c = countryByNum(num);
  return c ? countryName(locale, c) : "";
};

/** Where to start when nothing is picked yet: the visitor's own part of the world, by locale. */
function localeCentre(): LonLat {
  const parts = (typeof navigator === "undefined" ? "" : navigator.language || "").split("-");
  const region = parts.slice(1).find((p) => /^[a-z]{2}$/i.test(p));
  const c = countryByA2(region);
  return (c && PLACES[c.num]) || [12, 22];
}

/**
 * A view that frames the vault-to-home route, closer for short trips. It looks from a little
 * south of the route's midpoint, so the great circle reads as an arc rather than a flat line
 * through the middle of the globe.
 */
function routeView(home: LonLat) {
  const dist = geoDistance(ll(VAULT_AT), ll(home));
  const mid = geoInterpolate(ll(VAULT_AT), ll(home))(0.5);
  const deg = (dist * 180) / Math.PI;
  const tilt = Math.max(0, Math.min(18, deg * 0.35, 78 - deg / 2));
  const reach = dist / 2 + (tilt * Math.PI) / 180 + 0.1;
  const zoom = Math.min(4, Math.max(1, 0.6 / Math.sin(Math.min(Math.PI / 2, reach))));
  return { lon: mid[0], lat: Math.max(-60, Math.min(60, mid[1] - tilt)), zoom };
}

/** The zoom that shows a destination's whole circle with sea around it (the engine caps it at 6). */
function zoomToFit(frame: Frame | null): number {
  if (!frame) return 5;
  return Math.max(1, 0.62 / Math.sin(Math.min(Math.PI / 2, ringOf(frame).radius)));
}

export interface GlobeFocus {
  num: string;
  /** Bumped on every request, so picking the same country twice spins again. */
  seq: number;
  /** Frame the whole country (a pick from the list), or keep the zoom unless it wouldn't fit (a tap). */
  fit: boolean;
}

export interface GlobeProps {
  mode: "pick" | "route";
  /** ISO numeric of the chosen country. Route mode: the destination, where the route ends. */
  selected: string | null;
  focus?: GlobeFocus | null;
  onPick?: (num: string) => void;
  /** Route mode: how far the slab has travelled, 0 to 1. Null hides it. */
  travel?: number | null;
  /** Route mode: tints the slab for a failed or cancelled shipment. */
  stalled?: boolean;
  label: string;
}

export function Globe({ mode, selected, focus, onPick, travel = null, stalled = false, label }: GlobeProps) {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const vault = useRef<HTMLDivElement>(null);
  const slab = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const engine = useRef<GlobeEngine | null>(null);
  const { atlas, failed, retry } = useAtlas();
  // Route mode: the route lands in the middle of the destination's circle, once the map is in.
  const home = useMemo<LonLat | null>(() => {
    if (mode !== "route" || !atlas || !selected) return null;
    const frame = frameOf(atlas, selected);
    return frame ? routeEnd(frame) : null;
  }, [mode, atlas, selected]);
  const t = useT();
  const { locale } = useLocale();
  const m = t.redeem.map;
  const [hover, setHover] = useState<string | null>(null);
  // The country in the middle of the view, "" over open sea, null before the first turn.
  const [said, setSaid] = useState<string | null>(null);
  const hint = useId();
  const pickable = mode === "pick";

  // The latest props, for the engine's first frame.
  const initial = useRef({ selected, home, pickable, onPick });
  useEffect(() => {
    initial.current = { selected, home, pickable, onPick };
  });

  useEffect(() => {
    const c = canvas.current;
    const s = stage.current;
    if (!c || !s) return;
    const first = initial.current;
    const e = new GlobeEngine(
      c,
      { vault: vault.current, slab: slab.current, tip: tip.current },
      {
        onPick: (num) => initial.current.onPick?.(num),
        onHover: setHover,
        onCentre: (num) => setSaid(num ?? ""),
      },
      first.pickable,
    );
    engine.current = e;
    if (first.home) e.setView(routeView(first.home));
    else if (first.selected && PLACES[first.selected]) {
      const at = PLACES[first.selected];
      e.setView({ lon: at[0], lat: at[1], zoom: 1.4 });
    } else {
      const at = localeCentre();
      e.setView({ lon: at[0], lat: Math.max(-30, Math.min(40, at[1])), zoom: 1 });
    }
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r && r.width > 0 && r.height > 0) e.resize(r.width, r.height);
    });
    ro.observe(s);
    const down = (ev: PointerEvent) => e.pointerDown(ev);
    const move = (ev: PointerEvent) => e.pointerMove(ev);
    const up = (ev: PointerEvent) => e.pointerUp(ev);
    const cancel = (ev: PointerEvent) => e.pointerCancel(ev);
    const leave = () => e.pointerLeave();
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", cancel);
    c.addEventListener("pointerleave", leave);
    return () => {
      ro.disconnect();
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", cancel);
      c.removeEventListener("pointerleave", leave);
      e.destroy();
      engine.current = null;
    };
  }, []);

  useEffect(() => {
    if (atlas) engine.current?.setAtlas(atlas);
  }, [atlas]);

  useEffect(() => {
    engine.current?.setSelected(selected);
  }, [selected]);

  const homeLon = home?.[0] ?? null;
  const homeLat = home?.[1] ?? null;
  const routed = useRef(false);
  useEffect(() => {
    const e = engine.current;
    if (!e) return;
    const h: LonLat | null = homeLon === null || homeLat === null ? null : [homeLon, homeLat];
    e.setRoute(h);
    if (!h) return;
    const v = routeView(h);
    // The route is known once the map is in: the first one is framed at once, a changed one flies over.
    if (routed.current) e.spinTo([v.lon, v.lat], v.zoom);
    else e.setView(v);
    routed.current = true;
  }, [homeLon, homeLat]);

  useEffect(() => {
    engine.current?.setTravel(travel);
  }, [travel]);

  const focusNum = focus?.num ?? null;
  const focusSeq = focus?.seq ?? 0;
  const focusFit = focus?.fit ?? false;
  useEffect(() => {
    const e = engine.current;
    if (!e || !focusNum) return;
    // Turn to the middle of the whole country, never to one of its parts.
    const frame = atlas ? frameOf(atlas, focusNum) : null;
    const at = frame?.center ?? PLACES[focusNum];
    if (!at) return;
    const fit = zoomToFit(frame);
    e.spinTo(at, focusFit ? fit : Math.max(1, Math.min(e.view.zoom, fit)));
  }, [focusNum, focusSeq, focusFit, atlas]);

  const hoverCountry = countryByNum(hover);
  const selectedName = nameOf(selected, locale);
  return (
    <div className="rd-globe" data-mode={mode}>
      <div
        className="rd-globe-stage"
        ref={stage}
        role="application"
        aria-roledescription="globe"
        aria-label={label}
        aria-describedby={hint}
        tabIndex={0}
        onKeyDown={(ev) => {
          if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
          if (engine.current?.key(ev.nativeEvent)) ev.preventDefault();
        }}
      >
        <div className="rd-globe-glow" aria-hidden />
        <canvas ref={canvas} className="rd-globe-canvas" aria-hidden />
        <div ref={vault} className="rd-globe-mark rd-globe-vault" data-hidden="" aria-hidden>
          <svg viewBox="-50 -36 100 80" width="46" height="37">
            <VaultArt x={0} y={0} scale={0.82} />
          </svg>
          <span>{m.vault}</span>
        </div>
        <div ref={slab} className="rd-globe-mark rd-globe-slab" data-hidden="" data-stalled={stalled || undefined} aria-hidden>
          <SlabMarker size={22} />
        </div>
        <div ref={tip} className="rd-globe-tip" aria-hidden>
          {hoverCountry && (
            <>
              <b>{countryName(locale, hoverCountry)}</b>
              <span>{t.redeem.regions[regionOf(hoverCountry)]}</span>
            </>
          )}
        </div>
        {pickable && <span className="rd-globe-reticle" aria-hidden />}
        {!atlas && (
          <div className="rd-globe-load" role="status">
            {failed ? (
              <>
                <span>{m.failed}</span>
                <button type="button" className="rd-chip" onClick={retry}>
                  {t.redeem.actions.tryAgain}
                </button>
              </>
            ) : (
              <span>{m.loading}</span>
            )}
          </div>
        )}
      </div>
      <div className="rd-globe-zoom">
        <button type="button" onClick={() => engine.current?.zoomBy(1.6)} aria-label={m.zoomIn}>
          +
        </button>
        <button type="button" onClick={() => engine.current?.zoomBy(1 / 1.6)} aria-label={m.zoomOut}>
          −
        </button>
        <button
          type="button"
          onClick={() => {
            const e = engine.current;
            if (!e) return;
            if (home) {
              const v = routeView(home);
              e.spinTo([v.lon, v.lat], v.zoom);
            } else e.spinTo([e.view.lon, e.view.lat], 1);
          }}
          aria-label={home ? m.wholeRoute : m.wholeGlobe}
        >
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden>
            <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M3.5 10h13M10 3.5c-2.6 3.4-2.6 9.6 0 13m0-13c2.6 3.4 2.6 9.6 0 13" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
      <p id={hint} className="sr-only">
        {pickable ? m.hintPick : m.hint}
      </p>
      <p className="sr-only" aria-live="polite">
        {said === null ? "" : said ? fmt(m.centred, { country: nameOf(said, locale) }) : m.openSea}
        {pickable && selectedName ? ` ${fmt(m.selected, { country: selectedName })}` : ""}
      </p>
    </div>
  );
}

const MAP_W = 360;
const MAP_H = 230;
const DEG = 180 / Math.PI;
/** The narrowest view a card shows, as a circle radius in degrees: a small country keeps its neighbours. */
const MIN_VIEW_DEG = 4;
/** The smallest circle drawn on a card, in viewBox units. */
const MIN_RING = 13;

/**
 * The chosen country on a flat card: all of it in view, lit and circled. The address isn't placed
 * on the map, so nothing marks a spot inside the country; the circle lights up once the city is in.
 */
export function CountryMap({ num, city }: { num: string | null; city: string }) {
  const { atlas } = useAtlas();
  const drawn = useMemo(() => {
    if (!atlas || !num) return null;
    const frame = frameOf(atlas, num);
    if (!frame) return null;
    const ring = ringOf(frame);
    const centre = ll(frame.center);
    const view = geoCircle()
      .center(centre)
      .radius(Math.max(ring.radius * DEG, MIN_VIEW_DEG))
      .precision(2)();
    const proj = geoOrthographic()
      .rotate([-centre[0], -centre[1]])
      .clipExtent([
        [0, 0],
        [MAP_W, MAP_H],
      ])
      .fitExtent(
        [
          [20, 14],
          [MAP_W - 20, MAP_H - 14],
        ],
        view,
      );
    const path = geoPath(proj);
    const at = proj(centre) ?? [MAP_W / 2, MAP_H / 2];
    const circle = geoCircle()
      .center(centre)
      .radius(ring.radius * DEG)
      .precision(2)();
    return {
      grid: path(geoGraticule10()) ?? "",
      // Every country as land first (a parent's territories stay green), then the pick in gold.
      land: atlas.features.map((x) => path(x) ?? "").join(""),
      me: frame.shape ? (path(frame.shape) ?? "") : "",
      borders: path(atlas.borders) ?? "",
      dot: frame.shape ? null : at,
      ring: proj.scale() * Math.sin(ring.radius) < MIN_RING ? `M${at[0] - MIN_RING} ${at[1]}a${MIN_RING} ${MIN_RING} 0 1 0 ${MIN_RING * 2} 0a${MIN_RING} ${MIN_RING} 0 1 0 ${-MIN_RING * 2} 0Z` : (path(circle) ?? ""),
    };
  }, [atlas, num]);
  const t = useT();
  const { locale } = useLocale();
  const m = t.redeem.map;
  const name = nameOf(num, locale);
  const lit = city.trim().length > 0;
  return (
    <figure className="rd-map" data-lit={lit || undefined}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="rd-map-svg" role="img" aria-label={name ? fmt(m.cardLabel, { country: name }) : m.cardLabelEmpty}>
        <rect width={MAP_W} height={MAP_H} className="rd-map-sea" />
        {drawn && (
          <>
            <path d={drawn.grid} className="rd-map-grid" />
            <path d={drawn.land} className="rd-map-land" />
            {drawn.me && <path d={drawn.me} className="rd-map-me" />}
            <path d={drawn.borders} className="rd-map-borders" />
            {drawn.dot && <circle cx={drawn.dot[0]} cy={drawn.dot[1]} r={5} className="rd-map-me" />}
            <path d={drawn.ring} className="rd-map-ring-halo" />
            <path key={num} d={drawn.ring} className="rd-map-ring" />
          </>
        )}
      </svg>
      {!drawn && <div className="rd-map-load">{num ? m.loading : m.pickFirst}</div>}
      <figcaption className="rd-map-cap">
        <span className="rd-label">{m.hometown}</span>
        <b>{lit ? fmt(t.redeem.place, { city: city.trim(), country: name }) : name || m.notPicked}</b>
      </figcaption>
    </figure>
  );
}
