import Link from "@/components/LocaleLink";
import type { Locale } from "@/lib/i18n";
import { KNOWN_AS, popularNames } from "@/lib/i18n/aliases";

/**
 * A franchise hub's most listed subjects with the names collectors use for them in this language,
 * one line each ("Shanks · Jeki"), linked to the scanner's search for the English name. The names
 * are page text, so search engines index them in the page's language. Renders nothing when the
 * language has no names for this franchise.
 */
export function AlsoKnownAs({ lang, slug }: { lang: Locale; slug: string }) {
  const rows = popularNames(lang, slug);
  if (rows.length === 0) return null;
  const copy = KNOWN_AS[lang];
  return (
    <section aria-labelledby="also-known-as" className="paper mt-10 flex flex-col gap-4 p-6">
      <h2 id="also-known-as" className="font-display text-2xl font-bold text-ink">
        {copy.title}
      </h2>
      <p className="text-ink-soft">{copy.lede}</p>
      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((row) => (
          <li key={row.search}>
            <Link
              href={`/scanner?search=${encodeURIComponent(row.search)}`}
              prefetch={false}
              className="text-ink-soft hover:text-poke-deep"
            >
              <span className="font-bold text-azure-deep">{row.search}</span> · {row.names.slice(0, 3).join(", ")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
