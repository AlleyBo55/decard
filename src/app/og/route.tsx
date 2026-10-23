import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

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

// Satori rules: every multi-child element needs display:flex, no calc().
// Fonts load from disk so the image renders offline too.
export async function GET() {
  const dir = join(process.cwd(), "src/app/og");
  const [press, nunito] = await Promise.all([
    readFile(join(dir, "PressStart2P.woff")),
    readFile(join(dir, "Nunito-800.woff")),
  ]);

  return new ImageResponse(
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "Press", fontSize: 22, color: "#b8290a" }}>▶ SOLANA · GRADED CARD DEX</div>
          <div style={{ display: "flex", fontFamily: "Press", fontSize: 92, marginTop: 34, color: "#ffcb05", textShadow: `6px 6px 0 #1d5690` }}>
            DECARD
          </div>
          <div style={{ display: "flex", fontSize: 52, marginTop: 30, lineHeight: 1.1 }}>Gotta scan &apos;em all.</div>
          {/* One line: the text column is ~630px wide, and the old longer line wrapped. */}
          <div style={{ display: "flex", fontSize: 28, marginTop: 18, color: "#4f4b68" }}>
            Listings · deal scores · bids · wallets
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
        {/* Poké Ball */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 430 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 330,
              height: 330,
              borderRadius: 165,
              overflow: "hidden",
              border: `16px solid ${INK}`,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", flex: 1, background: "#e3350d" }} />
            <div style={{ display: "flex", height: 16, background: INK }} />
            <div style={{ display: "flex", flex: 1, background: "#fbf8f2" }} />
            <div
              style={{
                position: "absolute",
                left: 99,
                top: 99,
                width: 100,
                height: 100,
                borderRadius: 50,
                background: "#fbf8f2",
                border: `16px solid ${INK}`,
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Press", data: press, weight: 400, style: "normal" },
        { name: "Nunito", data: nunito, weight: 800, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    },
  );
}
