"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Strings } from "@/lib/i18n/strings/types";
import { cardProblems, causeOf, codeOf, messageOf, NO_ANSWER, replacementOf, sleep, TRANSIENT, waitFor, type CardProblem, type Cause } from "@/lib/redeem/errors";
import { rememberShipment } from "@/lib/redeem/shipments";
import type { Burned, Prepared, PrepareBody, RedeemApi, RedeemSigner } from "@/lib/redeem/types";
import { isUserRejection } from "@/lib/rip/wallet";
import type { ShippingPass } from "./useShippingPass";

// Release: prepare → the wallet signs every leg in one prompt → burn. The money rules:
// - Nothing is charged or burned until the signed transactions are sent, so a closed prompt is
//   a no-op, and so is any failure before `burn` is called.
// - A burn with no clear answer is sent again as the SAME signed bytes: a signature lands at
//   most once. After that, only the recovery calls (resume, complete) move a shipment forward.
// - OUTCOME_UNKNOWN means the payment state is unknown: repeat the same recovery call and never
//   prepare a new shipment. Only REDEEM_NOT_PAID (nothing was charged) makes a fresh prepare safe.
// - Every shipment id is remembered on this device as soon as it exists, so a paid one is never
//   lost: the journey can finish it later.

export type Next =
  | { kind: "prepare" }
  | { kind: "sign"; prepared: Prepared; at: number }
  | { kind: "resume"; shipmentId: string }
  | { kind: "complete"; shipmentId: string }
  | { kind: "check"; shipmentId: string }
  | { kind: "review" }
  | { kind: "address" }
  /** Another shipment holds the cards: continue it from the journey, never a new one. */
  | { kind: "journey" }
  | { kind: "none" };

/** Why a release stopped. The page words it: t.redeem.release.stops[key], with the cause's {detail}. */
export type StopKey = keyof Strings["redeem"]["release"]["stops"];
/** What a running step is doing: t.redeem.release.notes[key]. */
export type NoteKey = keyof Strings["redeem"]["release"]["notes"];

export type ReleasePhase =
  | { step: "idle" }
  | { step: "preparing" }
  /** The prepared total is above what was confirmed: the user confirms the new one. */
  | { step: "repriced"; prepared: Prepared; at: number; confirmedCents: number }
  | { step: "signing"; prepared: Prepared; note?: NoteKey }
  | { step: "burning"; prepared: Prepared }
  | { step: "recovering"; kind: "resume" | "complete"; shipmentId: string; note: NoteKey }
  | {
      step: "stopped";
      tone: "calm" | "warn" | "error";
      why: StopKey;
      /** The error whose own words fill the message's {detail}. */
      cause?: Cause | null;
      next: Next;
      /** The Decard sign-in lapsed: sign in, then `next`. */
      signIn?: boolean;
      problems?: Record<string, CardProblem>;
    }
  | { step: "done"; burned: Burned };

/** Statuses that mean the burn landed. */
const MOVED: ReadonlySet<string> = new Set(["processing", "shipped", "delivered"]);

/** Blockhashes last about a minute: signatures older than this are refreshed, not sent. */
const STALE_MS = 75_000;
const ATTEMPTS = 4;

const isExpiry = (e: unknown) => /EXPIRED|BLOCKHASH/.test(codeOf(e)) || /blockhash|expired|too long/i.test(messageOf(e, ""));

export interface ReleaseRequest {
  body: PrepareBody;
  /** The total the user confirmed, in cents. */
  confirmedCents: number;
}

