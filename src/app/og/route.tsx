import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";
// Drawn once at build and served from the build output: the image never
// changes between deploys, and a render cost ~57 ms of CPU per request.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };
const INK = "#29263d";
const CREAM = "#f4efe4";

const TYPES = [
  ["Pokémon", "#F7D02C"],
  ["One Piece", "#6390F0"],
  ["Riftbound", "#6F35FC"],
  ["Dragon Ball", "#C22E28"],
  ["Lorcana", "#D685AD"],
] as const;

// Slabz pack art mirrored by scripts/rip-art.mjs, fanned on the right. Listed back to front;
// cx/cy is each pack's centre inside the 510px-wide right column.
const PACKS = [
  { type: "onepiece_50", height: 318, cx: 128, cy: 340, rotate: -12 },
  { type: "dragonball_50", height: 318, cx: 382, cy: 340, rotate: 12 },
  { type: "pokemon_5000", height: 364, cx: 255, cy: 322, rotate: 0 },
] as const;

/** Pack art as a PNG data URL at the height it is drawn. The bundled resvg draws WebP as blank, so sharp converts it. */
async function packArt(pack: (typeof PACKS)[number]) {
  const { data, info } = await sharp(join(process.cwd(), "public/rip/packs", `${pack.type}.webp`))
    .resize({ height: pack.height })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { ...pack, width: info.width, src: `data:image/png;base64,${data.toString("base64")}` };
}

// Satori rules: every multi-child element needs display:flex, no calc().
// Fonts and pack art load from disk so the image renders offline too.
export async function GET() {
  const dir = join(process.cwd(), "src/app/og");
  const [press, nunito, packs] = await Promise.all([
    readFile(join(dir, "PressStart2P.woff")),
    readFile(join(dir, "Nunito-800.woff")),
    Promise.all(PACKS.map(packArt)),
  ]);

  const png = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: CREAM,
          fontFamily: "Nunito",
          color: INK,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, background: "#e3350d", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px 0 64px", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "Press", fontSize: 22, color: "#b8290a" }}>▶ SOLANA · ALL IN ONE</div>
          <div style={{ display: "flex", fontFamily: "Press", fontSize: 92, marginTop: 34, color: "#ffcb05", textShadow: `6px 6px 0 #1d5690` }}>
            DECARD
          </div>
          {/* The three things the site does, in the order a card lives them. */}
          <div style={{ display: "flex", gap: 16, fontSize: 60, marginTop: 30, lineHeight: 1.1 }}>
            <span style={{ color: "#e3350d" }}>Rip.</span>
            <span style={{ color: "#1d5690" }}>Scan.</span>
            <span>Redeem.</span>
          </div>
          {/* One line: the text column is ~630px wide. */}
          <div style={{ display: "flex", fontSize: 28, marginTop: 18, color: "#4f4b68" }}>
            Real graded cards, from pack to doorstep.
          </div>
          {/* Chips keep their size and wrap; shrinking them squeezed the labels out of the pills. */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 34 }}>
            {TYPES.map(([label, color]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: `3px solid ${INK}`,
                  background: color,
                  fontSize: 22,
                  color: color === "#6F35FC" || color === "#C22E28" ? "#ffffff" : INK,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        {/* Fanned packs */}
        <div style={{ display: "flex", position: "relative", width: 510, marginRight: 20, flexShrink: 0 }}>
          {packs.map((p) => (
            <img
              key={p.type}
              src={p.src}
              width={p.width}
              height={p.height}
              alt=""
              style={{
                position: "absolute",
                left: p.cx - p.width / 2,
                top: p.cy - p.height / 2,
                transform: `rotate(${p.rotate}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Press", data: press, weight: 400, style: "normal" },
        { name: "Nunito", data: nunito, weight: 800, style: "normal" },
      ],
    },
  );
  // JPEG, as og/card does: the pack art makes the PNG ~400 KB, over what WhatsApp previews take.
  const jpeg = new Uint8Array(await sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 82 }).toBuffer());
  return new Response(jpeg, {
    headers: {
      "Content-Type": "image/jpeg",
      // Browsers keep it a week; a CDN keeps it until a deploy purges it, as Next does for static pages.
      "Cache-Control": "public, max-age=604800, s-maxage=31536000, immutable",
    },
  });
}
