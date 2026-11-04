import Link from "next/link";
import { Logo } from "@/components/Nav";
import { CATEGORY_HUBS } from "@/lib/category-hubs";
import { REPO_URL } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/scanner", label: "Listing scanner" },
      { href: "/cards", label: "Card directory" },
      { href: "/scanner?orderBy=deal", label: "Best deals" },
      { href: "/tape", label: "Live tape" },
      { href: "/luck#live", label: "Live gacha" },
      { href: "/luck", label: "Pull luck analyzer" },
      { href: "/cards-token", label: "$CARDS token" },
      { href: "/sales", label: "Recent sales" },
      { href: "/pokemon", label: "Pokémon prices" },
    ],
  },
  {
    title: "Franchises",
    links: [
      ...CATEGORY_HUBS.slice(0, 9).map((hub) => ({ href: `/cards/${hub.slug}`, label: `${hub.name} cards` })),
      { href: "/cards", label: "Every listed card" },
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

/** GitHub's mark (Octicons, MIT), to link the repository. */
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-10 border-t-2 border-dashed border-sand bg-cream-lo/60">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4 max-w-sm">
          <Logo />
          <p className="text-ink-soft">
            Gotta scan &apos;em all. A free, open-source Pokédex for tokenized graded cards, read straight from
            Collector Crypt and the Solana chain.
          </p>
          {/* The repo, as a key-style card: the one outbound link we want every visitor to see. */}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener"
            className="group flex items-center gap-3 rounded-xl border-2 border-ink bg-cream-hi px-4 py-3 shadow-[0_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_var(--color-ink)]"
          >
            <GitHubMark className="h-8 w-8 shrink-0 text-ink transition-transform group-hover:rotate-[-8deg]" />
            <span className="flex min-w-0 flex-col gap-1">
              <span className="font-pixel text-[9px] leading-none text-poke-deep">OPEN SOURCE · MIT</span>
              <span className="truncate font-extrabold text-ink group-hover:text-poke-deep">
                {REPO_URL.replace(/^https:\/\//, "")}
              </span>
              <span className="text-sm text-ink-soft">Star it, fork it, ship a PR ★</span>
            </span>
          </a>
          <div className="flex items-center gap-2 font-pixel text-[8px] text-ink-mute">
            <span className="h-[3px] w-10 rounded bg-berry" />
            <span className="h-[3px] w-10 rounded bg-azure" />
            BUILT IN PUBLIC
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <span className="kicker">{col.title}</span>
            <ul className="flex flex-col gap-2 pl-0.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    prefetch={false}
                    className="font-bold text-ink-soft hover:text-poke-deep transition-colors"
                  >
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
          Data: Collector Crypt public API and Solana RPC. Not financial advice. Source:{" "}
          <a href={REPO_URL} target="_blank" rel="noopener" className="font-bold text-azure-deep hover:text-poke-deep">
            {REPO_URL.replace(/^https:\/\//, "")}
          </a>
          . Psst: try ↑ ↑ ↓ ↓ ← → ← → B A.
        </p>
      </div>
    </footer>
  );
}
