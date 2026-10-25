import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { PullLuckPayload } from "@/lib/types";

/** Fetch one immutable historical pull-luck result by its canonical pack memo. */
const getLuck = async (memo: string, signal?: AbortSignal) => {
  const params = new URLSearchParams({ memo });
  const fetchConfig: IFetchConfig = {
    url: `/api/luck?${params}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<PullLuckPayload>(fetchConfig);
  return response;
};

export default getLuck;
