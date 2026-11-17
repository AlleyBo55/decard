"use client";

import { MotionConfig } from "motion/react";
import { useT } from "@/components/LocaleProvider";
import { SectionHead } from "@/components/ui";
import { HallOfFame } from "./HallOfFame";
import { LiveFeed } from "./LiveFeed";
import { PullNow } from "./PullNow";
import { rich } from "./rich";

/** The live gacha on /luck: feed and hall of fame side by side on wide screens, odds full width below. */
export function LiveGacha() {
  const copy = useT().luck.gacha;
  return (
    // Reduced motion: motion drops transforms and layout animations and keeps the fades.
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-8">
        <SectionHead
          kicker={copy.kicker}
          title={rich(copy.title, { accent: <span className="text-poke">{copy.titleAccent}</span> })}
          sub={copy.sub}
        />
        <div className="grid items-start gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <LiveFeed rows={12} idPrefix="luck-live" />
          <HallOfFame idPrefix="luck-hof" />
        </div>
        <PullNow idPrefix="luck-odds" />
      </div>
    </MotionConfig>
  );
}
