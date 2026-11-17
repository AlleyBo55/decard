import type { BadgeKind } from "./art";

export type StepId = "checkin" | "party" | "region" | "home" | "review" | "release" | "journey";

/** A stop's title, short label and lede are t.redeem.steps[id]. */
export interface StepMeta {
  id: StepId;
  n: string;
  badge: BadgeKind;
  /** Where the stop sits on the route map, in % of its width and height. */
  at: readonly [number, number];
}

export const STEPS: readonly StepMeta[] = [
  { id: "checkin", n: "01", badge: "checkin", at: [6, 64] },
  { id: "party", n: "02", badge: "party", at: [21, 38] },
  { id: "region", n: "03", badge: "region", at: [36, 66] },
  { id: "home", n: "04", badge: "home", at: [50, 40] },
  { id: "review", n: "05", badge: "review", at: [64, 66] },
  { id: "release", n: "06", badge: "release", at: [79, 38] },
  { id: "journey", n: "07", badge: "journey", at: [94, 62] },
];

export const STEP_IDS = STEPS.map((s) => s.id);
export const stepIndex = (id: StepId) => STEP_IDS.indexOf(id);
export const isStepId = (v: string | null): v is StepId => v !== null && (STEP_IDS as string[]).includes(v);
