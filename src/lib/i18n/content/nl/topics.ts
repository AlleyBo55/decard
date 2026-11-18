import type { Topic } from "../../../topics";
import { topics as first } from "./topics-a";
import { topics as second } from "./topics-b";

// Dutch topic guides, in two files so two translators can work at once: topics-a.ts holds the
// first eight topics of lib/topics.ts, topics-b.ts the last eight. Same slugs, section ids and hrefs.
export const topics: Topic[] = [...first, ...second];
