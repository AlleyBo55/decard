import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { RipPreview } from "./types";
/** Development only: the production catalog snapshot (app/api/rip/preview), so /gym?preview=1 shows every pack. */
const getRipPreview = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/rip/preview",
    method: "GET",
    isPublic: true,
    retries: 0,
    signal,
  };
  const body = await fetcher<Partial<RipPreview>>(fetchConfig);
  return { packs: Array.isArray(body.packs) ? body.packs : [], pools: body.pools ?? {} } satisfies RipPreview;
};
export default getRipPreview;
