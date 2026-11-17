"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/components/LocaleProvider";
import { isAPIError } from "@/helpers/fetcher";
import { fmt } from "@/lib/i18n/format";
import { TRANSIENT, type RipPack, type RipTx } from "@/lib/rip/types";
import { isUserRejection } from "@/lib/rip/wallet";
import { getPull, openPack, purchasePack, submitPayment } from "@/services/Rip";

// One pack rip: reserve → user signs the payment → submit → open → reveal.
//
// The money rules, from the Slabz docs:
// - A purchase carries an idempotency key, so a retry after a timeout never reserves a second pack.
// - A payment that comes back unconfirmed is re-sent as the SAME signed bytes. A signature lands
//   at most once, so that can't charge twice; asking the user to sign again could.
// - Once paid, the pack is never lost: open is safe to repeat, and if it stalls the pull waits
//   in My Pulls. We never tell a user they were refunded.

export type RipPhase =
  | { step: "idle" }
  | { step: "buying"; pack: RipPack }
  | { step: "turbo"; pack: RipPack }
  | { step: "signing"; pack: RipPack }
  | { step: "paying"; pack: RipPack; txId: string }
  | { step: "opening"; pack: RipPack; txId: string }
  /** fresh: just dealt, so the cutscene plays the tear and reveal; otherwise a look back. */
  | { step: "revealed"; pack: RipPack; tx: RipTx; fresh: boolean }
  | { step: "stopped"; pack: RipPack; message: string; paid: boolean; txId?: string };

const OPEN_DEADLINE_MS = 3 * 60_000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const codeOf = (e: unknown) => (isAPIError(e) ? (e.code ?? "") : "");
/** The API error's own message (English, from the server), else `fallback`. */
const messageOf = (e: unknown, fallback: string) => (isAPIError(e) ? e.message : fallback);
const waitFor = (e: unknown, fallback: number) => {
  const ms = isAPIError(e) ? e.meta?.retryAfterMs : null;
  return typeof ms === "number" && ms > 0 ? Math.min(ms, 15_000) : fallback;
};

export function useRipFlow(signAll: (base64Txs: string[]) => Promise<string[]>, onSettled?: () => void) {
  const copy = useT().rip.flow;
  const [phase, setPhase] = useState<RipPhase>({ step: "idle" });
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const set = useCallback((p: RipPhase) => {
    if (alive.current) setPhase(p);
  }, []);

  const open = useCallback(
    async (pack: RipPack, txId: string) => {
      set({ step: "opening", pack, txId });
      const deadline = Date.now() + OPEN_DEADLINE_MS;
      let backoff = 1_000;
      // One open in flight at a time, as Slabz asks.
      while (alive.current && Date.now() < deadline) {
        try {
          const r = await openPack(txId);
          if (!r.pending && r.transaction) {
            set({ step: "revealed", pack, tx: r.transaction, fresh: true });
            onSettled?.();
            return;
          }
          await sleep(r.retryAfterMs ?? 3_000);
        } catch (e) {
          if (!TRANSIENT.has(codeOf(e))) {
            set({ step: "stopped", pack, paid: true, txId, message: fmt(copy.openFailed, { error: messageOf(e, copy.generic) }) });
            onSettled?.();
            return;
          }
          await sleep(waitFor(e, backoff));
          backoff = Math.min(backoff * 2, 10_000);
        }
      }
      set({
        step: "stopped",
        pack,
        paid: true,
        txId,
        message: copy.openSlow,
      });
      onSettled?.();
    },
    [set, onSettled, copy],
  );

  const pay = useCallback(
    async (pack: RipPack, txId: string, signed: string, signedFee?: string) => {
      set({ step: "paying", pack, txId });
      for (let attempt = 0; attempt < 8 && alive.current; attempt++) {
        try {
          await submitPayment(txId, signed, signedFee);
          return open(pack, txId);
        } catch (e) {
          const code = codeOf(e);
          if (code === "SUBMISSION_REJECTED") {
            set({
              step: "stopped",
              pack,
              paid: false,
              message: copy.rejected,
            });
            return;
          }
          if (!TRANSIENT.has(code)) break;
          // Same signed bytes again: they can land at most once.
          await sleep(waitFor(e, 2_000 * (attempt + 1)));
        }
      }
      // Out of retries, or an answer we don't act on blindly: read where the purchase stands.
      const tx = await getPull(txId).catch(() => null);
      if (tx && (tx.status === "confirmed" || tx.status === "opening" || tx.status === "completed")) return open(pack, txId);
      set({
        step: "stopped",
        pack,
        paid: false,
        txId,
        message: copy.unconfirmed,
      });
      onSettled?.();
    },
    [set, open, onSettled, copy],
  );

  const rip = useCallback(
    async (pack: RipPack, turbo = false) => {
      set({ step: "buying", pack });
      const key = crypto.randomUUID();
      let purchase: Awaited<ReturnType<typeof purchasePack>> | null = null;
      for (let attempt = 0; attempt < 4 && !purchase; attempt++) {
        try {
          purchase = await purchasePack(pack.id, turbo, key);
        } catch (e) {
          const code = codeOf(e);
          if (code === "TURBO_REQUIRED" && !turbo) return set({ step: "turbo", pack });
          const moved = isAPIError(e) ? (e.meta?.details as Record<string, string> | null)?.transactionId : undefined;
          if (code === "IDEMPOTENCY_KEY_REUSED" && moved) return open(pack, moved);
          if (!TRANSIENT.has(code) || attempt === 3) return set({ step: "stopped", pack, paid: false, message: messageOf(e, copy.generic) });
          await sleep(waitFor(e, 1_500 * (attempt + 1)));
        }
      }
      if (!purchase || !alive.current) return;
      set({ step: "signing", pack });
      let signed: string[];
      try {
        signed = await signAll(purchase.feeTransaction ? [purchase.transaction, purchase.feeTransaction] : [purchase.transaction]);
      } catch (e) {
        return set({
          step: "stopped",
          pack,
          paid: false,
          message: isUserRejection(e) ? copy.closed : copy.signFailed,
        });
      }
      return pay(pack, purchase.transactionId, signed[0], signed[1]);
    },
    [set, signAll, pay, open, copy],
  );

  /** Opens a pull that was paid earlier, from My Pulls. */
  const resume = useCallback((pack: RipPack, txId: string) => open(pack, txId), [open]);
  /** Shows an earlier pull's card on the stage, with its sell-back offer. */
  const show = useCallback((pack: RipPack, tx: RipTx) => set({ step: "revealed", pack, tx, fresh: false }), [set]);
  const reset = useCallback(() => set({ step: "idle" }), [set]);

  return { phase, rip, resume, show, reset };
}
