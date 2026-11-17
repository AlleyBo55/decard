"use client";
import { useSearchParams } from "next/navigation";
import { useGymPacks } from "@/hooks/pages/Gym/useGyms";
import { useDecardLeague, useSlabzLeague } from "@/hooks/pages/Gym/useLeague";
import { Gyms } from "./Gyms";
import { HallOfFame } from "./HallOfFame";
import { Ladder } from "./Ladder";
import "@/components/rip/rip.css";
import "./gym.css";

/**
 * The /gym page's live part: both trainer ladders on one podium, every pack as a gym, and the
 * biggest pulls on Slabz. Development only: ?preview=1 swaps in the production catalog snapshot
 * (devnet has a single pack), and ?preview=1&trainers=N a made-up Decard ladder of N trainers.
 */
export function GymLab() {
  const params = useSearchParams();
  const previewWanted = process.env.NODE_ENV !== "production" && params.has("preview");
  const size = previewWanted && params.has("trainers") ? Math.min(100, Math.max(0, Math.floor(Number(params.get("trainers")) || 0))) : null;
  const packs = useGymPacks(previewWanted);
  const decard = useDecardLeague(size === null ? null : { fixture: packs.fixture, size });
  const slabz = useSlabzLeague();
  return (
    <>
      {previewWanted && (
        <p className="fixed left-3 top-[74px] z-[45] max-w-[calc(100vw-24px)] rounded-full bg-[#ffcb05] px-3 py-1.5 text-xs font-black text-[#29263d] shadow-lg">
          {packs.preview && packs.fixture
            ? `Preview: production catalog${size === null ? "" : `, ${size} made-up Decard trainers`}`
            : packs.preview
              ? "Loading the preview catalog… (scripts/rip-preview.mjs)"
              : "No preview catalog: showing the live one"}
        </p>
      )}
      <Ladder decard={decard} slabz={slabz} />
      <Gyms data={packs} league={slabz.data} decard={decard.data} />
      <HallOfFame league={slabz} />
    </>
  );
}
