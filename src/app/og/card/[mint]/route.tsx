import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { getCard, getCardMarket, getCardOffers } from "@/lib/cc";
import { cardImage } from "@/lib/constants";
import { fmtNum, fmtUsd, gradeShort, shortAddr, shortCardName, venueName } from "@/lib/format";
import { compactGrade, fmtMultiple, fmtPack, parsePack, pullMultiple, rarityTier, type RarityTier } from "@/lib/pull";
import type { CardDetail } from "@/lib/types";

// The pull receipt: a 1200x630 share image for one slab, with an optional
// pack price (?pack=50). Link previews on X, Discord, Telegram and Reddit use
// it through the card page's og:image. Satori rules: every multi-child
// element needs display:flex, and no calc().

export const runtime = "nodejs";

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

const INK = "#29263d";
const INK_SOFT = "#4f4b68";
const INK_MUTE = "#67627f";
const CREAM = "#f4efe4";
const CREAM_HI = "#fbf8f2";
const SAND = "#ddd3be";
const POKE = "#e3350d";
const POKE_DEEP = "#b8290a";
const PIKA = "#ffcb05";
const AZURE_DEEP = "#1d5690";

const TIER: Record<RarityTier, { bg: string; fg: string; glow: string }> = {
  LEGENDARY: { bg: "#6f35fc", fg: "#ffffff", glow: "#6f35fc" },
  RARE: { bg: POKE_DEEP, fg: "#ffffff", glow: POKE },
  UNCOMMON: { bg: "#2a75bb", fg: "#ffffff", glow: "#2a75bb" },
  COMMON: { bg: "#ece5d6", fg: INK_SOFT, glow: PIKA },
};

// A crawler waits a few seconds at most, so every optional read is time-boxed
// and the image renders without whatever didn't make it.
const MARKET_MS = 3_000;
const OFFERS_MS = 2_500;
const ART_MS = 4_000;

const CACHE = "public, s-maxage=600, stale-while-revalidate=86400";

let fonts: Promise<[Buffer, Buffer]> | null = null;
function loadFonts() {
  const dir = join(process.cwd(), "src/app/og");
  fonts ??= Promise.all([readFile(join(dir, "PressStart2P.woff")), readFile(join(dir, "Nunito-800.woff"))]).catch((e) => {
    fonts = null;
    throw e;
  });
  return fonts;
}

/** Resolves to null on failure or after `ms`, whichever comes first. */
function within<T>(work: Promise<T>, ms: number): Promise<T | null> {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), ms);
    work.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      () => {
        clearTimeout(timer);
        resolve(null);
      },
    );
  });
}

/**
 * Slab photo as a JPEG data URL. Collector Crypt serves WebP only and the
 * bundled resvg draws WebP as blank, so sharp converts it. The small variant
 * (337px wide) already matches the 300px slab in the image.
 */
async function slabArt(card: CardDetail): Promise<string | null> {
  const res = await fetch(cardImage(card.nftAddress, "front", 337, { images: card.images }), {
    signal: AbortSignal.timeout(ART_MS),
    next: { revalidate: 86_400 },
  });
  if (!res.ok) return null;
  const jpeg = await sharp(Buffer.from(await res.arrayBuffer()))
    .resize({ width: 400, withoutEnlargement: true })
    .jpeg({ quality: 84 })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
}

