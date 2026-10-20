"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletSearch } from "@/components/WalletSearch";
import { Pokedex, TownMap, Pulse, Books } from "@/components/icons";
import { clsx } from "@/lib/clsx";

const LINKS = [
  { href: "/", label: "Home", Icon: Pokedex },
  { href: "/scanner", label: "Scanner", Icon: TownMap },
  { href: "/tape", label: "Tape", Icon: Pulse },
  { href: "/guide", label: "Guide", Icon: Books },
];

export function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* top bar — crimson Pokédex chassis */}
      <header className="sticky top-0 z-40 chassis backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-3 sm:px-5 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="lens relative grid place-items-center h-7 w-7 rounded-full">
              <span className="led h-1.5 w-1.5 rounded-full bg-white text-white" />
            </span>
            <span className="flex gap-1">
              <span className="led h-2 w-2 rounded-full bg-dex-red-dark text-dex-red-dark" />
              <span className="led h-2 w-2 rounded-full bg-dex-yellow text-dex-yellow" style={{ animationDelay: "0.3s" }} />
              <span className="led h-2 w-2 rounded-full bg-dex-green text-dex-green" style={{ animationDelay: "0.6s" }} />
            </span>
            <span className="pixel text-xs sm:text-sm text-white drop-shadow ml-1">CARDEX</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-2">
            {LINKS.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                  isActive(href)
                    ? "bg-black/25 text-white font-medium"
                    : "text-white/75 hover:text-white hover:bg-black/15",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden md:block">
            <WalletSearch compact />
          </div>
        </div>
      </header>

      {/* mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 chassis border-t border-dex-red-dark pb-safe">
        <div className="grid grid-cols-4">
          {LINKS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex flex-col items-center gap-1 py-2.5 text-[10px]",
                isActive(href) ? "text-dex-yellow" : "text-white/75",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
