import "server-only";
import { enrichActivities } from "./enrich";
import { isSale } from "./format";
import { getTreasuryActivity } from "./rpc";
import type { Activity } from "./types";

export interface SalesSnapshot {
  /** Settled sales with a price, newest first, card details filled where resolvable. */
  sales: Activity[];
  /** Oldest and newest sale in the window, unix seconds. */
  from: number | null;
  to: number | null;
  usdcVolume: number;
  medianUsdc: number | null;
  /** Sales settled in SOL: listed with their SOL amount, left out of the dollar numbers. */
  solCount: number;
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const value = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return Math.round(value * 100) / 100;
}

/** The latest Collector Crypt sales, read from the treasury's recent history (a few hours). */
export async function getRecentSales(): Promise<SalesSnapshot> {
  const rows = await enrichActivities(await getTreasuryActivity());
  const sales = rows.filter((a) => isSale(a) && !a.err && (a.priceUsdc != null || a.priceSol != null));
  const usdc = sales.flatMap((a) => (a.priceUsdc != null ? [a.priceUsdc] : []));
  const times = sales.flatMap((a) => (a.blockTime != null ? [a.blockTime] : []));
  return {
    sales,
    from: times.length ? Math.min(...times) : null,
    to: times.length ? Math.max(...times) : null,
    usdcVolume: Math.round(usdc.reduce((sum, n) => sum + n, 0) * 100) / 100,
    medianUsdc: median(usdc),
    solCount: sales.length - usdc.length,
  };
}
