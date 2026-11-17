"use client";
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { causeOf, codeOf, type ErrorNote } from "@/lib/redeem/errors";
import { parseShipments, rawShipments, subscribeShipments } from "@/lib/redeem/shipments";
import type { RedeemApi, RedeemStatus, Shipment } from "@/lib/redeem/types";

// Shipment reads for the journey. They need a live shipping pass but never ask the wallet for
// one on their own: a poll that pops a wallet prompt would be a surprise, so a lapsed pass shows
// a "renew" button instead.

const DONE: ReadonlySet<RedeemStatus> = new Set(["delivered", "failed", "cancelled"]);
const POLL_MS = 30_000;

interface Read {
  key: string;
  shipment?: Shipment;
  /** The failure's code, and a note for the page to word (components/redeem/text.tsx noteText). */
  error?: ErrorNote & { code: string };
}

export function useShipment(api: RedeemApi, id: string | null, passActive: boolean) {
  const [read, setRead] = useState<Read | null>(null);
  const [round, setRound] = useState(0);
  const key = id ? `${id}|${round}` : "";

  useEffect(() => {
    if (!id || !passActive) return;
    const ac = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const load = () =>
      api
        .getShipment(id, ac.signal)
        .then((shipment) => {
          setRead({ key, shipment });
          if (!DONE.has(shipment.redeemStatus)) timer = setTimeout(load, POLL_MS);
        })
        .catch((e) => {
          if (ac.signal.aborted) return;
          setRead((r) => ({ key, shipment: r?.key === key ? r.shipment : undefined, error: { code: codeOf(e), key: "shipmentFailed", cause: causeOf(e) } }));
        });
    void load();
    return () => {
      ac.abort();
      clearTimeout(timer);
    };
  }, [api, id, passActive, key]);

  const refresh = useCallback(() => setRound((r) => r + 1), []);
  const mine = read && read.key === key ? read : null;
  return { shipment: mine?.shipment ?? null, error: mine?.error ?? null, loading: Boolean(id) && passActive && !mine, refresh };
}

/** This device's shipment ids for a wallet, newest first. */
export function useSavedShipments(wallet: string | null) {
  const raw = useSyncExternalStore(
    subscribeShipments,
    () => rawShipments(wallet),
    () => "",
  );
  return useMemo(() => parseShipments(raw), [raw]);
}

/** Status of each saved shipment, read one at a time while the pass is live. */
export function useShipmentSummaries(api: RedeemApi, ids: string[], passActive: boolean) {
  const [map, setMap] = useState<Record<string, Shipment | "error">>({});
  const list = ids.slice(0, 12).join(",");
  useEffect(() => {
    if (!passActive || !list) return;
    const ac = new AbortController();
    (async () => {
      for (const id of list.split(",")) {
        if (ac.signal.aborted) return;
        try {
          const s = await api.getShipment(id, ac.signal);
          setMap((m) => ({ ...m, [id]: s }));
        } catch {
          if (ac.signal.aborted) return;
          setMap((m) => ({ ...m, [id]: "error" }));
        }
      }
    })();
    return () => ac.abort();
  }, [api, list, passActive]);
  return map;
}
