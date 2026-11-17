// Mirrors Slabz pack art (Decard is a Slabz partner) into public/rip/packs as small WebPs, so the
// rip page never hotlinks their CDN or ships their 200 KB originals. Re-run when Slabz adds packs:
//   node scripts/rip-art.mjs
// Writes <type>.webp (stage, 840px tall), <type>-s.webp (pickers, 240px tall) and
// src/lib/rip/art.json, the list of pack types that have art. Types match the Partner API's
// ccPackType: slabz_one-piece_50 becomes onepiece_50.
import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

const API = "https://api-v2.slabz.com/api/v1/packs";
const OUT = "public/rip/packs";
const UA = { "User-Agent": "decard-art/1 (+https://github.com/AlleyBo55/decard)" };

const res = await fetch(API, { headers: UA });
if (!res.ok) throw new Error(`packs: HTTP ${res.status}`);
const { data } = await res.json();
mkdirSync(OUT, { recursive: true });

const manifest = {};
let bytes = 0;
for (const p of data.sort((a, b) => a.key.localeCompare(b.key))) {
  const type = p.key.replace(/^slabz_/, "").replace(/-/g, "");
  // "flat" is the rendered foil wrapper; packs without one fall back to the printed front.
  const src = p.flatArtUrl ?? p.frontArtUrl;
  if (!/^[a-z0-9_]+$/.test(type) || !src) continue;
  const raw = Buffer.from(await (await fetch(src, { headers: UA })).arrayBuffer());
  const base = sharp(raw).trim({ threshold: 4 });
  // 720px covers the stage at 2x; the pickers only ever draw ~90px.
  const big = await base.clone().resize({ height: 720, fit: "inside", withoutEnlargement: true }).webp({ quality: 74, alphaQuality: 80, effort: 6 }).toBuffer({ resolveWithObject: true });
  const small = await base.clone().resize({ height: 200, fit: "inside" }).webp({ quality: 70, alphaQuality: 70, effort: 6 }).toBuffer();
  writeFileSync(`${OUT}/${type}.webp`, big.data);
  writeFileSync(`${OUT}/${type}-s.webp`, small);
  bytes += big.data.length + small.length;
  // A content hash in the URL lets the files be cached for a year (next.config.ts).
  const v = createHash("sha1").update(big.data).update(small).digest("hex").slice(0, 8);
  manifest[type] = { w: big.info.width, h: big.info.height, v, accent: await accent(base.clone()) };
  console.log(type.padEnd(22), `${big.info.width}x${big.info.height}`, `${Math.round(big.data.length / 1024)}KB + ${Math.round(small.length / 1024)}KB`, p.flatArtUrl ? "" : "(front art)");
}
writeFileSync("src/lib/rip/art.json", JSON.stringify(manifest) + "\n");

/** The art's vivid colour: opaque pixels averaged, weighted by saturation × brightness. */
async function accent(img) {
  const { data, info } = await img.resize(24, 40, { fit: "fill" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let r = 0, g = 0, b = 0, w = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] < 200) continue;
    const [R, G, B] = [data[i], data[i + 1], data[i + 2]];
    const max = Math.max(R, G, B), min = Math.min(R, G, B);
    const weight = (max === 0 ? 0 : (max - min) / max) * (max / 255) + 0.02;
    r += R * weight; g += G * weight; b += B * weight; w += weight;
  }
  const hex = (v) => Math.round(v / w).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}
console.log(`${Object.keys(manifest).length} packs, ${Math.round(bytes / 1024)} KB total`);
