import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fmtPrice, fmtShort, fmtStamp, fmtUsdShort } from "@/components/token/format";
import { COIN, FLAME, spritePaths } from "@/components/token/sprites";
import { CARDS_MAX_SUPPLY, getCardsFlywheel, getCardsMarket, getCoinbaseStatus } from "@/lib/cards-token";

// Share card for /cards-token: text and flat shapes only, so the PNG stays
// small. Rebuilt at most every 10 minutes from the same cached loaders as the page.
export const runtime = "nodejs";
export const revalidate = 600;
export const alt = "CARDS price, 30-day buybacks, CARDS burned and Coinbase status";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#29263d";
const CREAM = "#f4efe4";
const PALETTE: Record<string, string> = {
  k: INK,
  g: "#ffcb05",
  G: "#e0a800",
  r: "#e3350d",
  R: "#b8290a",
  w: "#fbf8f2",
  s: "#ddd3be",
  h: "#ffffff",
  o: "#ee8130",
  y: "#ffe066",
};

// Satori rules: every multi-child element needs display:flex, no calc().
export default async function Image() {
  const dir = join(process.cwd(), "src/app/og");
  const [press, nunito, market, flywheel, coinbase] = await Promise.all([
    readFile(join(dir, "PressStart2P.woff")),
    readFile(join(dir, "Nunito-800.woff")),
    getCardsMarket(),
    getCardsFlywheel(),
    getCoinbaseStatus(),
  ]);

  const change = market?.change24h ?? null;
  const up = (change ?? 0) >= 0;
  // ASCII minus: the subset share fonts have no U+2212.
  const changeText = change == null ? "" : `${up ? "+" : "-"}${Math.abs(change * 100).toFixed(2)}% 24h`;
  const burned = market?.totalSupply != null ? Math.max(0, CARDS_MAX_SUPPLY - market.totalSupply) : null;
  const coinbaseText = coinbase?.trading ? "Trading" : coinbase?.productId ? "Listed" : "On roadmap";
  const stats: [string, string][] = [
    ["30D BUYBACKS", fmtUsdShort(flywheel?.buyback?.totals["30d"])],
    ["CARDS BURNED", fmtShort(burned)],
    ["COINBASE", coinbaseText],
  ];
  const sprite = [...Object.entries(spritePaths(FLAME)), ...Object.entries(spritePaths(COIN, 10))];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: CREAM, fontFamily: "Nunito", color: INK, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, background: "#e3350d", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 70px", flex: 1 }}>
          <div style={{ display: "flex", fontFamily: "Press", fontSize: 20, color: "#b8290a" }}>▶ COLLECTOR CRYPT · SOLANA TOKEN</div>
          <div style={{ display: "flex", fontFamily: "Press", fontSize: 104, marginTop: 30, color: "#ffcb05", textShadow: "6px 6px 0 #1d5690" }}>
            $CARDS
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
            <div style={{ display: "flex", fontSize: 76, lineHeight: 1 }}>{market ? fmtPrice(market.price) : "Price unavailable"}</div>
            {changeText && (
              <div
                style={{
                  display: "flex",
                  marginLeft: 22,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: `3px solid ${INK}`,
                  background: up ? "#3dbe6e" : "#c0392b",
                  color: up ? INK : "#ffffff",
                  fontSize: 30,
                }}
              >
                {changeText}
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 36 }}>
            {stats.map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px 22px",
                  borderRadius: 16,
                  border: `3px solid ${INK}`,
                  background: "#fbf8f2",
                  boxShadow: `0 6px 0 ${INK}`,
                }}
              >
                <div style={{ display: "flex", fontFamily: "Press", fontSize: 14, color: "#67627f" }}>{label}</div>
                <div style={{ display: "flex", fontSize: 44, marginTop: 10, lineHeight: 1 }}>{value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, marginTop: 34, color: "#4f4b68" }}>
            {`decard.fun/cards-token · ${market ? fmtStamp(market.updatedAt) : "live data"} · not financial advice`}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 330 }}>
          <svg width="208" height="338" viewBox="0 0 16 26" shapeRendering="crispEdges">
            {sprite.map(([c, d], i) => (
              <path key={`${c}${i}`} d={d} fill={PALETTE[c]} />
            ))}
          </svg>
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
}
