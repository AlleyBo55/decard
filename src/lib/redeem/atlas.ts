import { geoCentroid, geoContains, geoDistance, geoInterpolate } from "d3-geo";
import type { Feature, FeatureCollection, Geometry, MultiLineString, MultiPolygon, Polygon } from "geojson";
import type { GeometryCollection, Topology } from "topojson-specification";
import { COUNTRIES } from "./countries";
import { PLACES } from "./places";

// The world map behind the region, hometown, review and journey steps: Natural Earth 1:110m
// (world-atlas, ~108 KB), loaded on demand the first time a map mounts, never on first paint.
// Feature ids are ISO numeric codes, the same as Country.num.

export type LonLat = readonly [number, number];
export type CountryFeature = Feature<Polygon | MultiPolygon, { name?: string }> & { id?: string };

export interface Atlas {
  /** Every 110m shape, selectable or not (a few disputed areas carry no id). */
  features: CountryFeature[];
  byNum: Map<string, CountryFeature>;
  borders: MultiLineString;
  coast: MultiLineString;
  /** Provider countries too small for 110m, drawn as dots at their place. */
  dots: { num: string; at: LonLat; enclave: boolean }[];
}

/**
 * Where the parcels leave from on the map. Slabz ships from its US vault (its domestic rate is
 * the cheapest); this is a map landmark, not the vault's street address.
 */
export const VAULT_AT: LonLat = [-84, 36];

/** A mutable copy of a place, the shape d3 takes. */
export const ll = (l: LonLat): [number, number] => [l[0], l[1]];

let loading: Promise<Atlas> | null = null;

export function loadAtlas(): Promise<Atlas> {
  loading ??= (async () => {
    const [{ feature, mesh }, mod] = await Promise.all([import("topojson-client"), import("world-atlas/countries-110m.json")]);
    const topo = ((mod as { default?: unknown }).default ?? mod) as Topology<{ countries: GeometryCollection<{ name?: string }> }>;
    const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry, { name?: string }>;
    const features = fc.features.filter((f): f is CountryFeature => f.geometry?.type === "Polygon" || f.geometry?.type === "MultiPolygon");
    const byNum = new Map<string, CountryFeature>();
    for (const f of features) if (typeof f.id === "string") byNum.set(f.id, f);
    const borders = mesh(topo, topo.objects.countries, (a, b) => a !== b) as MultiLineString;
    const coast = mesh(topo, topo.objects.countries, (a, b) => a === b) as MultiLineString;
    const dots: Atlas["dots"] = [];
    for (const c of COUNTRIES) {
      if (byNum.has(c.num)) continue;
      const at = PLACES[c.num];
      if (!at) continue;
      // Dots inside another shape (Vatican City, Monaco, San Marino) only show up close in, so a
      // tap on Italy or France never lands on them by accident.
      dots.push({ num: c.num, at, enclave: features.some((f) => geoContains(f, ll(at))) });
    }
    return { features, byNum, borders, coast, dots };
  })().catch((e) => {
    loading = null;
    throw e;
  });
  return loading;
}

// ------------------------------------------------------------------ framing a destination
// Every map marks the chosen country as a whole: its own shape lit and one circle around all of
// it, islands included. No map zooms into one part of a country or pins a point inside it: the
// address isn't placed on the map, so a pin would claim a spot we don't know (Indonesia's largest
// island, Kalimantan, is under a third of Indonesia).

/**
 * Natural Earth 1:110m draws two overseas territories into their parent's shape, while the
 * shipping provider lists them as destinations of their own: French Guiana inside France and
 * Svalbard inside Norway. Those parts stay out of the parent's frame.
 */
const ELSEWHERE: Record<string, (centre: LonLat) => boolean> = {
  "250": ([lon]) => lon < -30,
  "578": ([, lat]) => lat > 74,
};

export interface Frame {
  /** The destination's own area, lit on the maps. Null for places too small for the 110m map. */
  shape: Feature<MultiPolygon> | null;
  /** The centre of the smallest circle around all of it. */
  center: LonLat;
  /** That circle's radius in radians: 0 for a place drawn as a dot. */
  radius: number;
}

/** The circle the maps draw around a destination, in radians. */
export interface Ring {
  center: LonLat;
  radius: number;
}

const RAD = Math.PI / 180;

/**
 * The smallest circle on the sphere around `points` (Bădoiu–Clarkson: start at their mean
 * direction, then step toward the farthest point a shrinking share of the way). The radius is
 * measured last, so the circle holds every point even if the steps haven't fully settled.
 */
export function encircle(points: readonly LonLat[]): { center: LonLat; radius: number } {
  let x = 0;
  let y = 0;
  let z = 0;
  for (const [lon, lat] of points) {
    x += Math.cos(lat * RAD) * Math.cos(lon * RAD);
    y += Math.cos(lat * RAD) * Math.sin(lon * RAD);
    z += Math.sin(lat * RAD);
  }
  let center: [number, number] = Math.hypot(x, y, z) > 1e-9 ? [Math.atan2(y, x) / RAD, Math.atan2(z, Math.hypot(x, y)) / RAD] : ll(points[0]);
  for (let i = 1; i <= 120; i++) {
    let far = points[0];
    let farD = -1;
    for (const p of points) {
      const d = geoDistance(center, ll(p));
      if (d > farD) {
        farD = d;
        far = p;
      }
    }
    center = geoInterpolate(center, ll(far))(1 / (i + 1));
  }
  let radius = 0;
  for (const p of points) radius = Math.max(radius, geoDistance(center, ll(p)));
  return { center, radius };
}

const frames = new Map<string, Frame | null>();

/** How a destination is framed on every map, worked out once per destination. */
export function frameOf(atlas: Atlas, num: string): Frame | null {
  const known = frames.get(num);
  if (known !== undefined) return known;
  let frame: Frame | null = null;
  const f = atlas.byNum.get(num);
  if (f) {
    const elsewhere = ELSEWHERE[num];
    const parts = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    const kept = elsewhere ? parts.filter((rings) => !elsewhere(geoCentroid({ type: "Polygon", coordinates: rings }))) : parts;
    const own = kept.length ? kept : parts;
    const { center, radius } = encircle(own.flatMap((rings) => rings[0].map((p): LonLat => [p[0], p[1]])));
    frame = { shape: { type: "Feature", properties: {}, geometry: { type: "MultiPolygon", coordinates: own } }, center, radius };
  } else if (PLACES[num]) {
    frame = { shape: null, center: PLACES[num], radius: 0 };
  }
  frames.set(num, frame);
  return frame;
}

/** The circle around a destination: its frame plus a margin. Maps give tiny places a minimum size. */
export const ringOf = (f: Frame): Ring => ({ center: f.center, radius: f.radius * 1.12 + 0.6 * RAD });

/**
 * Where a route lands: the middle of the destination's circle. The circle marks the country, not
 * this point. A domestic route (the vault's own country) would have nowhere to go, so it hops a
 * little west of the vault instead.
 */
export function routeEnd(f: Frame): LonLat {
  const domestic = f.shape ? geoContains(f.shape, ll(VAULT_AT)) : geoDistance(ll(f.center), ll(VAULT_AT)) < 0.05;
  return domestic ? [VAULT_AT[0] - 14, VAULT_AT[1] + 4] : f.center;
}
