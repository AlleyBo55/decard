import { getWallets } from "@wallet-standard/app";
import type { IdentifierString, Wallet, WalletAccount } from "@wallet-standard/base";
import {
  StandardConnect,
  StandardDisconnect,
  StandardEvents,
  type StandardConnectFeature,
  type StandardDisconnectFeature,
  type StandardEventsFeature,
} from "@wallet-standard/features";
import {
  SolanaSignMessage,
  SolanaSignTransaction,
  type SolanaSignMessageFeature,
  type SolanaSignTransactionFeature,
} from "@solana/wallet-standard-features";

// Solana wallets through the Wallet Standard (Phantom, Solflare, Backpack, ...): a few KB instead
// of a wallet-adapter bundle. The wallet only ever signs bytes the backend built; Decard never
// sees a private key and never sends a transaction itself.

export type Cluster = "mainnet" | "devnet";

/** True for wallets that can connect and sign Solana transactions and messages. */
export function isSolanaWallet(w: Wallet) {
  return (
    StandardConnect in w.features &&
    SolanaSignTransaction in w.features &&
    SolanaSignMessage in w.features &&
    w.chains.some((c) => c.startsWith("solana:"))
  );
}

export function listWallets(): Wallet[] {
  return getWallets().get().filter(isSolanaWallet);
}

/** Calls back whenever a wallet extension registers or goes away. */
export function watchWallets(onChange: () => void) {
  const wallets = getWallets();
  const offRegister = wallets.on("register", onChange);
  const offUnregister = wallets.on("unregister", onChange);
  return () => {
    offRegister();
    offUnregister();
  };
}

function solanaAccount(accounts: readonly WalletAccount[]) {
  return accounts.find((a) => a.chains.some((c) => c.startsWith("solana:"))) ?? accounts[0] ?? null;
}

/** Connects, or with `silent` only reconnects a wallet the user already approved. */
export async function connect(w: Wallet, silent = false): Promise<WalletAccount | null> {
  const { connect } = (w.features as StandardConnectFeature)[StandardConnect];
  const { accounts } = await connect(silent ? { silent: true } : undefined);
  return solanaAccount(accounts);
}

export async function disconnect(w: Wallet) {
  if (StandardDisconnect in w.features) await (w.features as StandardDisconnectFeature)[StandardDisconnect].disconnect();
}

/** Calls back with the wallet's current account whenever the user switches or disconnects. */
export function watchAccount(w: Wallet, onChange: (account: WalletAccount | null) => void) {
  if (!(StandardEvents in w.features)) return () => {};
  return (w.features as StandardEventsFeature)[StandardEvents].on("change", ({ accounts }) => {
    if (accounts) onChange(solanaAccount(accounts));
  });
}

export async function signMessage(w: Wallet, account: WalletAccount, message: string): Promise<Uint8Array> {
  const [out] = await (w.features as SolanaSignMessageFeature)[SolanaSignMessage].signMessage({
    account,
    message: new TextEncoder().encode(message),
  });
  return out.signature;
}

/**
 * Signs base64 transactions from the backend and returns them, signed, as base64 in the same
 * order. Several go to the wallet in one call, so the user approves them in one prompt.
 */
export async function signTransactions(w: Wallet, account: WalletAccount, base64Txs: string[], cluster: Cluster): Promise<string[]> {
  const chain = `solana:${cluster}` as IdentifierString;
  const out = await (w.features as SolanaSignTransactionFeature)[SolanaSignTransaction].signTransaction(
    ...base64Txs.map((tx) => ({ account, transaction: fromBase64(tx), chain })),
  );
  if (out.length !== base64Txs.length) throw new Error("The wallet didn't sign every transaction.");
  return out.map((o) => toBase64(o.signedTransaction));
}

export function toBase64(bytes: Uint8Array) {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

export function fromBase64(b64: string) {
  const s = atob(b64);
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
  return out;
}

/** A wallet rejected the request in its own popup: the user said no, nothing went wrong. */
export function isUserRejection(error: unknown) {
  const e = error as { code?: unknown; name?: unknown; message?: unknown } | null;
  if (!e) return false;
  if (e.code === 4001 || e.name === "WalletSignTransactionError" || e.name === "UserRejectedRequestError") return true;
  return typeof e.message === "string" && /reject|denied|cancel|declin|closed/i.test(e.message);
}
