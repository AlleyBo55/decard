import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { HighlightsPayload } from "@/lib/types";

/** Home page feed: newest, top and best-deal listings, hot bids and the latest moves. */
const getHighlights = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/highlights",
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<HighlightsPayload>(fetchConfig);
  return response;
};

export default getHighlights;
