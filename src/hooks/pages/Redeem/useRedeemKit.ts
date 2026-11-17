"use client";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRipWallet } from "@/components/rip/RipProvider";
import { insuredCents } from "@/lib/redeem/rates";
import type { RedeemApi, RedeemSigner, RedeemStatus } from "@/lib/redeem/types";
import { signMessage, toBase64 } from "@/lib/rip/wallet";
import type { CardRow } from "@/lib/types";
import { redeemApi } from "@/services/Redeem";
import { finishSignIn, startSignIn } from "@/services/Rip";
import { selectView, useHoldingsQuery } from "@/store/api";

// What the redeem page runs on: the live API with the connected wallet, or (development only,
// ?preview=1) the simulated shipping desk with fixture cards and a fake signer, so every step
// can be walked through without a wallet. The preview module is imported lazily and only
// outside production builds, so it never ships.

export interface RedeemKit {
  preview: boolean;
  /** False while the preview module loads. */
  ready: boolean;
  api: RedeemApi;
  signer: RedeemSigner | null;
  /** The connected wallet, signed in or not. */
  holder: string | null;
  cards: CardRow[];
  cardsLoading: boolean;
  cardsFailed: boolean;
  /** Signs in to Decard again when its session lapsed mid-flow. */
  resignIn: () => Promise<boolean>;
  /** Preview only: shipment ids to seed the journeys with. */
  seedShipments: string[];
}

interface PreviewKit {
  api: RedeemApi;
  signer: RedeemSigner;
  cards: CardRow[];
  past: string[];
}

const STATUSES: RedeemStatus[] = ["pending_burn", "processing", "shipped", "delivered", "failed", "cancelled"];

const byInsured = (a: CardRow, b: CardRow) => insuredCents(b.insuredValue) - insuredCents(a.insuredValue);

export function useRedeemKit(params: URLSearchParams | { get(k: string): string | null; has(k: string): boolean }): RedeemKit {
  const wantPreview = process.env.NODE_ENV !== "production" && params.has("preview");
  const failParam = params.get("fail") ?? "";
  const statusParam = params.get("status");
  const issue = params.has("issue");
  const [kit, setKit] = useState<PreviewKit | null>(null);

  useEffect(() => {
    if (!wantPreview) return;
    let alive = true;
    import("@/services/Redeem/preview").then((m) => {
      if (!alive) return;
      const fail = failParam.split(",").filter((f): f is (typeof m.PREVIEW_FAILS)[number] => (m.PREVIEW_FAILS as readonly string[]).includes(f));
      const status = STATUSES.find((s) => s === statusParam) ?? null;
      const { api, signer } = m.createPreviewKit({ fail, status, issue });
      setKit({ api, signer, cards: [...m.PREVIEW_CARDS].sort(byInsured), past: m.PREVIEW_PAST });
    });
    return () => {
      alive = false;
    };
  }, [wantPreview, failParam, statusParam, issue]);

  const w = useRipWallet();
  const { wallet, account, ready: signedIn, signAll, openPicker, cluster } = w;
  const holder = account?.address ?? null;
  const live = useMemo<RedeemSigner | null>(() => {
    if (!signedIn || !wallet || !account) return null;
    return {
      address: account.address,
      signMessage: async (message: string) => toBase64(await signMessage(wallet, account, message)),
      signAll,
    };
  }, [signedIn, wallet, account, signAll]);

  // The cards must be on the chain decardbe ships from: on devnet they're devnet NFTs, which only
  // Collector Crypt's devnet API lists. Waits for the backend's cluster, so it reads one chain once.
  const holdingsArg = wantPreview || !holder || !cluster ? skipToken : cluster === "devnet" ? { wallet: holder, network: "devnet" as const } : holder;
  const holdings = useHoldingsQuery(holdingsArg, { selectFromResult: selectView });
  const liveCards = useMemo(() => [...(holdings.data?.cards ?? [])].sort(byInsured), [holdings.data]);

  const resignIn = useCallback(async () => {
    if (wantPreview) return true;
    if (!wallet || !account) {
      openPicker();
      return false;
    }
    try {
      const challenge = await startSignIn(account.address);
      const signature = await signMessage(wallet, account, challenge.message);
      await finishSignIn(challenge.token, toBase64(signature));
      return true;
    } catch {
      return false;
    }
  }, [wantPreview, wallet, account, openPicker]);

  if (wantPreview) {
    return {
      preview: true,
      ready: kit !== null,
      api: kit?.api ?? redeemApi,
      signer: kit?.signer ?? null,
      holder: kit?.signer.address ?? null,
      cards: kit?.cards ?? [],
      cardsLoading: kit === null,
      cardsFailed: false,
      resignIn,
      seedShipments: kit?.past ?? [],
    };
  }
  return {
    preview: false,
    ready: true,
    api: redeemApi,
    signer: live,
    holder,
    cards: liveCards,
    // Still loading until the backend's cluster is known: until then no chain has been read.
    cardsLoading: Boolean(holder) && (!cluster || holdings.isLoading),
    cardsFailed: holdings.isError,
    resignIn,
    seedShipments: [],
  };
}
