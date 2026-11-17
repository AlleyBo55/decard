import Link from "@/components/LocaleLink";
import { artOf } from "@/components/rip/universes";
import { clsx } from "@/lib/clsx";
import { getStrings } from "@/lib/i18n/strings";
import { HighlightPanel } from "./HighlightPanel";
import { RipHighlightHits } from "./RipHighlightHits";
import { rich } from "./rich";

// Five Slabz packs, one per universe, the $500 PSA 10 pack in the middle.
const FAN = ["lorcana_100", "onepiece_50", "pokemon_psa10_500", "dragonball_50", "soccer_50"];
const MIDDLE = (FAN.length - 1) / 2;

/** A Pokémon-gym-style badge for the Rip Gym link: original shape, no game artwork. */
function GymBadge() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-7 w-7 shrink-0">
      <path d="M8 1.5h8L22.5 8v8L16 22.5H8L1.5 16V8z" fill="#ffcb05" stroke="#29263d" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8.8 5.5h6.4l3.3 3.3v6.4l-3.3 3.3H8.8l-3.3-3.3V8.8z" fill="#e0a800" />
      <path d="m12 7.2 1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4z" fill="#fffaf0" />
    </svg>
  );
}

/**
 * Home highlight for /rip: cream paper, a small hand of real Slabz packs and the latest pulls.
 * Server HTML; only the pulls list and the off-screen pause run in the browser.
 */
export async function RipHighlight() {
  const t = await getStrings();
  const r = t.home.ripCard;
  return (
    <HighlightPanel className="hl-card hl-rip">
      <div className="hl-rip-copy">
        <div className="flex flex-wrap items-center gap-3">
          <span className="hl-new">{t.common.new}</span>
          {/* <span className="hl-powered">
            Powered by
            <img src="/rip/slabz.webp?v=11a0a005" alt="Slabz" width={120} height={128} loading="lazy" decoding="async" />
          </span> */}
        </div>
        <h3 className="hl-title mt-5">{r.title}</h3>
        <p className="hl-hook mt-3">{rich(r.hook, { psa: <b>PSA</b>, bgs: <b>BGS</b>, cgc: <b>CGC</b> })}</p>
        <p className="hl-body mt-3">{r.body}</p>
      </div>

      <div className="hl-fan" aria-hidden>
        {FAN.map((type, i) => {
          const art = artOf(type);
          if (!art) return null;
          const o = i - MIDDLE;
          const middle = o === 0;
          return (
            <span
              key={type}
              className={clsx("hl-pack", middle && "hl-pack-mid")}
              style={{ ["--o" as string]: o, ["--a" as string]: Math.abs(o), zIndex: 10 - Math.abs(o) }}
            >
              <img
                src={art.small}
                // Only the middle pack is drawn wider than its 200px-tall small file.
                srcSet={middle ? `${art.small} ${Math.round((art.w * 200) / art.h)}w, ${art.src} ${art.w}w` : undefined}
                sizes={middle ? "124px" : undefined}
                alt=""
                width={art.w}
                height={art.h}
                loading="lazy"
                decoding="async"
              />
              {middle && <span className="hl-shine" />}
            </span>
          );
        })}
      </div>

      <div className="hl-actions">
        <Link href="/rip" className="hl-stretch">
          <span className="btn btn-red hl-cta">
            {r.cta} <span aria-hidden>→</span>
          </span>
        </Link>
        <Link href="/gym" className="hl-gym">
          <GymBadge />
          <span>{rich(r.gym, { gym: <b>{r.gymName}</b> })}</span>
        </Link>
      </div>

      <RipHighlightHits />
    </HighlightPanel>
  );
}
