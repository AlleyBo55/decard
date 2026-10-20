import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import api from "./api";
import combinedReducers, { type RootState } from "./combinedReducers";
import { createPersistMiddleware } from "./persist";

/** One store per server request and one per browser page load (see StoreProvider). */
export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(createPersistMiddleware()).concat(api.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type { RootState };

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
