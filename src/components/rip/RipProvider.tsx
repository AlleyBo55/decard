"use client";
import type { Wallet, WalletAccount } from "@wallet-standard/base";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useT } from "@/components/LocaleProvider";
import { isAPIError } from "@/helpers/fetcher";
import type { RipSession } from "@/lib/rip/types";
import {
  connect,
  disconnect,
  isUserRejection,
  listWallets,
  signMessage,
  signTransactions,
  toBase64,
  watchAccount,
  watchWallets,
  type Cluster,
} from "@/lib/rip/wallet";
import { finishSignIn, getRipSession, signOut as endSession, startSignIn } from "@/services/Rip";
import { useRipConfigQuery } from "@/store/api";

// Wallet connection plus the server-side sign-in. A wallet is "ready" only when the connected
// account is the one the session cookie was issued to, so switching accounts in the wallet asks
// for a fresh sign-in instead of acting with the wrong wallet.

const LAST_WALLET = "decard:rip:wallet";

interface RipWalletValue {
  cluster: Cluster | null;
  wallets: Wallet[];
  wallet: Wallet | null;
  account: WalletAccount | null;
  session: RipSession | null;
  busy: "connecting" | "signing-in" | null;
  error: string | null;
  ready: boolean;
  pickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
  signIn: (w: Wallet) => Promise<boolean>;
  signOut: () => Promise<void>;
  /** Has the connected wallet sign a backend-built transaction (base64 in, base64 out). */
  sign: (base64Tx: string) => Promise<string>;
  /** Signs several in one wallet prompt, returned in order. */
  signAll: (base64Txs: string[]) => Promise<string[]>;
  /** The typical share of insured value a sell-back pays out. */
  sellBackPct: number;
}

const Ctx = createContext<RipWalletValue | null>(null);

export function useRipWallet() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useRipWallet needs <RipProvider>");
  return v;
}

export function RipProvider({ children }: { children: React.ReactNode }) {
  const copy = useT().rip.wallet;
  const { data: config } = useRipConfigQuery();
  const cluster = config?.cluster ?? null;
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [account, setAccount] = useState<WalletAccount | null>(null);
  const [session, setSession] = useState<RipSession | null>(null);
  const [busy, setBusy] = useState<RipWalletValue["busy"]>(null);
  const [error, setError] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const restored = useRef(false);

  useEffect(() => {
    const refresh = () => setWallets(listWallets());
    refresh();
    return watchWallets(refresh);
  }, []);

  // The session cookie survives reloads; ask who it belongs to.
  useEffect(() => {
    const ac = new AbortController();
    getRipSession(ac.signal)
      .then(setSession)
      .catch(() => setSession(null));
    return () => ac.abort();
  }, []);

  // Quietly reconnect the wallet used last time, once it has registered.
  useEffect(() => {
    if (restored.current || wallets.length === 0) return;
    const name = localStorage.getItem(LAST_WALLET);
    const w = name ? wallets.find((x) => x.name === name) : undefined;
    if (!w) return;
    restored.current = true;
    connect(w, true)
      .then((a) => {
        if (!a) return;
        setWallet(w);
        setAccount(a);
      })
      .catch(() => {});
  }, [wallets]);

  useEffect(() => (wallet ? watchAccount(wallet, setAccount) : undefined), [wallet]);

  const signIn = useCallback(
    async (w: Wallet) => {
      setError(null);
      setBusy("connecting");
      try {
        const a = await connect(w);
        if (!a) throw new Error("This wallet has no Solana account.");
        setWallet(w);
        setAccount(a);
        localStorage.setItem(LAST_WALLET, w.name);
        if (session?.wallet === a.address && Date.parse(session.expiresAt) > Date.now()) return true;
        setBusy("signing-in");
        const challenge = await startSignIn(a.address);
        const signature = await signMessage(w, a, challenge.message);
        setSession(await finishSignIn(challenge.token, toBase64(signature)));
        setPickerOpen(false);
        return true;
      } catch (e) {
        setError(isUserRejection(e) ? copy.rejected : isAPIError(e) ? e.message : copy.failed);
        return false;
      } finally {
        setBusy(null);
      }
    },
    [session, copy],
  );

  const signOut = useCallback(async () => {
    await endSession().catch(() => {});
    setSession(null);
    if (wallet) await disconnect(wallet).catch(() => {});
    localStorage.removeItem(LAST_WALLET);
    setWallet(null);
    setAccount(null);
  }, [wallet]);

  const signAll = useCallback(
    (base64Txs: string[]) => {
      if (!wallet || !account || !cluster) return Promise.reject(new Error("Connect a wallet first."));
      return signTransactions(wallet, account, base64Txs, cluster);
    },
    [wallet, account, cluster],
  );
  const sign = useCallback(async (base64Tx: string) => (await signAll([base64Tx]))[0], [signAll]);
  const sellBackPct = config?.sellBackPct ?? 85;

  const ready = Boolean(account && session && session.wallet === account.address && cluster);

  const value = useMemo<RipWalletValue>(
    () => ({
      cluster,
      wallets,
      wallet,
      account,
      session,
      busy,
      error,
      ready,
      pickerOpen,
      openPicker: () => {
        setError(null);
        setPickerOpen(true);
      },
      closePicker: () => setPickerOpen(false),
      signIn,
      signOut,
      sign,
      signAll,
      sellBackPct,
    }),
    [cluster, wallets, wallet, account, session, busy, error, ready, pickerOpen, signIn, signOut, sign, signAll, sellBackPct],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
