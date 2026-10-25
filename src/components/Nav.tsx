"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WalletSearch } from "@/components/WalletSearch";
import { SolTicker } from "@/components/SolTicker";
import { Pokedex, TownMap, Pulse, Books, BallSearch, Sparkle } from "@/components/icons";
import { clsx } from "@/lib/clsx";

const LINKS = [
  { href: "/", label: "Home", Icon: Pokedex },
  { href: "/scanner", label: "Scanner", Icon: TownMap },
  { href: "/tape", label: "Live Tape", Icon: Pulse },
  { href: "/luck", label: "Gacha", Icon: Sparkle },
  { href: "/guide", label: "Guide", Icon: Books },
];

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 shrink-0" aria-label="Decard home">
      <span className="pokeball pokeball-spin" style={{ ["--s" as string]: "30px" }} />
      <span className="logo-word text-[15px] sm:text-[17px] leading-none pt-0.5">DECARD</span>
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-sand/80 bg-cream/85 backdrop-blur-md">
        {/* Poké Ball red seam across the very top */}
        <div className="h-1 bg-poke" aria-hidden />
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 h-16 flex items-center gap-6">
          <Logo />

          <nav aria-label="Main" className="hidden md:flex items-center gap-7 ml-6">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={clsx(
                  "menu-item font-extrabold text-[0.95rem] transition-colors",
                  isActive(href) ? "text-ink" : "text-ink-mute hover:text-ink",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden xl:block">
              <SolTicker />
            </div>
            <div className="hidden md:block">
              <WalletSearch compact />
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen((o) => !o)}
              className="md:hidden grid place-items-center h-10 w-10 rounded-full bg-cream-hi border border-sand"
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <BallSearch className="h-5 w-5" />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 animate-pop">
            <WalletSearch autoFocus onDone={() => setSearchOpen(false)} />
          </div>
        )}
      </header>

      {/* mobile tab bar */}
      <nav
        aria-label="Main"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-sand bg-cream-hi/95 backdrop-blur pb-safe"
      >
        <div className="grid grid-cols-5">
          {LINKS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative flex flex-col items-center gap-1 pt-2.5 pb-1.5 text-[11px] font-extrabold",
                  active ? "text-poke-deep" : "text-ink-mute",
                )}
              >
                {active && <span className="absolute top-0 h-1 w-8 rounded-b-full bg-poke" aria-hidden />}
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
