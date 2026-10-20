import { createListenerMiddleware, type Dispatch } from "@reduxjs/toolkit";
import type { WalletLabel } from "@/lib/types";
import type { RootState } from "./combinedReducers";
import { hydrateLabels, setLabel } from "./slices/Labels";
import { hydrateWatchlist, toggleWatch } from "./slices/Watchlist";

// Labels and the watchlist live in localStorage under the keys and JSON shapes
// the app has always used, so visitors keep their saved data. No
// redux-persist: its PersistGate renders nothing during SSR.

export const LABELS_KEY = "decard:labels"; // Record<string, WalletLabel>
export const WATCHLIST_KEY = "decard:watchlist"; // string[]

function parse(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const parseLabels = (raw: string | null): Record<string, WalletLabel> => {
  const value = parse(raw);
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, WalletLabel>) : {};
};

const parseWatchlist = (raw: string | null): string[] => {
  const value = parse(raw);
  return Array.isArray(value) ? value.filter((w): w is string => typeof w === "string") : [];
};

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // storage blocked
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or blocked: the change just won't persist
  }
}

/** Loads the saved labels and watchlist. Client only, after mount, so the first render matches the server. */
export function hydrateFromStorage(dispatch: Dispatch) {
  dispatch(hydrateLabels(parseLabels(read(LABELS_KEY))));
  dispatch(hydrateWatchlist(parseWatchlist(read(WATCHLIST_KEY))));
}

/** Mirrors another tab's change. A null key means that tab cleared storage. */
export function syncFromStorageEvent(event: StorageEvent, dispatch: Dispatch) {
  if (event.storageArea && event.storageArea !== localStorage) return;
  if (event.key === LABELS_KEY || event.key === null) {
    dispatch(hydrateLabels(parseLabels(event.key ? event.newValue : null)));
  }
  if (event.key === WATCHLIST_KEY || event.key === null) {
    dispatch(hydrateWatchlist(parseWatchlist(event.key ? event.newValue : null)));
  }
}

/** Writes labels and the watchlist back after the user changes them. Hydration never writes. */
export function createPersistMiddleware() {
  const listener = createListenerMiddleware();
  listener.startListening({
    actionCreator: setLabel,
    effect: (_action, { getState }) => write(LABELS_KEY, (getState() as RootState).labels.labels),
  });
  listener.startListening({
    actionCreator: toggleWatch,
    effect: (_action, { getState }) => write(WATCHLIST_KEY, (getState() as RootState).watchlist.wallets),
  });
  return listener.middleware;
}
