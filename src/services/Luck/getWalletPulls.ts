import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { WalletPullsPayload } from "@/lib/types";

/** Fetch the pack memos in a wallet's on-chain history, newest first. Each memo is scored separately via getLuck. */
const getWalletPulls = async (wallet: string, signal?: AbortSignal) => {
  const params = new URLSearchParams({ wallet });
  const fetchConfig: IFetchConfig = {
    url: `/api/luck/wallet?${params}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<WalletPullsPayload>(fetchConfig);
  return response;
};

export default getWalletPulls;
