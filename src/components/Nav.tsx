"use client";

import Link from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { WalletSearch } from "@/components/WalletSearch";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LocaleProvider";
import { SolTicker } from "@/components/SolTicker";
import { BallSearch, Chevron, Close as CloseIcon, MenuGrid, Pokedex, Pulse, TownMap } from "@/components/icons";
import { LEARN, MARKET, PLAY, inGroup, isCurrent, isDarkPath, onPath, type NavGroup, type NavItem } from "@/components/nav/links";
import { artOf } from "@/components/rip/universes";
import { clsx } from "@/lib/clsx";

export function Logo() {
  const { messages } = useLocale();
  return (
    <Link href="/" className="group flex items-center gap-2.5 shrink-0" aria-label={messages.homeLabel}>
      <span className="pokeball pokeball-spin" style={{ ["--s" as string]: "30px" }} />
      <span className="logo-word text-[15px] sm:text-[17px] leading-none pt-0.5">DECARD</span>
    </Link>
  );
}

type MenuId = NavGroup["id"];

// Three Slabz packs for the featured Rip tile: small WebPs, fetched only once a menu shows them.
const FAN = ["onepiece_50", "pokemon_psa10_500", "dragonball_50"].flatMap((t) => artOf(t) ?? []);
const [RIP, ...PLAY_REST] = PLAY.items;

// Home, Scanner, Rip (raised in the middle) and Live tape; everything else is in More.
const TABS = [
  { href: "/", label: "Home", Icon: Pokedex },
  { href: "/scanner", label: "Scanner", Icon: TownMap },
  { href: "/rip", label: "Rip", Icon: null },
  { href: "/tape", label: "Live tape", Icon: Pulse },
];
const SHEET_ITEMS = [...MARKET.items, ...PLAY.items, ...LEARN.items];

const current = (pathname: string, href: string) => (isCurrent(pathname, href) ? "page" : undefined);

/** The last tile of a sheet group when the tiles (Rip, a full row of its own, aside) don't pair up. */
function loneTile(group: NavGroup, item: NavItem) {
  const tiles = group.items.filter((i) => i !== RIP);
  const k = tiles.indexOf(item);
  return k === tiles.length - 1 && k % 2 === 0;
}

function PackFan() {
  return (
    <span className="nav-fan" aria-hidden>
      {FAN.map((art, i) => (
        <img
          key={art.src}
          src={art.small}
          alt=""
          width={art.w}
          height={art.h}
          loading="lazy"
          decoding="async"
          style={{ ["--o" as string]: i - 1, ["--a" as string]: Math.abs(i - 1), zIndex: i === 1 ? 2 : 1 }}
        />
      ))}
    </span>
  );
}

function ItemLink({ item, pathname, onPick }: { item: NavItem; pathname: string; onPick: () => void }) {
  const { messages } = useLocale();
  const copy = messages.nav[item.href];
  const title = copy?.title ?? item.title;
  const desc = copy?.desc ?? item.desc;
  const { href, Icon, fresh } = item;
  return (
    <Link href={href} onClick={onPick} aria-current={current(pathname, href)} className="nav-item">
      <span className="nav-item-icon">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="nav-item-title">
          {title}
          {fresh && <span className="nav-new">{messages.new}</span>}
        </span>
        <span className="nav-item-desc">{desc}</span>
      </span>
    </Link>
  );
}

