import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { SlabzLeague } from "./types";
/** The Slabz-wide league: the last 100 pulls across Slabz, folded per player (lib/league.ts). */
const getLeague = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/league",
    method: "GET",
    isPublic: true,
    signal,
  };
  return fetcher<SlabzLeague>(fetchConfig);
};
export default getLeague;
