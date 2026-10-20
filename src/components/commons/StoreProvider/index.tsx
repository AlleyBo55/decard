"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { makeStore } from "@/store";
import { hydrateFromStorage, syncFromStorageEvent } from "@/store/persist";

type StoreProviderProps = {
  children: ReactNode;
};

function createStore() {
  const store = makeStore();
  // The state the server rendered with. Hydration reads this instead of the
  // live store, because parts of the page can hydrate after the effect below
  // has already loaded saved data.
  return { store, serverState: store.getState() };
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  // Created once per server request and once per page load in the browser
  // (RTK's Next.js pattern; a lazy useState keeps it stable across renders).
  const [{ store, serverState }] = useState(createStore);

  useEffect(() => {
    // Focus and online tracking: polling pauses in hidden tabs, queries refetch on reconnect.
    const unsubscribe = setupListeners(store.dispatch);
    // Saved labels and watchlist load after mount so the server HTML and the first client render match.
    hydrateFromStorage(store.dispatch);
    const onStorage = (event: StorageEvent) => syncFromStorageEvent(event, store.dispatch);
    window.addEventListener("storage", onStorage);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", onStorage);
    };
  }, [store]);

  return (
    <Provider store={store} serverState={serverState}>
      {children}
    </Provider>
  );
};

export default StoreProvider;
