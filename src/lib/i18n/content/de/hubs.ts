import type { CategoryHub } from "../../../category-hubs";
import { hubs as first } from "./hubs-a";
import { hubs as second } from "./hubs-b";

// German franchise hubs, in two files so two translators can work at once: hubs-a.ts holds the
// first nine hubs of lib/category-hubs.ts, hubs-b.ts the last nine. Same slug, category, related and terms.
export const hubs: CategoryHub[] = [...first, ...second];
