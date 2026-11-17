"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createAPIError } from "@/helpers/fetcher";
import { causeOf, codeOf, type ErrorNote } from "@/lib/redeem/errors";
import type { RedeemApi, RedeemSigner } from "@/lib/redeem/types";
import { isUserRejection } from "@/lib/rip/wallet";

// The provider's shipping session: the wallet signs a message, the provider grants 14 minutes.
// Every redeem call goes through `call`, which signs a fresh pass first when ours has run out
// and re-prompts once when the server says REDEEM_SESSION_REQUIRED, then repeats the call.

export type PassStatus = "none" | "signing" | "active" | "expired";

export interface ShippingPass {
  status: PassStatus;
  expiresAt: number | null;
  /** Why the last pass wasn't granted, for the page to word (components/redeem/text.tsx noteText). */
  error: ErrorNote | null;
  /** Asks the wallet for a pass now. Resolves true once granted. */
  open: () => Promise<boolean>;
  /** Runs a redeem call with a valid pass, signing one when needed. */
  call: <T>(fn: () => Promise<T>) => Promise<T>;
}

/** Margin before the provider's own expiry, so a call never starts on a pass about to lapse. */
const MARGIN_MS = 20_000;

export function useShippingPass(api: RedeemApi, signer: RedeemSigner | null): ShippingPass {
  const [status, setStatus] = useState<PassStatus>("none");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [error, setError] = useState<ErrorNote | null>(null);
  const expiry = useRef<number | null>(null);
  const inflight = useRef<Promise<boolean> | null>(null);
  // A pass belongs to one wallet: the page remounts this hook (keyed by address) on a switch.
  const signerRef = useRef(signer);
  useEffect(() => {
    signerRef.current = signer;
  });

  // Flip to "expired" on time, so the page can offer a renewal instead of a stale pass.
  useEffect(() => {
    if (status !== "active" || expiresAt === null) return;
    const t = setTimeout(() => setStatus("expired"), Math.max(0, expiresAt - Date.now()));
    return () => clearTimeout(t);
  }, [status, expiresAt]);

  const open = useCallback(() => {
    if (inflight.current) return inflight.current;
    const run = (async () => {
      const s = signerRef.current;
      if (!s) {
        setError({ key: "connectFirst" });
        return false;
      }
      setError(null);
      setStatus("signing");
      try {
        const { message } = await api.startSession();
        const signature = await s.signMessage(message);
        const { expiresAt: at } = await api.verifySession(signature);
        const ms = Date.parse(at);
        const until = Number.isFinite(ms) ? ms : Date.now() + 14 * 60_000;
        expiry.current = until;
        setExpiresAt(until);
        setStatus("active");
        return true;
      } catch (e) {
        expiry.current = null;
        setStatus("none");
        setError(isUserRejection(e) ? { key: "passClosed" } : codeOf(e) === "UNAUTHENTICATED" ? { key: "passAuth" } : { key: "passFailed", cause: causeOf(e) });
        return false;
      } finally {
        inflight.current = null;
      }
    })();
    inflight.current = run;
    return run;
  }, [api]);

  const call = useCallback(
    async <T,>(fn: () => Promise<T>): Promise<T> => {
      const fresh = () => expiry.current !== null && expiry.current - MARGIN_MS > Date.now();
      const need = async () => {
        if (!(await open())) throw createAPIError("A shipping pass is needed for this step.", null, "PASS_DECLINED", [], { local: true });
      };
      if (!fresh()) await need();
      try {
        return await fn();
      } catch (e) {
        if (codeOf(e) !== "REDEEM_SESSION_REQUIRED") throw e;
        expiry.current = null;
        setStatus("expired");
        await need();
        return fn();
      }
    },
    [open],
  );

  return useMemo(() => ({ status, expiresAt, error, open, call }), [status, expiresAt, error, open, call]);
}