export function useRelease(api: RedeemApi, pass: ShippingPass, signer: RedeemSigner | null, onDone: (b: Burned) => void) {
  const [phase, setPhase] = useState<ReleasePhase>({ step: "idle" });
  const alive = useRef(true);
  const request = useRef<ReleaseRequest | null>(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  const set = useCallback((p: ReleasePhase) => {
    if (alive.current) setPhase(p);
  }, []);
  const { call } = pass;
  const wallet = signer?.address ?? null;

  const remember = useCallback(
    (id: string, replaces?: string) => {
      if (wallet) rememberShipment(wallet, id, replaces);
    },
    [wallet],
  );

  const finish = useCallback(
    (burned: Burned) => {
      remember(burned.shipmentId);
      set({ step: "done", burned });
      onDoneRef.current(burned);
    },
    [remember, set],
  );

  /** The shipment already moved on (burned, replaced): show it on the journey. */
  const toJourney = useCallback(
    async (shipmentId: string) => {
      const s = await call(() => api.getShipment(shipmentId)).catch(() => null);
      finish({ shipmentId, status: s?.status ?? "processing", transactionUrls: [], cardCount: s?.nftAddresses.length ?? request.current?.body.nftAddresses.length ?? 0 });
    },
    [api, call, finish],
  );

  const stopForAuth = useCallback(
    (e: unknown, next: Next): boolean => {
      const code = codeOf(e);
      if (code === "UNAUTHENTICATED") {
        set({ step: "stopped", tone: "warn", why: "signIn", next, signIn: true });
        return true;
      }
      if (code === "PASS_DECLINED") {
        set({ step: "stopped", tone: "calm", why: "passNeeded", next });
        return true;
      }
      return false;
    },
    [set],
  );

  // Forward declarations, wired below: each step can hand over to another.
  const signRef = useRef<(p: Prepared, at: number, note?: NoteKey) => Promise<void>>(async () => {});
  const prepareRef = useRef<(replacing?: string) => Promise<void>>(async () => {});

  /**
   * A newer prepare replaced this shipment before it burned, so nothing was charged for it and
   * the server didn't name the newer one. The same cards to the same address prepare the newest.
   */
  const replaced = useCallback(
    (old: string) => {
      if (request.current?.body.nftAddresses.length) return prepareRef.current(old);
      set({ step: "stopped", tone: "calm", why: "replaced", next: { kind: "journey" } });
    },
    [set],
  );

  const recover = useCallback(
    async (kind: "resume" | "complete", first: string, note: NoteKey) => {
      let shipmentId = first;
      for (let attempt = 0; attempt < ATTEMPTS && alive.current; attempt++) {
        set({ step: "recovering", kind, shipmentId, note });
        try {
          const prepared = await call(() => (kind === "resume" ? api.resume(shipmentId) : api.complete(shipmentId)));
          remember(prepared.shipmentId, prepared.shipmentId !== shipmentId ? shipmentId : undefined);
          const confirmed = request.current?.confirmedCents ?? prepared.totalCents;
          if (prepared.totalCents > confirmed) return set({ step: "repriced", prepared, at: Date.now(), confirmedCents: confirmed });
          return signRef.current(prepared, Date.now(), kind === "resume" ? "fresh" : "rest");
        } catch (e) {
          const code = codeOf(e);
          if (code === "REDEEM_NOT_PAID") {
            // Nothing was charged, so a fresh shipment is safe, when this page knows what to ship.
            if (request.current?.body.nftAddresses.length) return prepareRef.current();
            return set({ step: "stopped", tone: "calm", why: "notPaid", next: { kind: "none" } });
          }
          if (code === "REDEEM_ALREADY_DONE") return toJourney(shipmentId);
          if (code === "REDEEM_SHIPMENT_REPLACED") {
            const newer = replacementOf(e);
            if (!newer) return replaced(shipmentId);
            remember(newer, shipmentId);
            shipmentId = newer;
            continue;
          }
          if (stopForAuth(e, { kind, shipmentId })) return;
          // Unknown outcome, a busy provider or no answer: the same call again, never a new shipment.
          if (code === "OUTCOME_UNKNOWN" || TRANSIENT.has(code) || NO_ANSWER.has(code)) {
            await sleep(waitFor(e, 2_000 * (attempt + 1)));
            continue;
          }
          return set({ step: "stopped", tone: "error", why: "deskSaidNo", cause: causeOf(e), next: { kind, shipmentId } });
        }
      }
      set({ step: "stopped", tone: "warn", why: "stillWaiting", next: { kind, shipmentId } });
    },
    [api, call, remember, replaced, set, stopForAuth, toJourney],
  );

  const burn = useCallback(
    async (prepared: Prepared, signedTransactions: string[], signedDelistTransactions: string[]) => {
      const { shipmentId } = prepared;
      set({ step: "burning", prepared });
      for (let attempt = 0; attempt < ATTEMPTS && alive.current; attempt++) {
        try {
          const burned = await call(() =>
            api.burn(signedDelistTransactions.length ? { shipmentId, signedTransactions, signedDelistTransactions } : { shipmentId, signedTransactions }),
          );
          return finish(burned);
        } catch (e) {
          const code = codeOf(e);
          if (code === "REDEEM_ALREADY_DONE") return toJourney(shipmentId);
          if (code === "REDEEM_BURN_REJECTED") return recover("complete", shipmentId, "burnRejected");
          if (code === "REDEEM_SHIPMENT_REPLACED") {
            const newer = replacementOf(e);
            if (!newer) return replaced(shipmentId);
            remember(newer, shipmentId);
            return recover("resume", newer, "takenOver");
          }
          if (isExpiry(e)) return recover("resume", shipmentId, "slowSign");
          if (stopForAuth(e, { kind: "resume", shipmentId })) return;
          // Same signed bytes again: they land at most once. SUBMIT_UNCONFIRMED (decardbe's
          // PARTNER_SUBMIT_UNCONFIRMED) means sent but not yet confirmed: the burn may still land.
          if (code === "OUTCOME_UNKNOWN" || code === "SUBMIT_UNCONFIRMED" || TRANSIENT.has(code) || NO_ANSWER.has(code)) {
            await sleep(waitFor(e, 2_500 * (attempt + 1)));
            continue;
          }
          return set({ step: "stopped", tone: "error", why: "burnFailed", cause: causeOf(e), next: { kind: "check", shipmentId } });
        }
      }
      // No clear answer after every retry: read where the shipment stands. Only a status that
      // says it burned counts; an undocumented one leaves the check to the trainer.
      const s = await call(() => api.getShipment(shipmentId)).catch(() => null);
      if (s && MOVED.has(s.redeemStatus)) return toJourney(shipmentId);
      set({ step: "stopped", tone: "warn", why: "network", next: { kind: "check", shipmentId } });
    },
    [api, call, finish, recover, remember, replaced, set, stopForAuth, toJourney],
  );

  const sign = useCallback(
    async (prepared: Prepared, at: number, note?: NoteKey) => {
      if (!signer) {
        return set({ step: "stopped", tone: "warn", why: "connect", next: { kind: "sign", prepared, at }, signIn: true });
      }
      set({ step: "signing", prepared, note });
      const all = [...prepared.transactions, ...prepared.delistTransactions];
      let signed: string[];
      try {
        signed = await signer.signAll(all);
      } catch (e) {
        return set({ step: "stopped", tone: "calm", why: isUserRejection(e) ? "closed" : "unsigned", next: { kind: "sign", prepared, at } });
      }
      if (signed.length !== all.length) {
        return set({ step: "stopped", tone: "calm", why: "short", next: { kind: "sign", prepared, at } });
      }
      // Too old to land: refresh rather than send transactions the network will drop.
      if (Date.now() - at > STALE_MS) return recover("resume", prepared.shipmentId, "slowSign");
      const n = prepared.transactions.length;
      return burn(prepared, signed.slice(0, n), signed.slice(n));
    },
    [signer, set, recover, burn],
  );

  const prepare = useCallback(async (replacing?: string) => {
    const req = request.current;
    if (!req) return;
    set({ step: "preparing" });
    let prepared: Prepared | null = null;
    for (let attempt = 0; attempt < 3 && !prepared && alive.current; attempt++) {
      try {
        prepared = await call(() => api.prepare(req.body));
      } catch (e) {
        const code = codeOf(e);
        // The same cards to the same address return the same shipment, so this is the same call
        // again, and nothing is charged before the burn.
        if ((TRANSIENT.has(code) || NO_ANSWER.has(code) || code === "OUTCOME_UNKNOWN") && attempt < 2) {
          await sleep(waitFor(e, 1_500 * (attempt + 1)));
          continue;
        }
        if (code === "REDEEM_INVALID_CARDS") return set({ step: "stopped", tone: "warn", why: "invalidCards", next: { kind: "review" }, problems: cardProblems(e) });
        if (code === "REDEEM_ADDRESS_REJECTED") return set({ step: "stopped", tone: "warn", why: "addressRejected", cause: causeOf(e), next: { kind: "address" } });
        if (code === "REDEEM_SHIPMENT_CONFLICT") return set({ step: "stopped", tone: "warn", why: "conflict", next: { kind: "journey" } });
        if (code === "REDEEM_ALREADY_DONE") return set({ step: "stopped", tone: "calm", why: "alreadyDone", next: { kind: "journey" } });
        if (stopForAuth(e, { kind: "prepare" })) return;
        return set({ step: "stopped", tone: "error", why: NO_ANSWER.has(code) ? "prepareNoAnswer" : "prepareFailed", cause: causeOf(e), next: { kind: "prepare" } });
      }
    }
    if (!prepared || !alive.current) return;
    remember(prepared.shipmentId, replacing !== prepared.shipmentId ? replacing : undefined);
    const at = Date.now();
    if (prepared.totalCents > req.confirmedCents) return set({ step: "repriced", prepared, at, confirmedCents: req.confirmedCents });
    return sign(prepared, at);
  }, [api, call, remember, set, sign, stopForAuth]);

  useEffect(() => {
    signRef.current = sign;
    prepareRef.current = prepare;
  });

  /** Starts a release the user confirmed. */
  const release = useCallback(
    (req: ReleaseRequest) => {
      request.current = req;
      return prepare();
    },
    [prepare],
  );

  /** Accepts a moved total and signs it. */
  const acceptPrice = useCallback(() => {
    if (phase.step !== "repriced") return;
    if (request.current) request.current = { ...request.current, confirmedCents: phase.prepared.totalCents };
    if (Date.now() - phase.at > STALE_MS) return recover("resume", phase.prepared.shipmentId, "newTotal");
    return sign(phase.prepared, phase.at);
  }, [phase, recover, sign]);

  /** Does what the stopped state says is safe next. */
  const retry = useCallback(async () => {
    if (phase.step !== "stopped") return;
    const next = phase.next;
    switch (next.kind) {
      case "prepare":
        return prepare();
      case "sign":
        return Date.now() - next.at < STALE_MS - 30_000 ? sign(next.prepared, next.at) : recover("resume", next.prepared.shipmentId, "refetch");
      case "resume":
      case "complete":
        return recover(next.kind, next.shipmentId, "pickUp");
      case "check": {
        set({ step: "recovering", kind: "complete", shipmentId: next.shipmentId, note: "checking" });
        const s = await call(() => api.getShipment(next.shipmentId)).catch((e) => {
          if (!stopForAuth(e, next)) set({ step: "stopped", tone: "warn", why: "checkWaiting", next });
          return null;
        });
        if (!s) return;
        if (s.redeemStatus === "pending_burn") return recover("complete", next.shipmentId, "unsigned");
        return toJourney(next.shipmentId);
      }
      default:
        return;
    }
  }, [phase, prepare, sign, recover, set, call, api, stopForAuth, toJourney]);

  /**
   * Finishes a saved shipment that never got its burn (from the journey), with the recovery
   * call only: never a new shipment. Any total above the shipment's known one is confirmed first.
   */
  const finishSaved = useCallback(
    (shipmentId: string, knownCents: number | null) => {
      request.current = { body: { nftAddresses: [], shippingAddressId: "" }, confirmedCents: knownCents ?? 0 };
      return recover("complete", shipmentId, "pickUp");
    },
    [recover],
  );

  const reset = useCallback(() => set({ step: "idle" }), [set]);

  return { phase, release, acceptPrice, retry, reset, finishSaved };
}
