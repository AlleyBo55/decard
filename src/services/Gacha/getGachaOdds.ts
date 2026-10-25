import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { GachaOddsPayload } from "@/lib/types";

/** "If you pull now" for one machine code. 404 with code UNKNOWN_PACK when the pack isn't open. */
const getGachaOdds = async (code: string, signal?: AbortSignal) => {
  const params = new URLSearchParams({ code });
  const fetchConfig: IFetchConfig = {
    url: `/api/gacha/odds?${params}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<GachaOddsPayload>(fetchConfig);
  return response;
};

export default getGachaOdds;
