import Link from "next/link";
import { Logo } from "@/components/Nav";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/scanner", label: "Listing scanner" },
      { href: "/cards", label: "Card directory" },
      { href: "/scanner?orderBy=deal", label: "Best deals" },
      { href: "/tape", label: "Live tape" },
      { href: "/sales", label: "Recent sales" },
      { href: "/pokemon", label: "Pokémon prices" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/tokenized-trading-cards", label: "Tokenized cards explained" },
      { href: "/guide", label: "Trainer's Guide" },
      { href: "/guide#grading", label: "What is grading?" },
      { href: "/guide#buying-and-selling", label: "Deal score" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t-2 border-dashed border-sand bg-cream-lo/60">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4 max-w-sm">
          <Logo />
          <p className="text-ink-soft">
            Gotta scan &apos;em all. A free, open-source Pokédex for tokenized graded cards, read straight from
            Collector Crypt and the Solana chain.
          </p>
          <div className="flex items-center gap-2 font-pixel text-[8px] text-ink-mute">
            <span className="h-[3px] w-10 rounded bg-berry" />
            <span className="h-[3px] w-10 rounded bg-azure" />
            OPEN SOURCE · MIT
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="kicker">{col.title}</span>
            <ul className="flex flex-col gap-2 pl-0.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-bold text-ink-soft hover:text-poke-deep transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-sand">
        <p className="mx-auto max-w-[1360px] px-4 sm:px-6 py-5 text-xs text-ink-mute leading-relaxed">
          Fan-made and not affiliated with Nintendo, Creatures, GAME FREAK, The Pokémon Company or Collector Crypt.
          Data: Collector Crypt public API and Solana RPC. Not financial advice. Psst: try ↑ ↑ ↓ ↓ ← → ← → B A.
        </p>
      </div>
    </footer>
  );
}
