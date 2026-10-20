import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Cardex graded card scanner on Solana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (next/og) rules: every multi-child element needs an explicit display,
// and calc() is unsupported. Keep the markup flat and flex-based.
export async function GET() {
  const font = await readFile(join(process.cwd(), "src/app/og/Geist-Regular.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0c1118 0%, #161e2a 60%, #1e2836 100%)",
          color: "#eef3fa",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Poké ball: two stacked halves + a band row, all flex, no calc */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "116px",
              height: "116px",
              borderRadius: "58px",
              overflow: "hidden",
              border: "6px solid #0c1118",
            }}
          >
            <div style={{ display: "flex", flex: 1, background: "#c0353f" }} />
            <div style={{ display: "flex", height: "10px", background: "#0c1118" }} />
            <div style={{ display: "flex", flex: 1, background: "#eef3fa" }} />
          </div>
          <div style={{ display: "flex", fontSize: "92px", fontWeight: 800, marginLeft: "28px" }}>
            CARD
            <span style={{ color: "#f6c445" }}>EX</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: "40px", marginTop: "36px" }}>
          The Pokédex for graded cards on Solana
        </div>
        <div style={{ display: "flex", fontSize: "26px", marginTop: "16px", color: "#93a3bb" }}>
          Live scanner · on-chain trade tape · wallet tracer · keyless &amp; open-source
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: font, weight: 400, style: "normal" }] },
  );
}
