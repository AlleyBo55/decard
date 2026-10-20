import { combineReducers } from "@reduxjs/toolkit";
import api from "./api";
import LabelsSlicer from "./slices/Labels";
import WatchlistSlicer from "./slices/Watchlist";

const combinedReducers = combineReducers({
  labels: LabelsSlicer,
  watchlist: WatchlistSlicer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

export default combinedReducers;
