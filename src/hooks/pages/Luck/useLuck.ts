import { useLuckQuery } from "@/store/api";

/** A historical pull does not change, so fetch it once per canonical memo and never poll. */
export const useLuck = (memo: string) =>
  useLuckQuery(memo, {
    skip: !memo,
    pollingInterval: 0,
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
  });
