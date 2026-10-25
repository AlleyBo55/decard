import { type NextRequest, NextResponse } from "next/server";
import { isAPIError } from "@/helpers/fetcher";
import { edgeCache } from "@/lib/cache";
import { getWalletPackMemos } from "@/lib/rpc";

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

// A wallet's gacha pack memos, newest first. The page then scores each pull
// through /api/luck, so a lookup costs one history read here.
export async function GET(req: NextRequest) {
  const wallet = (req.nextUrl.searchParams.get("wallet") ?? "").trim();
  if (!ADDRESS.test(wallet)) {
    return NextResponse.json({ error: "Enter a valid Solana wallet address.", code: "BAD_WALLET" }, { status: 400 });
  }
  try {
    const payload = await getWalletPackMemos(wallet);
    // Short: a pull ripped a minute ago should show up on refresh.
    return NextResponse.json(payload, { headers: edgeCache(15, 60) });
  } catch (error) {
    console.error("[api/luck/wallet] history failed:", isAPIError(error) ? error.code : "error");
    return NextResponse.json(
      { error: "Wallet history is temporarily unavailable.", code: "UPSTREAM_UNAVAILABLE" },
      { status: 502 },
    );
  }
}
