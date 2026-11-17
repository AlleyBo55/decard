"use client";
import { useT } from "@/components/LocaleProvider";

/** The journey's frame while the app loads: route map, stage and pass in their final places. */
export function RedeemSkeleton() {
  const t = useT();
  return (
    <div className="rd-app" aria-busy="true" aria-label={t.redeem.lab.loading}>
      <div className="rd-route rd-skel" />
      <div className="rd-board">
        <div className="rd-stage">
          <div className="rd-skel h-10 w-2/3 rounded-xl" />
          <div className="rd-skel mt-4 h-5 w-1/2 rounded-lg" />
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rd-skel h-44 rounded-2xl" />
            <div className="rd-skel h-44 rounded-2xl" />
            <div className="rd-skel h-44 rounded-2xl" />
          </div>
        </div>
        <div className="rd-side">
          <div className="rd-skel h-[420px] rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
