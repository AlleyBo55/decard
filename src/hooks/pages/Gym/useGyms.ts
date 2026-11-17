import type { PoolCard, RipPack } from "@/lib/rip/types";
import type { RipPreview } from "@/services/Gym/types";
import { selectView, useRipPacksQuery, useRipPreviewQuery } from "@/store/api";
export interface GymPacks {
  /** True while the production catalog snapshot stands in for the live catalog. */
  preview: boolean;
  packs: RipPack[] | undefined;
  /** Preview only: each pack's card pool, so gym leaders need no request. */
  pools: Record<string, PoolCard[]> | undefined;
  fixture: RipPreview | undefined;
  isLoading: boolean;
  isError: boolean;
}
/**
 * The packs behind the gyms: the live catalog through /api/rip (a single pack on devnet), or with
 * `previewWanted` (development, ?preview=1) the production catalog snapshot, as /rip does. A
 * missing snapshot falls back to the live catalog.
 */
export function useGymPacks(previewWanted: boolean): GymPacks {
  const fx = useRipPreviewQuery(undefined, { skip: !previewWanted, selectFromResult: selectView });
  const preview = previewWanted && !fx.isError;
  const live = useRipPacksQuery(undefined, {
    skip: preview,
    pollingInterval: 60_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
  if (preview) return { preview, packs: fx.data?.packs, pools: fx.data?.pools, fixture: fx.data, isLoading: fx.isLoading, isError: false };
  return { preview, packs: live.data, pools: undefined, fixture: undefined, isLoading: live.isLoading, isError: live.isError };
}
