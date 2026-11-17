"use client";
import { useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import { TrainerAvatar } from "@/components/wallet/TrainerAvatar";
import { shortAddr } from "@/lib/format";
import { localeMeta } from "@/lib/i18n";
import { fmt, plural } from "@/lib/i18n/format";
import type { Stats } from "@/lib/rip/trainer";
import { Modal } from "./Modal";
import { useRipWallet } from "./RipProvider";

/** Connect and sign in, or who is signed in with their trainer level. */
export function WalletBar({ trainer }: { trainer?: Stats | null }) {
  const { ready, account, session, busy, openPicker, signOut, cluster } = useRipWallet();
  const { locale, t } = useLocale();
  const copy = t.rip.wallet;
  const [menu, setMenu] = useState(false);

  if (ready && account) {
    return (
      <div className="relative">
        <button type="button" onClick={() => setMenu((m) => !m)} aria-expanded={menu} className="rwb">
          <span className="overflow-hidden rounded-full border-2 border-white/70">
            <TrainerAvatar address={account.address} size={30} />
          </span>
          <span className="rwb-text flex min-w-[96px] flex-col items-start leading-tight">
            {trainer ? (
              <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-[#ffd84d]">
                {fmt(copy.trainer, { level: trainer.level, title: t.rip.trainer.titles[trainer.title] ?? trainer.title })}
                {trainer.streak > 0 && <span aria-label={plural(locale, trainer.streak, copy.streak)}>🔥{trainer.streak}</span>}
              </span>
            ) : (
              <span className="text-[11px] font-black uppercase tracking-wide text-[#7cf29a]">{cluster === "devnet" ? copy.signedInDevnet : copy.signedIn}</span>
            )}
            <span className="font-mono text-sm font-bold">{shortAddr(account.address)}</span>
            {trainer && (
              <span className="mt-1 block h-1.5 w-full overflow-hidden rounded-full bg-white/15">
                <span className="block h-full rounded-full bg-[#7cf29a]" style={{ width: `${Math.max(4, trainer.progress * 100)}%` }} />
              </span>
            )}
          </span>
        </button>
        {menu && (
          <div className="rw-card absolute right-0 z-30 mt-2 w-56 p-2 animate-pop">
            <p className="px-2 py-1.5 text-xs font-semibold text-[var(--rw-mute)]">
              {fmt(copy.sessionEnds, {
                time: session ? new Intl.DateTimeFormat(localeMeta(locale).html, { hour: "2-digit", minute: "2-digit" }).format(new Date(session.expiresAt)) : "",
              })}
            </p>
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                void signOut();
              }}
              className="w-full rounded-lg px-2 py-2 text-left font-extrabold text-[#ff8a7a] hover:bg-white/10"
            >
              {copy.signOut}
            </button>
          </div>
        )}
      </div>
    );
  }
  return (
    <button type="button" onClick={openPicker} disabled={busy !== null} className="rw-btn rw-btn-gold whitespace-nowrap">
      {busy === "signing-in" ? (
        copy.checkWallet
      ) : busy === "connecting" ? (
        copy.connecting
      ) : (
        <>
          <span className="sm:hidden">{account ? copy.signIn : copy.connect}</span>
          <span className="hidden sm:inline">{account ? copy.signInLong : copy.connectLong}</span>
        </>
      )}
    </button>
  );
}

const INSTALL = [
  { name: "Phantom", href: "https://phantom.app/download", mobile: (url: string) => `https://phantom.app/ul/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(new URL(url).origin)}` },
  { name: "Solflare", href: "https://solflare.com/download", mobile: (url: string) => `https://solflare.com/ul/v1/browse/${encodeURIComponent(url)}?ref=${encodeURIComponent(new URL(url).origin)}` },
  { name: "Backpack", href: "https://backpack.app/download" },
];

/** Pick a Solana wallet, then sign a free message to prove it's yours. */
export function WalletPicker() {
  const { wallets, pickerOpen, closePicker, signIn, busy, error } = useRipWallet();
  const copy = useT().rip.wallet;
  const here = typeof window === "undefined" ? "" : window.location.href;
  return (
    <Modal open={pickerOpen} onClose={closePicker} labelledBy="rp-wallet-title" dismissible={busy === null}>
      <div className="rw-card !bg-[#121129] p-5 sm:p-6">
        <h2 id="rp-wallet-title" className="rw-display text-3xl">
          {copy.pickerTitle}
        </h2>
        <p className="mt-2 text-sm font-semibold text-[var(--rw-mute)]">{copy.pickerText}</p>
        {wallets.length > 0 ? (
          <ul className="mt-4 flex flex-col gap-2">
            {wallets.map((w) => (
              <li key={w.name}>
                <button
                  type="button"
                  disabled={busy !== null}
                  onClick={() => void signIn(w)}
                  className="flex w-full items-center gap-3 rounded-2xl border-[1.5px] border-white/15 bg-white/[0.06] px-3 py-3 text-left font-extrabold transition-colors hover:border-[#ffcb05] disabled:opacity-60"
                >
                  {/* Wallet icons are data: URIs the extension provides. */}
                  <img src={w.icon} alt="" width={30} height={30} className="h-[30px] w-[30px] rounded-lg" />
                  {w.name}
                  <span className="ml-auto text-[#ffcb05]" aria-hidden>
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            <p className="rw-say">{copy.none}</p>
            <p className="text-sm font-semibold text-[var(--rw-mute)]">{copy.noneText}</p>
            <div className="flex flex-wrap gap-2">
              {INSTALL.map((i) => (
                <a key={i.name} href={i.mobile && here ? i.mobile(here) : i.href} target="_blank" rel="noopener noreferrer" className="rw-btn rw-btn-ghost">
                  {i.name}
                </a>
              ))}
            </div>
          </div>
        )}
        {busy && (
          <p className="rp-dots mt-4 text-sm font-black text-[#8ec5ff]" role="status">
            {busy === "signing-in" ? copy.approveSignIn : copy.connectingDots}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-xl bg-[#ff5a47]/15 px-3 py-2 text-sm font-bold text-[#ff8a7a]" role="alert">
            {error}
          </p>
        )}
        <div className="mt-5 flex justify-end">
          <button type="button" onClick={closePicker} disabled={busy !== null} className="rw-btn rw-btn-ghost">
            {copy.close}
          </button>
        </div>
      </div>
    </Modal>
  );
}
