import { type NextRequest, NextResponse } from "next/server";
import { edgeCache } from "@/lib/cache";
import { getPullLuck, isPullLuckError, type PullLuckErrorCode } from "@/lib/gacha";
import { parsePackMemo } from "@/lib/luck";

const BAD_MEMO = "Enter a valid Collector Crypt pack memo or official verification URL.";
const UPSTREAM_UNAVAILABLE = "Collector Crypt pull data is temporarily unavailable.";

function statusFor(code: PullLuckErrorCode) {
  if (code === "BAD_MEMO") return 400;
  if (code === "UPSTREAM_UNAVAILABLE") return 502;
  return 422;
}

export async function GET(req: NextRequest) {
  const memo = parsePackMemo(req.nextUrl.searchParams.get("memo") ?? "");
  if (!memo) {
    return NextResponse.json({ error: BAD_MEMO, code: "BAD_MEMO" }, { status: 400 });
  }

  try {
    const result = await getPullLuck(memo);
    return NextResponse.json({ result }, { headers: edgeCache(86_400, 604_800) });
  } catch (error) {
    const failure = isPullLuckError(error)
      ? { error: error.message, code: error.code, status: statusFor(error.code) }
      : { error: UPSTREAM_UNAVAILABLE, code: "UPSTREAM_UNAVAILABLE" as const, status: 502 };

    if (failure.status === 502) {
      console.error(`[api/luck] ${failure.code}: ${failure.error}`);
    }
    return NextResponse.json({ error: failure.error, code: failure.code }, { status: failure.status });
  }
}
