import { useEffect, useMemo, useState } from "react";
import { parsePackMemo, summarizeWalletLuck } from "@/lib/luck";
import type { PullLuck } from "@/lib/types";
import { useAppDispatch } from "@/store";
import api, { useWalletPullsQuery } from "@/store/api";

/** Pulls scored at the same time. Each one is a separate /api/luck request. */
const CONCURRENCY = 4;

/**
 * One pack memo's score. `other` means the official verifier credits the pull
 * to a different wallet (or to none): it is left out of the list and the summary.
 */
export type WalletPullState =
  | { status: "loading" }
  | { status: "scored"; result: PullLuck }
  | { status: "failed"; code: string }
  | { status: "other" };

type SettledState = Exclude<WalletPullState, { status: "loading" }>;

export interface WalletPullRow {
  memo: string;
  blockTime: number | null;
  state: WalletPullState;
}

const LOADING: WalletPullState = { status: "loading" };
const NOTHING_SETTLED: Record<string, SettledState> = {};

function errorCode(error: unknown) {
  const code = error && typeof error === "object" ? (error as { code?: unknown }).code : null;
  return typeof code === "string" && code ? code : "UNKNOWN";
}

/**
 * A wallet's pack pulls, each scored through the shared `luck` cache entry so
 * /luck?memo= opens instantly afterwards. Scoring runs a few pulls at a time and,
 * when the wallet changes or the view unmounts, starts nothing new and ignores
 * answers still in flight.
 */
export function useWalletLuck(wallet: string) {
  const dispatch = useAppDispatch();
  const query = useWalletPullsQuery(wallet, { skip: !wallet });
  // currentData, not data: data keeps the previous wallet's memos while a new wallet loads.
  const payload = query.currentData;

  // Normalized like /luck?memo= so both read the same cache entry, and one row per memo.
  const pulls = useMemo(() => {
    const seen = new Set<string>();
    const list: Omit<WalletPullRow, "state">[] = [];
    for (const entry of payload?.memos ?? []) {
      const memo = parsePackMemo(entry.memo);
      if (!memo || seen.has(memo)) continue;
      seen.add(memo);
      list.push({ memo, blockTime: entry.blockTime });
    }
    return list;
  }, [payload]);

  const [settled, setSettled] = useState({ wallet, byMemo: NOTHING_SETTLED });
  const byMemo = settled.wallet === wallet ? settled.byMemo : NOTHING_SETTLED;

  useEffect(() => {
    if (!wallet || pulls.length === 0) return;
    let stopped = false;
    let next = 0;

    const settle = (memo: string, state: SettledState) => {
      if (stopped) return;
      setSettled((prev) => ({
        wallet,
        byMemo: { ...(prev.wallet === wallet ? prev.byMemo : NOTHING_SETTLED), [memo]: state },
      }));
    };

    const work = async () => {
      while (!stopped && next < pulls.length) {
        const { memo } = pulls[next++];
        // Like useLuck: a historical pull never changes, so reuse a cached result instead of refetching after 10s.
        const sub = dispatch(api.endpoints.luck.initiate(memo, { forceRefetch: false }));
        try {
          const { result } = await sub.unwrap();
          settle(memo, result.wallet === wallet ? { status: "scored", result } : { status: "other" });
        } catch (error) {
          settle(memo, { status: "failed", code: errorCode(error) });
        } finally {
          sub.unsubscribe();
        }
      }
    };

    for (let i = 0; i < Math.min(CONCURRENCY, pulls.length); i++) void work();
    return () => {
      stopped = true;
    };
  }, [dispatch, wallet, pulls]);

  const rows = useMemo<WalletPullRow[]>(
    () => pulls.map((pull) => ({ ...pull, state: byMemo[pull.memo] ?? LOADING })),
    [pulls, byMemo],
  );

  const summary = useMemo(
    () => summarizeWalletLuck(rows.flatMap((row) => (row.state.status === "scored" ? [row.state.result] : []))),
    [rows],
  );

  const done = rows.filter((row) => row.state.status !== "loading").length;

  return {
    payload,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
    rows,
    progress: { done, total: rows.length },
    summary,
  };
}
