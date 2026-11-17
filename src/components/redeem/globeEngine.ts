import { geoCircle, geoContains, geoDistance, geoGraticule10, geoInterpolate, geoOrthographic, geoPath, type GeoPermissibleObjects, type GeoProjection } from "d3-geo";
import { frameOf, ringOf, VAULT_AT, type Atlas, type LonLat, type Ring } from "@/lib/redeem/atlas";
import { countryByNum } from "@/lib/redeem/names";

// The globe's canvas engine: an orthographic Natural Earth map that redraws on requestAnimationFrame
// only while something changes (a drag, a spin, a hover), never in an idle loop. Markers are HTML
// elements it moves with transforms, so the art stays crisp and React never re-renders per frame.

export interface View {
  lon: number;
  lat: number;
  zoom: number;
}

export interface Overlays {
  vault: HTMLElement | null;
  slab: HTMLElement | null;
  tip: HTMLElement | null;
}

export interface EngineEvents {
  onPick: (num: string) => void;
  onHover: (num: string | null) => void;
  /** The country under the centre after a keyboard move, for screen readers. */
  onCentre: (num: string | null) => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;
const GRATICULE = geoGraticule10();
const SPHERE: GeoPermissibleObjects = { type: "Sphere" };
const HALF_PI = Math.PI / 2;
const DEG = 180 / Math.PI;
/** The smallest circle drawn around a destination, in screen pixels: small islands stay findable. */
const MIN_RING_PX = 14;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const wrapLon = (lon: number) => ((((lon + 180) % 360) + 360) % 360) - 180;
/** A mutable copy of a place, for d3. */
const P = (l: LonLat): [number, number] => [l[0], l[1]];

export class GlobeEngine {
  private ctx: CanvasRenderingContext2D;
  private proj: GeoProjection = geoOrthographic().precision(0.6);
  private path: ReturnType<typeof geoPath>;
  private atlas: Atlas | null = null;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private baseR = 100;
  view: View = { lon: 10, lat: 20, zoom: 1 };
  private selected: string | null = null;
  private hover: string | null = null;
  private home: LonLat | null = null;
  private travelShown = 0;
  private travelTarget: number | null = null;
  private frame = 0;
  private anim = 0;
  /** How far the ring around a new pick has drawn in, 0 to 1. */
  private ringIn = 1;
  private ringAnim = 0;
  private drag: { id: number; x: number; y: number; t: number; moved: number; vx: number; vy: number; lastT: number } | null = null;
  private pinch: { d0: number; z0: number } | null = null;
  private pointers = new Map<number, { x: number; y: number }>();
  private reduced = false;
  private dead = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private overlays: Overlays,
    private events: EngineEvents,
    private pickable: boolean,
  ) {
    this.ctx = canvas.getContext("2d", { alpha: true })!;
    this.path = geoPath(this.proj, this.ctx);
    this.reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.frame);
    cancelAnimationFrame(this.anim);
    cancelAnimationFrame(this.ringAnim);
  }

  setAtlas(atlas: Atlas) {
    this.atlas = atlas;
    this.request();
  }

  resize(w: number, h: number) {
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = w;
    this.h = h;
    this.baseR = Math.max(40, Math.min(w, h) / 2 - 10);
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.request();
  }

  setSelected(num: string | null) {
    if (num === this.selected) return this.request();
    this.selected = num;
    // The ring closes in around a new pick: a short one-off, instant under reduced motion.
    cancelAnimationFrame(this.ringAnim);
    this.ringIn = this.reduced || !num ? 1 : 0;
    if (this.ringIn < 1) {
      const start = performance.now();
      const step = (now: number) => {
        if (this.dead) return;
        this.ringIn = Math.min(1, (now - start) / 420);
        this.draw();
        if (this.ringIn < 1) this.ringAnim = requestAnimationFrame(step);
      };
      this.ringAnim = requestAnimationFrame(step);
    }
    this.request();
  }

  setRoute(home: LonLat | null) {
    this.home = home;
    this.request();
  }

  /** Moves the travelling slab to `t` (0 at the vault, 1 at home), gliding unless motion is reduced. */
  setTravel(t: number | null) {
    this.travelTarget = t;
    if (t === null) return this.request();
    if (this.reduced) {
      this.travelShown = t;
      return this.request();
    }
    const from = this.travelShown;
    const start = performance.now();
    const step = (now: number) => {
      if (this.dead) return;
      const k = Math.min(1, (now - start) / 1600);
      this.travelShown = from + (t - from) * ease(k);
      this.draw();
      if (k < 1) this.anim = requestAnimationFrame(step);
    };
    cancelAnimationFrame(this.anim);
    this.anim = requestAnimationFrame(step);
  }

  setView(v: Partial<View>) {
    this.view = { ...this.view, ...v };
    this.view.lat = clamp(this.view.lat, -80, 80);
    this.view.lon = wrapLon(this.view.lon);
    this.view.zoom = clamp(this.view.zoom, MIN_ZOOM, MAX_ZOOM);
    this.request();
  }

  /** Turns the globe to `to`, flying out a little on long trips. Instant under reduced motion. */
  spinTo(to: LonLat, zoom = this.view.zoom, ms?: number) {
    cancelAnimationFrame(this.anim);
    const from: [number, number] = [this.view.lon, this.view.lat];
    const target: [number, number] = [to[0], clamp(to[1], -80, 80)];
    const dist = geoDistance(from, target);
    const z0 = this.view.zoom;
    const z1 = clamp(zoom, MIN_ZOOM, MAX_ZOOM);
    if (this.reduced || (dist < 0.002 && Math.abs(z1 - z0) < 0.01)) return this.setView({ lon: target[0], lat: target[1], zoom: z1 });
    const along = geoInterpolate(from, target);
    const dur = ms ?? clamp(dist * 650, 420, 1500);
    const dip = Math.min(0.45, dist / 3);
    const start = performance.now();
    const step = (now: number) => {
      if (this.dead) return;
      const k = Math.min(1, (now - start) / dur);
      const e = ease(k);
      const [lon, lat] = along(e);
      const z = (z0 + (z1 - z0) * e) * (1 - dip * Math.sin(Math.PI * e));
      this.view = { lon: wrapLon(lon), lat, zoom: Math.max(0.8, z) };
      this.draw();
      if (k < 1) this.anim = requestAnimationFrame(step);
      else this.setView({ zoom: z1 });
    };
    this.anim = requestAnimationFrame(step);
  }

  zoomBy(f: number) {
    this.spinTo([this.view.lon, this.view.lat], this.view.zoom * f, 260);
  }

  // ------------------------------------------------------------------ input

  pointerDown(e: PointerEvent) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    cancelAnimationFrame(this.anim);
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch {
      // A pointer the browser doesn't track: the drag still follows it over the canvas.
    }
    const p = this.local(e);
    this.pointers.set(e.pointerId, p);
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinch = { d0: Math.hypot(a.x - b.x, a.y - b.y) || 1, z0: this.view.zoom };
      this.drag = null;
      return;
    }
    const now = performance.now();
    this.drag = { id: e.pointerId, x: p.x, y: p.y, t: now, moved: 0, vx: 0, vy: 0, lastT: now };
    this.canvas.dataset.dragging = "";
  }

  pointerMove(e: PointerEvent) {
    const p = this.local(e);
    if (this.pointers.has(e.pointerId)) this.pointers.set(e.pointerId, p);
    if (this.pinch && this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.setView({ zoom: this.pinch.z0 * (Math.hypot(a.x - b.x, a.y - b.y) / this.pinch.d0) });
      return;
    }
    const d = this.drag;
    if (d && d.id === e.pointerId) {
      const dx = p.x - d.x;
      const dy = p.y - d.y;
      const now = performance.now();
      const dt = Math.max(1, now - d.lastT);
      const r = this.baseR * this.view.zoom;
      const dLon = (-dx / r) * DEG;
      const dLat = (dy / r) * DEG;
      d.moved += Math.abs(dx) + Math.abs(dy);
      // A short running average, so a flick keeps spinning at the speed it left the finger.
      d.vx = d.vx * 0.6 + (dLon / dt) * 0.4;
      d.vy = d.vy * 0.6 + (dLat / dt) * 0.4;
      d.x = p.x;
      d.y = p.y;
      d.lastT = now;
      this.setView({ lon: this.view.lon + dLon, lat: this.view.lat + dLat });
      this.hideTip();
      return;
    }
    if (e.pointerType === "mouse" && this.pickable && this.pointers.size === 0) this.hoverAt(p.x, p.y);
  }

  pointerUp(e: PointerEvent) {
    const d = this.drag;
    this.pointers.delete(e.pointerId);
    if (this.pinch) {
      if (this.pointers.size < 2) this.pinch = null;
      this.drag = null;
      delete this.canvas.dataset.dragging;
      return;
    }
    if (!d || d.id !== e.pointerId) return;
    this.drag = null;
    delete this.canvas.dataset.dragging;
    const p = this.local(e);
    const quick = performance.now() - d.t < 450;
    if (d.moved < 7 && quick) {
      if (this.pickable) {
        const num = this.pickAt(p.x, p.y);
        if (num) this.events.onPick(num);
      }
      return;
    }
    // Let go mid-flick: coast, slowing down.
    if (!this.reduced && performance.now() - d.lastT < 80 && Math.hypot(d.vx, d.vy) > 0.02) this.coastFrom(d.vx, d.vy);
  }

  pointerCancel(e: PointerEvent) {
    this.pointers.delete(e.pointerId);
    this.pinch = null;
    this.drag = null;
    delete this.canvas.dataset.dragging;
  }

  pointerLeave() {
    if (this.hover !== null) {
      this.hover = null;
      this.events.onHover(null);
      this.request();
    }
    this.hideTip();
  }

  /** Arrow keys turn, + and - zoom, Enter picks the country in the centre. True when handled. */
  key(e: KeyboardEvent): boolean {
    const step = 14 / this.view.zoom;
    const go = (lon: number, lat: number, zoom = this.view.zoom) => {
      this.spinTo([this.view.lon + lon, this.view.lat + lat], zoom, 220);
      window.setTimeout(() => !this.dead && this.events.onCentre(this.pickAt(this.w / 2, this.h / 2)), 260);
    };
    switch (e.key) {
      case "ArrowLeft":
        go(-step, 0);
        return true;
      case "ArrowRight":
        go(step, 0);
        return true;
      case "ArrowUp":
        go(0, step * 0.7);
        return true;
      case "ArrowDown":
        go(0, -step * 0.7);
        return true;
      case "+":
      case "=":
        go(0, 0, this.view.zoom * 1.5);
        return true;
      case "-":
      case "_":
        go(0, 0, this.view.zoom / 1.5);
        return true;
      case "Enter":
      case " ": {
        if (!this.pickable) return false;
        const num = this.pickAt(this.w / 2, this.h / 2);
        if (num) this.events.onPick(num);
        return true;
      }
    }
    return false;
  }

  // ------------------------------------------------------------------ picking

  /** The provider country under a point, dots first (they are the small places). */
  pickAt(x: number, y: number): string | null {
    const a = this.atlas;
    if (!a || Math.hypot(x - this.w / 2, y - this.h / 2) > Math.min(this.w, this.h) / 2) return null;
    this.project();
    const ll = this.proj.invert?.([x, y]);
    if (!ll || !Number.isFinite(ll[0]) || !Number.isFinite(ll[1])) return null;
    const centre: [number, number] = [this.view.lon, this.view.lat];
    if (geoDistance(ll, centre) > HALF_PI) return null;
    let best: string | null = null;
    let bestD = (this.coarse() ? 13 : 8) ** 2;
    for (const d of a.dots) {
      if (d.enclave && this.view.zoom < 3) continue;
      if (geoDistance(P(d.at), centre) > HALF_PI - 0.02) continue;
      const pt = this.proj(P(d.at));
      if (!pt) continue;
      const dd = (pt[0] - x) ** 2 + (pt[1] - y) ** 2;
      if (dd < bestD) {
        bestD = dd;
        best = d.num;
      }
    }
    if (best) return best;
    for (const f of a.features) if (f.id && countryByNum(f.id) && geoContains(f, ll)) return f.id;
    return null;
  }

  private hoverAt(x: number, y: number) {
    const num = this.pickAt(x, y);
    if (num !== this.hover) {
      this.hover = num;
      this.events.onHover(num);
      this.request();
    }
    this.canvas.style.cursor = num ? "pointer" : "grab";
    const tip = this.overlays.tip;
    if (tip) {
      tip.style.transform = `translate3d(${Math.round(x + 14)}px, ${Math.round(y + 14)}px, 0)`;
      if (num) tip.dataset.on = "";
      else delete tip.dataset.on;
    }
  }

  private hideTip() {
    if (this.overlays.tip) delete this.overlays.tip.dataset.on;
  }

  private coarse() {
    return typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches;
  }

  private coastFrom(vx: number, vy: number) {
    cancelAnimationFrame(this.anim);
    let last = performance.now();
    const step = (now: number) => {
      if (this.dead) return;
      const dt = Math.min(48, now - last);
      last = now;
      const decay = Math.exp(-dt / 420);
      vx *= decay;
      vy *= decay;
      this.view = { lon: wrapLon(this.view.lon + vx * dt), lat: clamp(this.view.lat + vy * dt, -80, 80), zoom: this.view.zoom };
      this.draw();
      if (Math.hypot(vx, vy) > 0.004) this.anim = requestAnimationFrame(step);
    };
    this.anim = requestAnimationFrame(step);
  }

  private local(e: PointerEvent) {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  // ------------------------------------------------------------------ drawing

  request() {
    if (this.frame || this.dead) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.draw();
    });
  }

  private project() {
    const r = this.baseR * this.view.zoom;
    this.proj
      .translate([this.w / 2, this.h / 2])
      .scale(r)
      .rotate([-this.view.lon, -this.view.lat, 0])
      .clipExtent([
        [-2, -2],
        [this.w + 2, this.h + 2],
      ]);
    return r;
  }

  draw() {
    if (this.dead || !this.w) return;
    const { ctx, w, h, dpr, path } = this;
    const r = this.project();
    const cx = w / 2;
    const cy = h / 2;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const sea = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.05, cx, cy, r);
    sea.addColorStop(0, "#2a63c2");
    sea.addColorStop(0.62, "#143a86");
    sea.addColorStop(1, "#0a1f52");
    ctx.beginPath();
    path(SPHERE);
    ctx.fillStyle = sea;
    ctx.fill();

    ctx.beginPath();
    path(GRATICULE);
    ctx.strokeStyle = "rgba(170, 210, 255, 0.11)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const a = this.atlas;
    const centre: [number, number] = [this.view.lon, this.view.lat];
    if (a) {
      ctx.beginPath();
      for (const f of a.features) path(f);
      ctx.fillStyle = "#46a173";
      ctx.fill();

      const fillOne = (num: string | null, color: string) => {
        const f = num ? a.byNum.get(num) : undefined;
        if (!f) return;
        ctx.beginPath();
        path(f);
        ctx.fillStyle = color;
        ctx.fill();
      };
      if (this.hover !== this.selected) fillOne(this.hover, "#7fd9a2");
      // The pick lights its own area only: France without French Guiana, a destination of its own.
      const picked = this.selected ? frameOf(a, this.selected) : null;
      if (picked?.shape) {
        ctx.beginPath();
        path(picked.shape);
        ctx.fillStyle = "#ffcb05";
        ctx.fill();
      }

      ctx.beginPath();
      path(a.borders);
      ctx.strokeStyle = "rgba(8, 28, 66, 0.6)";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.beginPath();
      path(a.coast);
      ctx.strokeStyle = "rgba(255, 243, 205, 0.55)";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      if (picked?.shape) {
        ctx.beginPath();
        path(picked.shape);
        ctx.strokeStyle = "#0b1430";
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }

      // Small places: a dot each, larger close in.
      const dotR = 2.4 + Math.min(3, this.view.zoom * 0.45);
      for (const d of a.dots) {
        if (d.enclave && this.view.zoom < 3 && d.num !== this.selected) continue;
        if (geoDistance(P(d.at), centre) > HALF_PI - 0.02) continue;
        const pt = this.proj(P(d.at));
        if (!pt) continue;
        const on = d.num === this.selected;
        const hot = d.num === this.hover;
        ctx.beginPath();
        ctx.arc(pt[0], pt[1], on ? dotR + 2 : hot ? dotR + 1 : dotR, 0, Math.PI * 2);
        ctx.fillStyle = on ? "#ffcb05" : hot ? "#7fd9a2" : "#9fe0b8";
        ctx.fill();
        ctx.lineWidth = 1.4;
        ctx.strokeStyle = "#0b1430";
        ctx.stroke();
      }

      // The destination as a whole: one circle around all of it, islands included.
      if (picked) this.drawRing(ringOf(picked), r);
    }

    // The route flies a little above the map: dotted all the way, solid where the slab has been.
    const home = this.home;
    if (home) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      this.arc(0, 1);
      ctx.strokeStyle = "rgba(255, 203, 5, 0.2)";
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.setLineDash([1, 7]);
      this.arc(0, 1);
      ctx.strokeStyle = "#fff1b0";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.setLineDash([]);
      if (this.travelTarget !== null && this.travelShown > 0.001) {
        this.arc(0, this.travelShown);
        ctx.strokeStyle = "#ffcb05";
        ctx.lineWidth = 3.6;
        ctx.stroke();
      }
    }

    if (this.view.zoom < 2.2) {
      const shine = ctx.createRadialGradient(cx - r * 0.45, cy - r * 0.5, 0, cx - r * 0.15, cy - r * 0.2, r * 1.15);
      shine.addColorStop(0, "rgba(255, 255, 255, 0.17)");
      shine.addColorStop(0.45, "rgba(255, 255, 255, 0.03)");
      shine.addColorStop(1, "rgba(3, 8, 30, 0.34)");
      ctx.beginPath();
      path(SPHERE);
      ctx.fillStyle = shine;
      ctx.fill();
    }
    ctx.beginPath();
    path(SPHERE);
    ctx.strokeStyle = "rgba(160, 205, 255, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Markers follow the map; the slab rides the raised route.
    const o = this.overlays;
    this.place(o.vault, home ? VAULT_AT : null);
    const slab = home && this.travelTarget !== null ? this.lifted(this.travelShown) : null;
    if (o.slab) {
      if (slab) {
        delete o.slab.dataset.hidden;
        o.slab.style.transform = `translate3d(${slab[0].toFixed(1)}px, ${slab[1].toFixed(1)}px, 0)`;
      } else o.slab.dataset.hidden = "";
    }
  }

  /** How high the route flies at its middle, as a share of the globe's radius. */
  private liftOf(): number {
    if (!this.home) return 0;
    return Math.min(0.13, 0.03 + geoDistance(P(VAULT_AT), P(this.home)) * 0.055);
  }

  /** The screen point `t` along the raised route, or null behind the globe or off the lens. */
  private lifted(t: number): [number, number] | null {
    if (!this.home) return null;
    const ll = geoInterpolate(P(VAULT_AT), P(this.home))(t);
    if (geoDistance(ll, [this.view.lon, this.view.lat]) > HALF_PI - 0.01) return null;
    const p = this.proj(ll);
    if (!p) return null;
    const k = 1 + this.liftOf() * Math.sin(Math.PI * t);
    const cx = this.w / 2;
    const cy = this.h / 2;
    const x = cx + (p[0] - cx) * k;
    const y = cy + (p[1] - cy) * k;
    return Math.hypot(x - cx, y - cy) > Math.min(this.w, this.h) / 2 - 2 ? null : [x, y];
  }

  /** Traces the raised route from t0 to t1, lifting the pen where it passes out of sight. */
  private arc(t0: number, t1: number) {
    const ctx = this.ctx;
    ctx.beginPath();
    let pen = false;
    const steps = Math.max(8, Math.round(72 * (t1 - t0)));
    for (let i = 0; i <= steps; i++) {
      const pt = this.lifted(t0 + ((t1 - t0) * i) / steps);
      if (!pt) {
        pen = false;
        continue;
      }
      if (pen) ctx.lineTo(pt[0], pt[1]);
      else ctx.moveTo(pt[0], pt[1]);
      pen = true;
    }
  }

  /**
   * The circle around the chosen destination, drawn in from a little wider when it's new. Too small
   * to read on screen (a small island, the globe zoomed out), it becomes a fixed-size circle on the
   * spot. The outline is drawn as a line, so where it passes behind the globe it ends at the rim
   * instead of running along it.
   */
  private drawRing(ring: Ring, globeR: number) {
    const { ctx, path } = this;
    const k = ease(this.ringIn);
    const grow = 1 + 0.35 * (1 - k);
    const radius = ring.radius * grow;
    const centre = P(ring.center);
    ctx.save();
    ctx.globalAlpha = k;
    ctx.beginPath();
    let outline: GeoPermissibleObjects | null = null;
    if (globeR * Math.sin(Math.min(HALF_PI, radius)) < MIN_RING_PX) {
      const pt = geoDistance(centre, [this.view.lon, this.view.lat]) < HALF_PI - 0.02 ? this.proj(centre) : null;
      if (!pt) return ctx.restore();
      ctx.arc(pt[0], pt[1], MIN_RING_PX * grow, 0, Math.PI * 2);
    } else {
      const circle = geoCircle().center(centre).radius(radius * DEG).precision(2)();
      path(circle);
      outline = { type: "LineString", coordinates: circle.coordinates[0] };
    }
    ctx.fillStyle = "rgba(255, 203, 5, 0.12)";
    ctx.fill();
    if (outline) {
      ctx.beginPath();
      path(outline);
    }
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(6, 14, 40, 0.55)";
    ctx.stroke();
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = "#ffcb05";
    ctx.stroke();
    ctx.restore();
  }

  private place(el: HTMLElement | null, at: LonLat | null) {
    if (!el) return;
    if (!at || geoDistance(P(at), [this.view.lon, this.view.lat]) > HALF_PI - 0.03) {
      el.dataset.hidden = "";
      return;
    }
    const pt = this.proj(P(at));
    // Close in, the map overflows its round lens: markers past the rim hide with it.
    if (!pt || Math.hypot(pt[0] - this.w / 2, pt[1] - this.h / 2) > Math.min(this.w, this.h) / 2 - 4) {
      el.dataset.hidden = "";
      return;
    }
    delete el.dataset.hidden;
    el.style.transform = `translate3d(${pt[0].toFixed(1)}px, ${pt[1].toFixed(1)}px, 0)`;
  }
}
