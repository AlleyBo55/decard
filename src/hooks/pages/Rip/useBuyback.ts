"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/components/LocaleProvider";
import { isAPIError } from "@/helpers/fetcher";
import { TRANSIENT } from "@/lib/rip/types";
import { isUserRejection } from "@/lib/rip/wallet";
import { cancelBuyback, getBuybackQuote, getBuybackStatus, startBuyback, submitBuyback } from "@/services/Rip";

// Selling a revealed card back for USDC, within 72 hours of the open. Every amount here comes
// from decardbe as what lands in the seller's wallet. Quote first: it mints nothing. When the
// offer carries a second transaction, both are signed in one prompt. A sale whose submit comes
// back unknown is only ever read back, never signed again, so it can't settle twice.

export type BuybackPhase =
  | { step: "quoting" }
  | { step: "offer"; offerCents: number }
  | { step: "unavailable"; message: string }
  | { step: "signing"; offerCents: number }
  | { step: "settling"; offerCents: number }
  | { step: "sold"; offerCents: number; signature: string }
  | { step: "error"; message: string; offerCents?: number };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const codeOf = (e: unknown) => (isAPIError(e) ? (e.code ?? "") : "");

export function useBuyback(txId: string | null, signAll: (base64Txs: string[]) => Promise<string[]>, onSold?: () => void) {
  const copy = useT().rip.sale;
  const [phase, setPhase] = useState<BuybackPhase>({ step: "quoting" });
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const set = useCallback((p: BuybackPhase) => {
    if (alive.current) setPhase(p);
  }, []);
  // Read by the quote below, which must run once per card, not again when the strings object changes.
  const words = useRef(copy);
  useEffect(() => {
    words.current = copy;
  });

  useEffect(() => {
    // Mounted once per card (keyed by the reveal), so the first phase is already "quoting".
    if (!txId) return;
    const ac = new AbortController();
    getBuybackQuote(txId, ac.signal)
      .then((q) =>
        setPhase(
          q.available && q.offerCents ? { step: "offer", offerCents: q.offerCents } : { step: "unavailable", message: words.current.unavailable },
        ),
      )
      .catch((e) => {
        if (codeOf(e) === "ABORTED") return;
        const code = codeOf(e);
        const w = words.current;
        setPhase({
          step: "unavailable",
          message: code === "CARD_AUTO_SOLD" ? w.autoSold : code === "CARD_BOUGHT_BACK" ? w.boughtBack : isAPIError(e) ? e.message : w.quoteFailed,
        });
      });
    return () => ac.abort();
  }, [txId]);

  /** Polls a submitted sale until it settles; up to a minute. */
  const settle = useCallback(
    async (id: string, offerCents: number) => {
      for (let i = 0; i < 20 && alive.current; i++) {
        const s = await getBuybackStatus(id).catch(() => null);
        if (s?.status === "completed") {
          set({ step: "sold", offerCents, signature: s.signature });
          onSold?.();
          return;
        }
        if (s?.status === "failed") return set({ step: "error", offerCents, message: copy.failed });
        await sleep(3_000);
      }
      set({ step: "error", offerCents, message: copy.settling });
    },
    [set, onSold, copy],
  );

  const sell = useCallback(async () => {
    if (!txId) return;
    set({ step: "signing", offerCents: phase.step === "offer" ? phase.offerCents : 0 });
    const key = crypto.randomUUID();
    let offer: Awaited<ReturnType<typeof startBuyback>> | null = null;
    for (let attempt = 0; attempt < 3 && !offer; attempt++) {
      try {
        offer = await startBuyback(txId, key);
      } catch (e) {
        const code = codeOf(e);
        if (code === "BUYBACK_INELIGIBLE") return set({ step: "unavailable", message: copy.closed });
        if (!TRANSIENT.has(code) || attempt === 2) return set({ step: "error", message: isAPIError(e) ? e.message : copy.startFailed });
        await sleep(1_500 * (attempt + 1));
      }
    }
    if (!offer) return;
    let signed: string[];
    try {
      signed = await signAll(offer.feeTransaction ? [offer.transaction, offer.feeTransaction] : [offer.transaction]);
    } catch (e) {
      // Release the offer now instead of leaving it open for an hour.
      await cancelBuyback(txId).catch(() => {});
      return set(
        isUserRejection(e)
          ? { step: "offer", offerCents: offer.offerCents }
          : { step: "error", offerCents: offer.offerCents, message: copy.signFailed },
      );
    }
    set({ step: "settling", offerCents: offer.offerCents });
    try {
      const sub = await submitBuyback(txId, signed[0], signed[1]);
      if (sub.status === "completed") {
        set({ step: "sold", offerCents: offer.offerCents, signature: sub.signature });
        onSold?.();
        return;
      }
      return settle(txId, offer.offerCents);
    } catch (e) {
      const code = codeOf(e);
      if (code === "SUBMISSION_REJECTED") return set({ step: "error", offerCents: offer.offerCents, message: copy.rejected });
      // Unknown outcome: read it back, never sign a second time.
      return settle(txId, offer.offerCents);
    }
  }, [txId, phase, set, signAll, settle, onSold, copy]);

  return { phase, sell };
}
