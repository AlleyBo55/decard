import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type WatchlistType = {
  /** Watched wallet addresses, in the order they were added. */
  wallets: string[];
};

const initialState: WatchlistType = {
  wallets: [],
};

const Watchlist = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    toggleWatch: (state: WatchlistType, action: PayloadAction<string>) => {
      const wallet = action.payload;
      state.wallets = state.wallets.includes(wallet)
        ? state.wallets.filter((w) => w !== wallet)
        : [...state.wallets, wallet];
    },
    /** Replace the list with the saved copy (page load, or another tab changed it). */
    hydrateWatchlist: (state: WatchlistType, action: PayloadAction<string[]>) => {
      state.wallets = action.payload;
    },
  },
});

export const { toggleWatch, hydrateWatchlist } = Watchlist.actions;

export default Watchlist.reducer;
