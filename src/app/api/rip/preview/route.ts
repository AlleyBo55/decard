import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

// Development only: the production catalog snapshot behind /rip?preview=1 (written by
// scripts/rip-preview.mjs). Production answers 404, and the snapshot isn't in the image.

export const dynamic = "force-dynamic";

export async function GET() {
  const missing = NextResponse.json({ error: { code: "NOT_FOUND", message: "Not found." } }, { status: 404 });
  if (process.env.NODE_ENV === "production") return missing;
  try {
    const raw = await readFile(join(process.cwd(), "scripts/fixtures/rip-preview.json"), "utf8");
    return new NextResponse(raw, { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
  } catch {
    return missing;
  }
}
