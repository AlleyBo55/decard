import fetcher, { type IFetchConfig } from "@/helpers/fetcher";
import type { GachaMachinesPayload } from "@/lib/types";

/** Every public gacha machine with its published tier odds, sorted by category then price. */
const getGachaMachines = async (signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: "/api/gacha/machines",
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<GachaMachinesPayload>(fetchConfig);
  return response;
};

export default getGachaMachines;