/** "OCT 26 2026 14:05 UTC". */
function stampTime(d: Date) {
  const month = d.toLocaleString("en", { month: "short", timeZone: "UTC" }).toUpperCase();
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${month} ${d.getUTCDate()} ${d.getUTCFullYear()} ${hh}:${mm} UTC`;
}

/** Name size by length, so long names still fit two lines. */
function nameSize(name: string) {
  if (name.length <= 16) return 64;
  if (name.length <= 24) return 54;
  if (name.length <= 34) return 46;
  return 38;
}

/** Hero letters are pulled 0.14em together: Press Start 2P gives "." a full cell. */
const HERO_TRACK = 0.14;

/** Press Start 2P is monospaced at 1em per glyph, so the hero figure can be sized to its box exactly. */
function heroSize(text: string, box: number) {
  return Math.min(96, Math.floor(box / (text.length * (1 - HERO_TRACK))));
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minWidth: 0,
        padding: "14px 18px 13px",
        background: CREAM_HI,
        border: `3px solid ${INK}`,
        borderRadius: 16,
        boxShadow: `0 5px 0 ${INK}`,
      }}
    >
      <div style={{ display: "flex", fontFamily: "Press", fontSize: 13, color: INK_MUTE }}>{label}</div>
      <div style={{ display: "flex", fontSize: 36, lineHeight: 1, marginTop: 12 }}>{value}</div>
      <div style={{ display: "flex", fontSize: 18, color: INK_MUTE, marginTop: 6 }}>{sub}</div>
    </div>
  );
}

/** Stands in for the slab when its photo can't be fetched in time. */
function Pokeball() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 240,
        height: 240,
        borderRadius: 120,
        overflow: "hidden",
        border: `14px solid ${INK}`,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flex: 1, background: POKE }} />
      <div style={{ display: "flex", height: 14, background: INK }} />
      <div style={{ display: "flex", flex: 1, background: CREAM_HI }} />
      <div
        style={{
          position: "absolute",
          left: 69,
          top: 69,
          width: 74,
          height: 74,
          borderRadius: 37,
          background: CREAM_HI,
          border: `14px solid ${INK}`,
          display: "flex",
        }}
      />
    </div>
  );
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ mint: string }> }) {
  const { mint } = await params;
  if (!ADDRESS.test(mint)) return new Response("Not found", { status: 404 });
  const pack = parsePack(req.nextUrl.searchParams.get("pack"));

  // Live reads start alongside the catalogue read.
  const marketRead = within(getCardMarket(mint), MARKET_MS);
  const offersRead = within(getCardOffers(mint), OFFERS_MS);
  let card: CardDetail | null;
  try {
    card = await getCard(mint);
  } catch {
    // Collector Crypt is down: the site's default image, not cached.
    return Response.redirect(new URL("/og", req.url), 302);
  }
  if (!card) return new Response("Not found", { status: 404 });

  const [market, offers, art, [press, nunito]] = await Promise.all([
    marketRead,
    offersRead,
    within(slabArt(card), ART_MS),
    loadFonts(),
  ]);

  const name = shortCardName(card.itemName);
  const grade = compactGrade(gradeShort(card.gradingCompany, card.grade));
  const insured = Number(card.insuredValue) || 0;
  const pop = card.population;
  const tier = pop ? rarityTier(pop.gradePopulation) : null;
  const multiple = pullMultiple(insured, pack);

  // The market endpoint sends the price as a string despite the type.
  const listing = market?.listing ?? null;
  const listPrice = Number(listing?.price);
  const listed =
    listing && listPrice > 0
      ? { value: listing.currency === "USDC" ? fmtUsd(listPrice) : `${listPrice} SOL`, sub: venueName(listing.marketplace) }
      : { value: "·", sub: "Not listed" };
  const best = offers?.[0] ? Number(offers[0].price) : null;
  const bid = best ? { value: fmtUsd(best), sub: "Live offer" } : { value: "·", sub: offers ? "No bids" : "Unavailable" };

  const hero = multiple != null ? fmtMultiple(multiple) : insured > 0 ? fmtUsd(insured) : "·";
  const heroLine = multiple != null ? `Insured value ${fmtUsd(insured)}` : "Insured value";
  const heroSub = pack ? `vs a ${fmtPack(pack)} pack` : "Collector Crypt reference";
  const footnote = pack
    ? "Pack price entered by the sharer. Insured value is Collector Crypt's reference, not a sale price."
    : "Insured value is Collector Crypt's reference, not a sale price.";
  const subline = [grade, card.gradingID ? `Cert ${card.gradingID}` : null, card.year ? String(card.year) : null]
    .filter(Boolean)
    .join(" · ");

  const title = name.length > 60 ? `${name.slice(0, 58).trimEnd()}…` : name;
  const heroPx = heroSize(hero, 340);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: CREAM, fontFamily: "Nunito", color: INK, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14, background: POKE, display: "flex" }} />

        {/* the slab on its stand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 440, paddingTop: 14, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 34,
              top: 64,
              width: 372,
              height: 520,
              borderRadius: 60,
              display: "flex",
              backgroundImage: `radial-gradient(closest-side, ${tier ? TIER[tier].glow : PIKA}80, ${CREAM}00)`,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 324,
              height: 530,
              padding: 12,
              background: CREAM_HI,
              border: `2px solid ${SAND}`,
              borderRadius: 22,
              boxShadow: "0 26px 44px -18px rgba(41,38,61,0.55)",
            }}
          >
            {art ? <img src={art} width={300} height={506} style={{ objectFit: "contain" }} alt="" /> : <Pokeball />}
          </div>
          {grade ? (
            <div
              style={{
                position: "absolute",
                right: 22,
                bottom: 54,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "14px 16px 12px",
                background: POKE_DEEP,
                color: "#ffffff",
                border: `4px solid ${INK}`,
                borderRadius: 14,
                boxShadow: `0 5px 0 ${INK}`,
                transform: "rotate(-8deg)",
                fontFamily: "Press",
              }}
            >
              <div style={{ display: "flex", fontSize: grade.length > 7 ? 20 : 26 }}>{grade}</div>
              {tier ? (
                <div
                  style={{
                    display: "flex",
                    marginTop: 9,
                    padding: "4px 6px",
                    fontSize: 11,
                    borderRadius: 5,
                    border: "2px solid rgba(255,255,255,0.7)",
                    background: TIER[tier].bg,
                    color: TIER[tier].fg,
                  }}
                >
                  {tier}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* the receipt */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, padding: "44px 60px 30px 6px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", fontFamily: "Press", fontSize: 18, color: POKE_DEEP }}>
              <div style={{ display: "flex", width: 12, height: 12, background: POKE_DEEP, marginRight: 14 }} />
              {pack ? "PULL RECEIPT" : "SLAB REPORT"}
            </div>
            <div style={{ display: "flex", fontFamily: "Press", fontSize: 24, color: PIKA, textShadow: `3px 3px 0 ${AZURE_DEEP}` }}>DECARD</div>
          </div>

          <div style={{ display: "flex", fontSize: nameSize(title), lineHeight: 1.04, marginTop: 24, letterSpacing: -0.5 }}>{title}</div>
          {subline ? <div style={{ display: "flex", fontSize: 24, color: INK_SOFT, marginTop: 8 }}>{subline}</div> : null}

          <div style={{ display: "flex", alignItems: "center", marginTop: 22 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Press",
                fontSize: heroPx,
                letterSpacing: -Math.round(heroPx * HERO_TRACK),
                lineHeight: 1,
                color: PIKA,
                textShadow: `6px 6px 0 ${AZURE_DEEP}`,
                paddingRight: 30,
              }}
            >
              {hero}
            </div>
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{ display: "flex", fontSize: 32, lineHeight: 1.1 }}>{heroLine}</div>
              <div style={{ display: "flex", fontSize: 24, color: INK_MUTE, marginTop: 4 }}>{heroSub}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
            <Stat label="LISTED" value={listed.value} sub={listed.sub} />
            <Stat label="BEST BID" value={bid.value} sub={bid.sub} />
            <Stat
              label={pop ? `POP ${grade.split(" ").pop()}` : "POP"}
              value={pop ? fmtNum(pop.gradePopulation) : "·"}
              sub={pop ? `${fmtNum(pop.populationHigher)} higher` : "No pop report"}
            />
          </div>

          <div style={{ display: "flex", fontSize: 17, lineHeight: 1.3, color: INK_MUTE, marginTop: 20 }}>{footnote}</div>
          {/* receipt tear line */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "auto", marginBottom: 16 }}>
            {Array.from({ length: 36 }, (_, i) => (
              <div key={i} style={{ display: "flex", width: 10, height: 3, borderRadius: 2, background: SAND }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Press", fontSize: 12, color: INK_MUTE }}>
            <div style={{ display: "flex" }}>SOLANA {shortAddr(mint, 4)}</div>
            <div style={{ display: "flex" }}>DATA {stampTime(new Date())}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Press", data: press, weight: 400, style: "normal" },
        { name: "Nunito", data: nunito, weight: 800, style: "normal" },
      ],
      headers: { "Cache-Control": CACHE },
    },
  );
}
