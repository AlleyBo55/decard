import type { WalletLabel } from "./types";
import raw from "./wallet-labels.json";

// Curated, community-editable wallet labels: the Arkham/GMGN-style "who is
// this" list. Add an entry by opening a PR against src/lib/wallet-labels.json.
// Visitors layer private labels on top in their browser (LabelsProvider).

const KNOWN: Record<string, WalletLabel> = Object.fromEntries(
  Object.entries(raw as Record<string, { label: string; kind: string; note?: string }>).map(([wallet, v]) => [
    wallet,
    { wallet, label: v.label, kind: v.kind as WalletLabel["kind"], note: v.note },
  ]),
);

export function knownLabel(wallet: string | null | undefined): WalletLabel | null {
  if (!wallet) return null;
  return KNOWN[wallet] ?? null;
}

export const KNOWN_LABELS = KNOWN;
