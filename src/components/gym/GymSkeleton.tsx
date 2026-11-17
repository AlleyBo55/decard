import type { GymPacks } from "@/hooks/pages/Gym/useGyms";
import { getStrings } from "@/lib/i18n/strings";
import { Gyms } from "./Gyms";
import { HallOfFame } from "./HallOfFame";
import { Ladder } from "./Ladder";
import "@/components/rip/rip.css";
import "./gym.css";

const LOADING = { isLoading: true, isError: false };
const PACKS: GymPacks = { preview: false, packs: undefined, pools: undefined, fixture: undefined, ...LOADING };

/**
 * The static HTML while the league loads: GymLab's own loading state, drawn by the same
 * components, so nothing on the page moves when the client takes over.
 */
export async function GymSkeleton() {
  const t = await getStrings();
  return (
    <div aria-busy="true" aria-label={t.gym.page.loading}>
      <Ladder decard={LOADING} slabz={LOADING} />
      <Gyms data={PACKS} />
      <HallOfFame league={LOADING} />
    </div>
  );
}
