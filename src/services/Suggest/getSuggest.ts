import fetcher, { type IFetchConfig } from "@/helpers/fetcher";

export interface Suggestion {
  mint: string;
  name: string;
  grade: string | null;
  gradingCompany: string | null;
  category: string | null;
  price: number | null;
  currency: string | null;
}

export interface SuggestPayload {
  results: Suggestion[];
  total: number;
}

/** Typeahead matches for a card search. */
const getSuggest = async (q: string, signal?: AbortSignal) => {
  const fetchConfig: IFetchConfig = {
    url: `/api/suggest?q=${encodeURIComponent(q)}`,
    method: "GET",
    isPublic: true,
    signal,
  };
  const response = await fetcher<SuggestPayload>(fetchConfig);
  return response;
};

export default getSuggest;