function FeaturedLink({ pathname, onPick, className }: { pathname: string; onPick: () => void; className?: string }) {
  const { messages } = useLocale();
  const copy = messages.nav[RIP.href];
  return (
    <Link href={RIP.href} onClick={onPick} aria-current={current(pathname, RIP.href)} className={clsx("nav-featured", className)}>
      <PackFan />
      <span className="nav-new">{messages.new}</span>
      <span className="nav-featured-title">{copy?.title ?? RIP.title}</span>
      <span className="nav-item-desc">{copy?.desc ?? RIP.desc}</span>
      <span className="nav-featured-cta" aria-hidden>
        {messages.ripCta}
      </span>
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const { messages } = useLocale();
  const dark = isDarkPath(pathname);
  const uid = useId();
  const navRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  // Each overlay remembers the path it opened on, so any navigation closes it without an effect.
  // A menu opened by hovering closes when the pointer leaves; a click pins it open.
  const [menu, setMenu] = useState<{ id: MenuId; path: string; pinned: boolean } | null>(null);
  const [searchAt, setSearchAt] = useState<string | null>(null);
  const [sheetAt, setSheetAt] = useState<string | null>(null);
  const openId = menu?.path === pathname ? menu.id : null;
  const searchOpen = searchAt === pathname;
  const sheetOpen = sheetAt === pathname;

  const closeMenu = () => {
    window.clearTimeout(hoverTimer.current);
    setMenu(null);
  };
  const closeSheet = () => setSheetAt(null);

  // Escape (focus goes back to the trigger) and a press anywhere outside close an open menu.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const hadFocus = document.getElementById(`${uid}-${openId}`)?.contains(document.activeElement);
      setMenu(null);
      if (hadFocus) document.getElementById(`${uid}-${openId}-btn`)?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openId, uid]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // The More sheet is a native modal <dialog>: it traps focus, closes on Escape and sits in the top layer.
  useEffect(() => {
    const d = sheetRef.current;
    if (!d) return;
    if (sheetOpen && !d.open) d.showModal();
    else if (!sheetOpen && d.open) d.close();
  }, [sheetOpen]);

  const hover = (id: MenuId) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    // The first open waits a beat, so sweeping across the bar doesn't flash a panel; switching is instant.
    hoverTimer.current = window.setTimeout(
      () => setMenu((m) => (m?.path === pathname && m.id === id ? m : { id, path: pathname, pinned: false })),
      openId ? 0 : 90,
    );
  };
  const unhover = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMenu((m) => (m?.pinned ? m : null)), 160);
  };
  const toggle = (id: MenuId) => {
    window.clearTimeout(hoverTimer.current);
    setMenu((m) => (m?.path === pathname && m.id === id && m.pinned ? null : { id, path: pathname, pinned: true }));
  };
  // Tabbing out of a menu closes it. A click on the panel's padding blurs to nothing: that stays open.
  const blur = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && !e.currentTarget.contains(next)) setMenu(null);
  };

  const menuFor = (group: NavGroup, panel: React.ReactNode, badge?: React.ReactNode) => {
    const id = `${uid}-${group.id}`;
    return (
      <div id={id} className="relative" onPointerEnter={hover(group.id)} onPointerLeave={unhover} onBlur={blur}>
        <button
          id={`${id}-btn`}
          type="button"
          aria-expanded={openId === group.id}
          aria-controls={`${id}-panel`}
          data-current={inGroup(pathname, group.items) || undefined}
          onClick={() => toggle(group.id)}
          className="menu-item nav-link"
        >
          {messages.groups[group.id].label}
          {badge}
          <Chevron className="nav-caret" />
        </button>
        <div id={`${id}-panel`} hidden={openId !== group.id} className="nav-pop">
          {panel}
        </div>
      </div>
    );
  };

  const tabMore = !TABS.some((t) => onPath(pathname, t.href)) && SHEET_ITEMS.some((i) => onPath(pathname, i.href));

  return (
    <>
      <header className={clsx("site-header", dark && "is-dark")}>
        {/* Poké Ball red seam across the very top; the route progress bar runs along it. */}
        <div className="h-[3px] bg-poke" aria-hidden />
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 h-16 flex items-center gap-4">
          <Logo />

          <nav ref={navRef} aria-label={messages.mainNav} className="hidden md:flex items-center gap-7 ml-6 lg:ml-10">
            <Link href="/scanner" aria-current={current(pathname, "/scanner")} className="menu-item nav-link">
              {messages.tabs["/scanner"]}
            </Link>
            {menuFor(
              MARKET,
              <div className="nav-panel w-[360px]">
                <ul aria-labelledby={`${uid}-market-btn`}>
                  {MARKET.items.map((item) => (
                    <li key={item.href}>
                      <ItemLink item={item} pathname={pathname} onPick={closeMenu} />
                    </li>
                  ))}
                </ul>
              </div>,
            )}
            {menuFor(
              PLAY,
              <div className="nav-panel w-[340px] lg:w-[584px] lg:grid lg:grid-cols-[212px_minmax(0,1fr)] lg:gap-2">
                <FeaturedLink pathname={pathname} onPick={closeMenu} className="max-lg:!hidden" />
                <ul aria-labelledby={`${uid}-play-btn`}>
                  <li className="lg:hidden">
                    <ItemLink item={RIP} pathname={pathname} onPick={closeMenu} />
                  </li>
                  {PLAY_REST.map((item) => (
                    <li key={item.href}>
                      <ItemLink item={item} pathname={pathname} onPick={closeMenu} />
                    </li>
                  ))}
                </ul>
              </div>,
              <span className="nav-dot">
                <span className="sr-only">{messages.newSuffix}</span>
              </span>,
            )}
            <Link href="/guide" aria-current={current(pathname, "/guide")} className="menu-item nav-link">
              {messages.guide}
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden xl:block">
              <SolTicker className="sol-pill" />
            </div>
            <div className="hidden lg:block">
              <WalletSearch compact />
            </div>
            <LanguageSwitcher dark={dark} />
            <button
              type="button"
              onClick={() => setSearchAt(searchOpen ? null : pathname)}
              className="nav-icon-btn lg:!hidden"
              aria-label={messages.search}
              aria-expanded={searchOpen}
            >
              <BallSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="lg:hidden mx-auto max-w-[1360px] px-4 sm:px-6 pb-3 animate-pop">
            <WalletSearch autoFocus onDone={() => setSearchAt(null)} />
          </div>
        )}
      </header>

      {/* mobile tab bar */}
      <nav aria-label={messages.mainNav} className={clsx("tabbar md:hidden", dark && "is-dark")}>
        <ul className="grid grid-cols-5">
          {TABS.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link href={href} aria-current={current(pathname, href)} className={clsx("tab", !Icon && "tab-rip")}>
                {Icon ? (
                  <Icon />
                ) : (
                  <span className="tab-ball" aria-hidden>
                    <span className="pokeball" style={{ ["--s" as string]: "30px" }} />
                  </span>
                )}
                {messages.tabs[href] ?? label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setSheetAt(pathname)}
              aria-haspopup="dialog"
              aria-expanded={sheetOpen}
              aria-controls={`${uid}-sheet`}
              data-current={tabMore || undefined}
              className="tab"
            >
              <MenuGrid />
              {messages.more}
            </button>
          </li>
        </ul>
      </nav>

      <dialog
        ref={sheetRef}
        id={`${uid}-sheet`}
        aria-labelledby={`${uid}-sheet-title`}
        className={clsx("sheet", dark && "is-dark")}
        onClose={closeSheet}
        // A press on the backdrop lands on the <dialog> itself.
        onClick={(e) => e.target === e.currentTarget && closeSheet()}
      >
        {sheetOpen && (
          <div className="sheet-body">
            <div className="sheet-grab" aria-hidden />
            <div className="flex items-center justify-between gap-4">
              <h2 id={`${uid}-sheet-title`} className="sheet-title">
                {messages.more}
              </h2>
              <button type="button" onClick={closeSheet} className="sheet-close" aria-label={messages.close}>
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <WalletSearch onDone={closeSheet} />
            </div>
            {[MARKET, PLAY].map((group) => (
              <section key={group.id} aria-labelledby={`${uid}-sheet-${group.id}`}>
                <h3 id={`${uid}-sheet-${group.id}`} className="sheet-label">
                  {messages.groups[group.id].label} <span>· {messages.groups[group.id].blurb}</span>
                </h3>
                <ul className="sheet-grid">
                  {group.items.map((item) =>
                    item === RIP ? (
                      <li key={item.href} className="col-span-2">
                        <FeaturedLink pathname={pathname} onPick={closeSheet} className="is-row" />
                      </li>
                    ) : (
                      // Tiles pair up; an odd one out at the end takes the whole row.
                      <li key={item.href} className={clsx(loneTile(group, item) && "col-span-2")}>
                        <SheetTile item={item} pathname={pathname} onPick={closeSheet} />
                      </li>
                    ),
                  )}
                </ul>
              </section>
            ))}
            <section aria-labelledby={`${uid}-sheet-learn`}>
              <h3 id={`${uid}-sheet-learn`} className="sheet-label">
                {messages.groups.learn.label}
              </h3>
              <ul className="sheet-grid">
                {LEARN.items.map((item) => (
                  <li key={item.href}>
                    <SheetTile item={item} pathname={pathname} onPick={closeSheet} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </dialog>
    </>
  );
}

function SheetTile({ item, pathname, onPick }: { item: NavItem; pathname: string; onPick: () => void }) {
  const { messages } = useLocale();
  const { href, Icon } = item;
  const title = messages.nav[href]?.title ?? item.title;
  return (
    <Link href={href} onClick={onPick} aria-current={current(pathname, href)} className="sheet-tile">
      <span className="nav-item-icon">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">{title}</span>
    </Link>
  );
}
