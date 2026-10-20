import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { HomeActivityPayload, HomeListingsPayload, HomePart, HotBidsPayload } from "@/lib/types";

type PartPayload = {
  listings: HomeListingsPayload;
  activity: HomeActivityPayload;
  bids: HotBidsPayload;
};

/** One part of the home feed: listings rails, on-chain activity, or hot bids. Each loads on its own. */
const getHighlights = async <P extends HomePart>(part: P, signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: `/api/highlights?part=${part}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<PartPayload[P]>(fetchConfig);
  return response;
};

export default getHighlights;
