import type { Tier } from "@/lib/rip/types";
import { Ball } from "./Ball";
import { TIER_INFO } from "./shared";
import type { UniverseId } from "./universes";

// Each universe shows rarity its own way: Poké Balls, Dragon Ball stars, Berry coins, gems and
// medals. Tiers keep one colour language everywhere: plain, blue, gold, purple.

type Family = "ball" | "orb" | "coin" | "gem" | "medal";
const FAMILY: Record<UniverseId, Family> = {
  pokemon: "ball",
  dragonball: "orb",
  onepiece: "coin",
  riftbound: "gem",
  lorcana: "gem",
  basketball: "medal",
  football: "medal",
  baseball: "medal",
  soccer: "medal",
  sports: "medal",
};

const METAL: Record<Tier, [string, string]> = {
  common: ["#e8b583", "#8f5427"],
  rare: ["#9fd0ff", "#2a6fc4"],
  epic: ["#ffe27a", "#b88400"],
  legendary: ["#e2b8ff", "#7a3fbf"],
};
const STARS: Record<Tier, [number, number][]> = {
  common: [[12, 12.5]],
  rare: [[9, 12.5], [15, 12.5]],
  epic: [[12, 8.8], [8.6, 14.6], [15.4, 14.6]],
  legendary: [[9, 9], [15, 9], [9, 15.2], [15, 15.2]],
};
const star = (x: number, y: number, r: number) => {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const d = i % 2 ? r * 0.45 : r;
    return `${(x + Math.cos(a) * d).toFixed(2)},${(y + Math.sin(a) * d).toFixed(2)}`;
  });
  return pts.join(" ");
};

export function TierMark({ u, tier, size = 18, label }: { u: UniverseId; tier: Tier; size?: number; label?: string }) {
  const family = FAMILY[u];
  if (family === "ball") return <Ball kind={TIER_INFO[tier].ball} size={size} label={label} />;
  const [hi, lo] = METAL[tier];
  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="shrink-0" {...a11y}>
      {family === "orb" && (
        <>
          <circle cx="12" cy="12" r="10.5" fill="#f7a23b" stroke="#a8520b" strokeWidth="1.5" />
          <ellipse cx="8.4" cy="7.4" rx="3.6" ry="2.4" fill="#fff" opacity=".55" />
          {STARS[tier].map(([x, y], i) => (
            <polygon key={i} points={star(x, y, tier === "legendary" ? 2.6 : 3)} fill="#d7261e" />
          ))}
        </>
      )}
      {family === "coin" && (
        <>
          <circle cx="12" cy="12" r="10.5" fill={hi} stroke={lo} strokeWidth="1.8" />
          <circle cx="12" cy="12" r="7.4" fill="none" stroke={lo} strokeWidth="1" strokeDasharray="1.6 1.4" />
          <text x="12" y="16.2" textAnchor="middle" fontSize="11" fontWeight="900" fill={lo} fontFamily="system-ui, sans-serif">
            ฿
          </text>
        </>
      )}
      {family === "gem" && (
        <>
          <polygon points="12,1.8 20.8,7 20.8,17 12,22.2 3.2,17 3.2,7" fill={hi} stroke={lo} strokeWidth="1.6" strokeLinejoin="round" />
          <polygon points="12,5.4 17.4,8.6 17.4,15.4 12,18.6 6.6,15.4 6.6,8.6" fill="#fff" opacity=".28" />
          <path d="M12 1.8v20.4M3.2 7l17.6 10M20.8 7 3.2 17" stroke={lo} strokeWidth=".7" opacity=".55" />
        </>
      )}
      {family === "medal" && (
        <>
          <path d="M7 1.5h4l2.4 7H9.4zM17 1.5h-4l-2.4 7h4z" fill={tier === "legendary" ? "#7a3fbf" : "#d23b3a"} />
          <circle cx="12" cy="15" r="7.6" fill={hi} stroke={lo} strokeWidth="1.6" />
          <polygon points={star(12, 15.2, 4)} fill={lo} opacity=".75" />
        </>
      )}
    </svg>
  );
}
