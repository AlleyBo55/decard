"use client";
import { useT } from "@/components/LocaleProvider";
import { Modal } from "@/components/rip/Modal";
import { useRipWallet } from "@/components/rip/RipProvider";
import { TrainerAvatar } from "@/components/wallet/TrainerAvatar";
import type { ShippingPass } from "@/hooks/pages/Redeem/useShippingPass";
import { shortAddr } from "@/lib/format";
import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/i18n/format";
import { noteText, slots } from "./text";
import { PassTimer } from "./TravelPass";

// Stop 1: connect, sign in to Decard, then take the provider's shipping pass. The two
// signatures are free messages; neither moves anything.

interface Gate {
  n: number;
  title: string;
  text: string;
  done: boolean;
  open: boolean;
  action?: React.ReactNode;
  status?: React.ReactNode;
}

export function CheckIn({
  preview,
  pass,
  holder,
  savedCount,
  authLost = false,
  onResign,
  onNext,
  onJourney,
}: {
  preview: boolean;
  pass: ShippingPass;
  holder: string | null;
  savedCount: number;
  /** The server dropped the Decard session while the wallet still looks signed in. */
  authLost?: boolean;
  onResign?: () => void;
  onNext: () => void;
  onJourney: () => void;
}) {
  const w = useRipWallet();
  const t = useT();
  const s = t.redeem.checkIn;
  const connected = preview || Boolean(w.account);
  const signedIn = preview || (w.ready && !authLost);
  const passOk = pass.status === "active";
  const busyWallet = !preview && w.busy !== null;
  const gates: Gate[] = [
    {
      n: 1,
      title: s.wallet.title,
      text: s.wallet.text,
      done: connected,
      open: !connected,
      status: connected && holder ? <span className="font-mono">{shortAddr(holder)}</span> : undefined,
      action: (
        <button type="button" className="rd-btn rd-btn-gold" onClick={w.openPicker} disabled={busyWallet}>
          {w.busy === "connecting" ? s.wallet.busy : s.wallet.action}
        </button>
      ),
    },
    {
      n: 2,
      title: s.signIn.title,
      text: s.signIn.text,
      done: signedIn,
      open: connected && !signedIn,
      status: signedIn ? s.signIn.done : undefined,
      action: (
        <button
          type="button"
          className="rd-btn rd-btn-gold"
          onClick={() => (authLost && onResign ? onResign() : w.wallet ? void w.signIn(w.wallet) : w.openPicker())}
          disabled={busyWallet}
        >
          {w.busy === "signing-in" ? t.redeem.actions.checkWallet : s.signIn.action}
        </button>
      ),
    },
    {
      n: 3,
      title: s.pass.title,
      text: s.pass.text,
      done: passOk,
      open: signedIn && !passOk,
      status: passOk && pass.expiresAt ? <>{slots(s.pass.done, { timer: <PassTimer until={pass.expiresAt} /> })}</> : undefined,
      action: (
        <button type="button" className="rd-btn rd-btn-gold" onClick={() => void pass.open()} disabled={pass.status === "signing"}>
          {pass.status === "signing" ? t.redeem.actions.checkWallet : pass.status === "expired" ? t.redeem.actions.renewPass : s.pass.action}
        </button>
      ),
    },
  ];
  const all = connected && signedIn && passOk;
  return (
    <div className="flex flex-col gap-5">
      {connected && holder && (
        <div className="rd-trainer">
          <span className="overflow-hidden rounded-full border-2 border-white/70">
            <TrainerAvatar address={holder} size={44} />
          </span>
          <div className="min-w-0">
            <span className="rd-label">{preview ? "Preview trainer" : s.trainer}</span>
            <p className="truncate font-mono text-sm font-bold">{shortAddr(holder, 6)}</p>
          </div>
          {!preview && signedIn && (
            <button type="button" className="rd-link ml-auto" onClick={() => void w.signOut()}>
              {s.switchWallet}
            </button>
          )}
        </div>
      )}
      <ol className="grid gap-3 md:grid-cols-3">
        {gates.map((g) => (
          <li key={g.n} className={clsx("rd-gate", g.done && "is-done", g.open && "is-open")}>
            <div className="flex items-center gap-3">
              <span className="rd-gate-n" aria-hidden>
                {g.done ? "✓" : g.n}
              </span>
              <h3 className="text-lg font-extrabold leading-tight">{g.title}</h3>
            </div>
            <p className="text-sm font-semibold text-[var(--rd-mute)]">{g.text}</p>
            <div className="mt-auto pt-1">
              {g.done ? (
                <p className="rd-gate-ok">{g.status ?? s.done}</p>
              ) : g.open ? (
                g.action
              ) : (
                <p className="text-sm font-bold text-[var(--rd-mute)]">{fmt(s.after, { n: g.n - 1 })}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
      {(pass.error || (!preview && w.error && !w.pickerOpen)) && (
        <p className="rd-alert" role="alert">
          {pass.error ? noteText(t.redeem.errors, pass.error) : w.error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="rd-btn rd-btn-red" onClick={onNext} disabled={!all}>
          {s.next} <span aria-hidden>→</span>
        </button>
        {savedCount > 0 && signedIn && (
          <button type="button" className="rd-btn rd-btn-ghost" onClick={onJourney}>
            {fmt(s.journeys, { n: savedCount })}
          </button>
        )}
        {!all && <span className="text-sm font-bold text-[var(--rd-mute)]">{s.allFree}</span>}
      </div>
    </div>
  );
}

const INSTALL = [
  { name: "Phantom", href: "https://phantom.app/download", mobile: (url: string) => `https://phantom.app/ul/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(new URL(url).origin)}` },
  { name: "Solflare", href: "https://solflare.com/download", mobile: (url: string) => `https://solflare.com/ul/v1/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(new URL(url).origin)}` },
  { name: "Backpack", href: "https://backpack.app/download" },
];

/** Pick a Solana wallet, then sign a free message to prove it's yours (the /rip picker, restyled). */
export function WalletPickerModal() {
  const { wallets, pickerOpen, closePicker, signIn, busy, error } = useRipWallet();
  const s = useT().redeem.walletPicker;
  const here = typeof window === "undefined" ? "" : window.location.href;
  return (
    <Modal open={pickerOpen} onClose={closePicker} labelledBy="rd-wallet-title" dismissible={busy === null} bare className="rd-dialog">
      <div className="rd-panel p-5 sm:p-6">
        <h2 id="rd-wallet-title" className="rd-display text-3xl">
          {s.title}
        </h2>
        <p className="mt-2 text-sm font-semibold text-[var(--rd-mute)]">{s.text}</p>
        {wallets.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-2">
            {wallets.map((x) => (
              <li key={x.name}>
                <button type="button" disabled={busy !== null} onClick={() => void signIn(x)} className="rd-wallet">
                  {/* Wallet icons are data: URIs the extension provides. */}
                  <img src={x.icon} alt="" width={30} height={30} className="h-[30px] w-[30px] rounded-lg" />
                  {x.name}
                  <span className="ml-auto text-[var(--rd-gold)]" aria-hidden>
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            <p className="rd-display text-xl">{s.none}</p>
            <p className="text-sm font-semibold text-[var(--rd-mute)]">{s.noneText}</p>
            <div className="flex flex-wrap gap-2">
              {INSTALL.map((i) => (
                <a key={i.name} href={i.mobile && here ? i.mobile(here) : i.href} target="_blank" rel="noopener noreferrer" className="rd-btn rd-btn-ghost">
                  {i.name}
                </a>
              ))}
            </div>
          </div>
        )}
        {busy && (
          <p className="mt-4 text-sm font-black text-[#8ec5ff]" role="status">
            {busy === "signing-in" ? s.approve : s.connecting}
          </p>
        )}
        {error && (
          <p className="rd-alert mt-4" role="alert">
            {error}
          </p>
        )}
        <div className="mt-5 flex justify-end">
          <button type="button" onClick={closePicker} disabled={busy !== null} className="rd-btn rd-btn-ghost">
            {s.close}
          </button>
        </div>
      </div>
    </Modal>
  );
}
