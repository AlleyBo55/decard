import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { Activity } from "@/lib/types";

/** No mint or wallet means the whole marketplace tape. */
export interface ActivityParams {
  limit?: number;
  mint?: string;
  wallet?: string;
}

export interface ActivityPayload {
  activity: Activity[];
}

/** Decoded on-chain marketplace moves, newest first. */
const getActivity = async ({ limit, mint, wallet }: ActivityParams, signal?: AbortSignal) => {
  const p = new URLSearchParams();
  if (mint) p.set("mint", mint);
  if (wallet) p.set("wallet", wallet);
  if (limit) p.set("limit", String(limit));
  const fetchConfig: IFetchConfig = {
    url: `/api/activity?${p}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<ActivityPayload>(fetchConfig);
  return response;
};

export default getActivity;
