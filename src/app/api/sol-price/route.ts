import { NextResponse } from "next/server";
import fetcher from "@/helpers/fetcher";
import { cached, edgeCache } from "@/lib/cache";
import type { SolPrice } from "@/lib/types";

// Dynamic on purpose (no ISR): a statically cached route would also cache a
// failure. Success is CDN-cached for 60s as before; a price of 0 is never a
// success. When both sources fail, the last good price is served for up to
// 30 minutes, then 503 with no cache headers.

const SOL = "So11111111111111111111111111111111111111112";

async function fromJupiter(): Promise<SolPrice | null> {
  const data = await fetcher<Record<string, { usdPrice?: number; priceChange24h?: number } | undefined>>({
    url: `https://lite-api.jup.ag/price/v3?ids=${SOL}`,
    method: "GET",
    isPublic: true,
    timeoutMs: 5_000,
  });
  const p = data?.[SOL];
  return p?.usdPrice && p.usdPrice > 0 ? { usd: p.usdPrice, change24h: (p.priceChange24h ?? 0) / 100 } : null;
}

async function fromCoinGecko(): Promise<SolPrice | null> {
  const data = await fetcher<{ solana?: { usd?: number; usd_24h_change?: number } }>({
    url: "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true",
    method: "GET",
    isPublic: true,
    timeoutMs: 5_000,
  });
  const usd = data?.solana?.usd;
  return usd && usd > 0 ? { usd, change24h: (data.solana?.usd_24h_change ?? 0) / 100 } : null;
}

async function loadPrice(): Promise<SolPrice> {
  const price = (await fromJupiter().catch(() => null)) ?? (await fromCoinGecko().catch(() => null));
  if (!price) throw new Error("No SOL price source answered");
  return price;
}

export async function GET() {
  try {
    const price = await cached("sol-price", 30_000, loadPrice, { maxStaleMs: 30 * 60_000 });
    return NextResponse.json(price, { headers: edgeCache(60) });
  } catch {
    return NextResponse.json({ error: "SOL price is temporarily unavailable.", code: "PRICE_UNAVAILABLE" }, { status: 503 });
  }
}
