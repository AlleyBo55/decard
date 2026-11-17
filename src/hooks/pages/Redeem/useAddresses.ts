"use client";
import { useCallback, useEffect, useState } from "react";
import { causeOf, codeOf, type ErrorNote } from "@/lib/redeem/errors";
import type { Address, AddressInput, RedeemApi } from "@/lib/redeem/types";
import type { ShippingPass } from "./useShippingPass";

// The wallet's saved shipping addresses, held by the provider and read live with the pass. They
// stay in memory only: nothing personal goes to localStorage or the console. The page keys this
// hook by wallet, so a switch starts with an empty book.

export interface AddressBook {
  list: Address[] | null;
  loading: boolean;
  /** Why the book didn't load, for the page to word (components/redeem/text.tsx noteText). */
  error: ErrorNote | null;
  reload: () => void;
  /** Creates, or with `id` updates. Throws the server's error for the form to show. */
  save: (input: AddressInput, id?: string) => Promise<Address>;
  remove: (id: string) => Promise<void>;
}

const loadError = (e: unknown): ErrorNote => (codeOf(e) === "PASS_DECLINED" ? { key: "addressesPass" } : { key: "addressesFailed", cause: causeOf(e) });

export function useAddresses(api: RedeemApi, pass: ShippingPass): AddressBook {
  const [list, setList] = useState<Address[] | null>(null);
  const [error, setError] = useState<ErrorNote | null>(null);
  const [round, setRound] = useState(0);
  const { call, status } = pass;
  const active = status === "active";

  // Read the book once a pass is live, and again on reload.
  useEffect(() => {
    if (!active) return;
    let alive = true;
    call(() => api.listAddresses())
      .then((l) => {
        if (!alive) return;
        setList(l);
        setError(null);
      })
      .catch((e) => alive && setError(loadError(e)));
    return () => {
      alive = false;
    };
  }, [active, api, call, round]);

  const reload = useCallback(() => {
    setError(null);
    setRound((r) => r + 1);
  }, []);

  const save = useCallback(
    async (input: AddressInput, id?: string) => {
      const saved = await call(() => (id ? api.updateAddress(id, input) : api.createAddress(input)));
      setList((l) => [saved, ...(l ?? []).filter((a) => a.id !== saved.id && a.id !== id)]);
      return saved;
    },
    [api, call],
  );

  const remove = useCallback(
    async (id: string) => {
      await call(() => api.deleteAddress(id));
      setList((l) => (l ?? []).filter((a) => a.id !== id));
    },
    [api, call],
  );

  return { list, loading: active && list === null && error === null, error, reload, save, remove };
}
