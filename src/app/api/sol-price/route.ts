import { NextResponse } from "next/server";
import { USER_AGENT } from "@/lib/constants";

export const revalidate = 60;

const SOL = "So11111111111111111111111111111111111111112";

export async function GET() {
  try {
    const res = await fetch(`https://lite-api.jup.ag/price/v3?ids=${SOL}`, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      const p = data[SOL];
      if (p?.usdPrice) {
        return NextResponse.json({
          usd: p.usdPrice,
          change24h: (p.priceChange24h ?? 0) / 100,
        });
      }
    }
  } catch {}
  // Fallback to CoinGecko if Jupiter is unavailable.
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true",
      { headers: { "User-Agent": USER_AGENT }, next: { revalidate: 60 } },
    );
    const data = await res.json();
    return NextResponse.json({
      usd: data.solana?.usd ?? 0,
      change24h: (data.solana?.usd_24h_change ?? 0) / 100,
    });
  } catch {
    return NextResponse.json({ usd: 0, change24h: 0 });
  }
}
