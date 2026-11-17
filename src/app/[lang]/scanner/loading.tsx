import { PokeLoader } from "@/components/ui";
import { getStrings } from "@/lib/i18n/strings";

export default async function Loading() {
  const t = await getStrings();
  return <PokeLoader label={t.market.scanner.scanning} className="min-h-[50vh]" />;
}
