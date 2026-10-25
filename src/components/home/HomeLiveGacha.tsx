"use client";

import { MotionConfig } from "motion/react";
import { FeaturedHit } from "@/components/gacha/FeaturedHit";
import { LiveFeed } from "@/components/gacha/LiveFeed";
import { OddsSnapshot } from "@/components/gacha/OddsSnapshot";
import { MotionLink, TAP } from "@/components/gacha/parts";
import { Reveal } from "@/components/motion";
import { SectionHead } from "@/components/ui";

/** Home highlight: the live gacha in a full-bleed band, like the live zone below it. */
export function HomeLiveGacha() {
  return (
    <MotionConfig reducedMotion="user">
      <Reveal className="mb-24">
        <section aria-label="Live gacha" className="full-bleed border-y-2 border-dashed border-sand bg-cream-lo/70 py-14 sm:py-16">
          <div className="mx-auto flex max-w-[1360px] flex-col gap-10 px-4 sm:px-6">
            <SectionHead
              kicker="Live gacha"
              title={
                <>
                  Packs ripping <span className="text-poke">right now.</span>
                </>
              }
              sub="Every Collector Crypt pack opening as it lands, the biggest hit lately, and what the next pull can give you."
            />
            <div className="grid items-start gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.78fr)_minmax(0,0.92fr)]">
              <LiveFeed rows={6} idPrefix="home-live" />
              <FeaturedHit className="md:pt-2" />
              <OddsSnapshot className="md:col-span-2 xl:col-span-1" />
            </div>
            <div className="flex flex-wrap gap-3">
              <MotionLink href="/luck#live" whileTap={TAP} className="btn btn-red min-h-11">
                Watch the live gacha
              </MotionLink>
              <MotionLink href="/luck" whileTap={TAP} className="btn btn-cream min-h-11">
                Score my pulls
              </MotionLink>
            </div>
          </div>
        </section>
      </Reveal>
    </MotionConfig>
  );
}
