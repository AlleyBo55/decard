import { useEffect, useState } from "react";
import type { SuggestPayload } from "@/services/Suggest/getSuggest";
import { useSuggestQuery } from "@/store/api";

const selectSuggest = ({
  data,
  currentData,
  isFetching,
}: {
  data?: SuggestPayload;
  currentData?: SuggestPayload;
  isFetching: boolean;
}) => ({ data, currentData, isFetching });

/**
 * Typeahead suggestions for a card search. Waits 220ms after the last
 * keystroke and skips anything under 2 characters. `data` keeps the last
 * answer on screen while the next one loads; `currentData` is only the answer
 * for the current query.
 */
export const useSuggest = (query: string) => {
  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query), 220);
    return () => window.clearTimeout(id);
  }, [query]);
  return useSuggestQuery(debounced, {
    skip: debounced.length < 2,
    selectFromResult: selectSuggest,
  });
};
