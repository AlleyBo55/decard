import { selectView, useHighlightsQuery } from "@/store/api";

/** Home feed shared by the hero, the ticker and every home section: one 20s poll. */
export const useHighlights = () =>
  useHighlightsQuery(undefined, {
    pollingInterval: 20_000,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
