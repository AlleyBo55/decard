import Link from "@/components/LocaleLink";
import { getStrings } from "@/lib/i18n/strings";
import { HighlightPanel } from "./HighlightPanel";
import { rich } from "./rich";

// The globe is hand-drawn SVG in its own 320×250 coordinates: no map data loads on the home page.
const VB_W = 320;
const VB_H = 250;
const GLOBE = { cx: 160, cy: 146, r: 92 };
const CELL = 8;
const OX = GLOBE.cx - GLOBE.r;
const OY = GLOBE.cy - GLOBE.r;
// A made-up planet on an 8-unit pixel grid, Town Map style ("#" is land). Not a real coastline.
const LAND = [
  ".......................",
  "........###............",
  "......######....##.....",
  "....#########..####....",
  "...##########..#####...",
  "...#########...######..",
  "....########...#####...",
  ".....######...######...",
  "......####....########.",
  ".......###...#########.",
  "........##....########.",
  ".........##...#######..",
  ".........####..#####...",
  "..........####..####...",
  "..........#####.###....",
  "...........####.##.....",
  "...........###.........",
  "...........###......##.",
  "............##.....###.",
  "............#......##..",
];
const LAND_PATH = LAND.flatMap((row, y) => {
  const runs: string[] = [];
  for (let x = 0; x < row.length; ) {
    if (row[x] !== "#") {
      x++;
      continue;
    }
    let w = 0;
    while (row[x + w] === "#") w++;
    runs.push(`M${OX + x * CELL} ${OY + y * CELL}h${w * CELL}v${CELL}h-${w * CELL}z`);
    x += w;
  }
  return runs;
}).join("");
const cell = (x: number, y: number) => ({ x: OX + x * CELL + CELL / 2, y: OY + y * CELL + CELL / 2 });
const VAULT = cell(6, 7);
const HOME = cell(18, 7);
const TOWNS = [cell(3, 4), cell(12, 15), cell(19, 18)];
// The route is a circular arc from the vault up and over to home, so the parcel can fly it with
// one transform (rotate about the arc's centre, then turn back upright) on the GPU.
const SWEEP = 150;
const ROUTE = (() => {
  const dx = HOME.x - VAULT.x;
  const dy = HOME.y - VAULT.y;
  const chord = Math.hypot(dx, dy);
  const r = chord / 2 / Math.sin((SWEEP * Math.PI) / 360);
  const d = r * Math.cos((SWEEP * Math.PI) / 360);
  // Unit normal pointing down the screen, so the arc bulges up.
  const nx = -dy / chord;
  const ny = dx / chord;
  const cx = (VAULT.x + HOME.x) / 2 + nx * d;
  const cy = (VAULT.y + HOME.y) / 2 + ny * d;
  const deg = (p: { x: number; y: number }) => (Math.atan2(p.y - cy, p.x - cx) * 180) / Math.PI;
  return { r, cx, cy, from: deg(VAULT), to: deg(HOME) };
})();
const ARC = `M${VAULT.x} ${VAULT.y}A${ROUTE.r} ${ROUTE.r} 0 0 1 ${HOME.x} ${HOME.y}`;
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(2)}%`;

/** Original art: a pixel globe with a dotted route from the vault to your town. */
function RouteGlobe({ vault, town }: { vault: string; town: string }) {
  const { cx, cy, r } = GLOBE;
  return (
    <div className="hl-globe" aria-hidden>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`}>
        <defs>
          <radialGradient id="hl-ocean" cx="36%" cy="30%" r="80%">
            <stop offset="0" stopColor="#62b8ff" />
            <stop offset="0.55" stopColor="#2a75bb" />
            <stop offset="1" stopColor="#174b86" />
          </radialGradient>
          <radialGradient id="hl-shade" cx="36%" cy="30%" r="78%">
            <stop offset="0.5" stopColor="#0d1d45" stopOpacity="0" />
            <stop offset="1" stopColor="#0d1d45" stopOpacity="0.45" />
          </radialGradient>
          <clipPath id="hl-globe-clip">
            <circle cx={cx} cy={cy} r={r} />
          </clipPath>
        </defs>
        <ellipse cx={cx} cy={cy + r + 10} rx={r * 0.72} ry={9} fill="#29263d" opacity="0.1" />
        <circle cx={cx} cy={cy} r={r} fill="url(#hl-ocean)" />
        <g clipPath="url(#hl-globe-clip)">
          <path d={LAND_PATH} fill="#2c7a3c" transform="translate(0 3)" />
          <path d={LAND_PATH} fill="#7fd858" />
          <g fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="1">
            <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.3} />
            <ellipse cx={cx} cy={cy} rx={r * 0.45} ry={r} />
          </g>
          <circle cx={cx} cy={cy} r={r} fill="url(#hl-shade)" />
          <ellipse cx={cx - 36} cy={cy - 42} rx={24} ry={13} fill="#fff" opacity="0.18" transform={`rotate(-32 ${cx - 36} ${cy - 42})`} />
        </g>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#29263d" strokeWidth="2.5" />
        {TOWNS.map((t) => (
          <rect key={`${t.x}-${t.y}`} x={t.x - 3} y={t.y - 3} width={6} height={6} fill="#fffaf0" stroke="#29263d" strokeWidth="1.5" />
        ))}
        <path d={ARC} fill="none" stroke="#ffcb05" strokeOpacity="0.35" strokeWidth="7" strokeLinecap="round" />
        <path d={ARC} fill="none" stroke="#29263d" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="0.1 6.4" />
        {/* the vault: a strongroom door with its wheel */}
        <g transform={`translate(${VAULT.x} ${VAULT.y})`}>
          <rect x={-9} y={-9} width={18} height={18} rx={3.5} fill="#29263d" stroke="#fffaf0" strokeWidth="1.6" />
          <circle r={5.4} fill="#8d97ad" stroke="#ffcb05" strokeWidth="1.5" />
          <path d="M0-3.4v6.8M-3.4 0h6.8" stroke="#29263d" strokeWidth="1.4" strokeLinecap="round" />
        </g>
        {/* your town: a little house with a red roof */}
        <g transform={`translate(${HOME.x} ${HOME.y})`}>
          <rect x={-7} y={-2.5} width={14} height={10.5} fill="#fffaf0" stroke="#29263d" strokeWidth="1.6" />
          <path d="M-10-1.5 0-10.5l10 9z" fill="#e3350d" stroke="#29263d" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x={-2.2} y={2.2} width={4.4} height={5.8} fill="#29263d" />
        </g>
      </svg>
      <span
        className="hl-parcel"
        style={{
          left: pct(ROUTE.cx, VB_W),
          top: pct(ROUTE.cy, VB_H),
          ["--from" as string]: `${ROUTE.from.toFixed(1)}deg`,
          ["--to" as string]: `${ROUTE.to.toFixed(1)}deg`,
          ["--r" as string]: `${((ROUTE.r / VB_W) * 100).toFixed(2)}cqw`,
        }}
      />
      <span className="hl-tag" style={{ left: pct(VAULT.x, VB_W), top: pct(VAULT.y + 14, VB_H) }}>
        {vault}
      </span>
      <span className="hl-tag hl-tag-home" style={{ left: pct(HOME.x, VB_W), top: pct(HOME.y + 14, VB_H) }}>
        {town}
      </span>
    </div>
  );
}

/**
 * Home highlight for /redeem: the card's trip from the vault to your town. Static HTML; only the
 * frame's off-screen pause runs in the browser.
 */
export async function RedeemHighlight() {
  const t = await getStrings();
  const r = t.home.redeemCard;
  return (
    <HighlightPanel className="hl-card hl-redeem">
      <RouteGlobe vault={r.vault} town={r.town} />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="hl-new hl-new-blue">{t.common.new}</span>
          <span className="hl-eyebrow">{r.eyebrow}</span>
        </div>
        <h3 className="hl-title hl-title-sm mt-4">{rich(r.title, { em: <span className="text-azure-deep">{r.titleEm}</span> })}</h3>
        <p className="hl-body mt-3">{r.body}</p>
        <p className="mt-5">
          <Link href="/redeem" className="hl-stretch hl-more">
            {r.cta}
            <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </HighlightPanel>
  );
}
