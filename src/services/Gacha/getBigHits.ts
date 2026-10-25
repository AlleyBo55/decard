import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { BigHitsPayload } from "@/lib/types";

/** The latest epic pulls (up to 100, roughly the last 12 hours), newest first. */
const getBigHits = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/gacha/hits",
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<BigHitsPayload>(fetchConfig);
  return response;
};

export default getBigHits;
