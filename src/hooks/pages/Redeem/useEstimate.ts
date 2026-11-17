"use client";
import { useCallback, useEffect, useState } from "react";
import { cardProblems, causeOf, codeOf, type CardProblem, type ErrorNote } from "@/lib/redeem/errors";
import type { Estimate, RedeemApi } from "@/lib/redeem/types";
import type { ShippingPass } from "./useShippingPass";

// The real quote for a party and an address. Results are kept by request, so changing either
// shows a fresh quote instead of a stale one.

export interface EstimateState {
  estimate: Estimate | null;
  loading: boolean;
  /** The failure's code, and a note for the page to word (components/redeem/text.tsx noteText). */
  error: QuoteError | null;
  /** Cards the provider won't ship (REDEEM_INVALID_CARDS), by mint. */
  problems: Record<string, CardProblem>;
  retry: () => void;
}

export type QuoteError = ErrorNote & { code: string };

interface Result {
  key: string;
  estimate?: Estimate;
  error?: QuoteError;
  problems?: Record<string, CardProblem>;
}

/** `version` changes when the address behind the same id is edited, so the quote is asked again. */
export function useEstimate(api: RedeemApi, pass: ShippingPass, mints: string[], addressId: string | null, enabled: boolean, version = ""): EstimateState {
  const [result, setResult] = useState<Result | null>(null);
  const [round, setRound] = useState(0);
  const { call } = pass;
  const key = addressId && mints.length ? `${addressId}|${mints.join(",")}|${round}|${version}` : "";

  useEffect(() => {
    if (!enabled || !key || !addressId) return;
    const ac = new AbortController();
    call(() => api.estimate({ nftAddresses: mints, shippingAddressId: addressId }, ac.signal))
      .then((estimate) => setResult({ key, estimate }))
      .catch((e) => {
        if (ac.signal.aborted) return;
        const code = codeOf(e);
        if (code === "REDEEM_INVALID_CARDS") setResult({ key, problems: cardProblems(e), error: { code, key: "generic", cause: causeOf(e) } });
        else setResult({ key, error: { code, key: "quoteFailed", cause: causeOf(e) } });
      });
    return () => ac.abort();
  }, [enabled, key, addressId, mints, api, call]);

  const retry = useCallback(() => setRound((r) => r + 1), []);
  const mine = result && result.key === key ? result : null;
  return {
    estimate: mine?.estimate ?? null,
    loading: enabled && Boolean(key) && !mine,
    error: mine?.error ?? null,
    problems: mine?.problems ?? {},
    retry,
  };
}
