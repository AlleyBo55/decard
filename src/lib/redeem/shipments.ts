// The wallet's past shipments on this device: ids only, newest first. Addresses and anything
// else personal stay with the provider and are read live with the shipping session.

const KEY = (wallet: string) => `decard:redeem:shipments:${wallet}`;
const MAX = 30;
const ID = /^[A-Za-z0-9_-]{1,64}$/;

const listeners = new Set<() => void>();
const bump = () => listeners.forEach((l) => l());

export function subscribeShipments(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith("decard:redeem:shipments:")) bump();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

/** The stored JSON as is: a string, so useSyncExternalStore sees a stable snapshot. */
export function rawShipments(wallet: string | null): string {
  if (!wallet || typeof localStorage === "undefined") return "";
  try {
    return localStorage.getItem(KEY(wallet)) ?? "";
  } catch {
    return "";
  }
}

export function parseShipments(raw: string): string[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && ID.test(x)).slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export const readShipments = (wallet: string | null) => parseShipments(rawShipments(wallet));

function write(wallet: string, ids: string[]) {
  try {
    localStorage.setItem(KEY(wallet), JSON.stringify(ids.slice(0, MAX)));
  } catch {
    // Private mode or a full disk: the journey still shows this session, just isn't remembered.
  }
  bump();
}

/** Puts a shipment first; `replaces` drops the id it superseded (REDEEM_SHIPMENT_REPLACED). */
export function rememberShipment(wallet: string, id: string, replaces?: string) {
  if (!ID.test(id)) return;
  write(wallet, [id, ...readShipments(wallet).filter((x) => x !== id && x !== replaces)]);
}
