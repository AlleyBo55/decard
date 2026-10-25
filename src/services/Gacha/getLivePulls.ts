import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { LivePullsPayload } from "@/lib/types";

/** The latest pack openings on Collector Crypt, newest first (about the last two minutes). */
const getLivePulls = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/gacha/live",
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<LivePullsPayload>(fetchConfig);
  return response;
};

export default getLivePulls;
