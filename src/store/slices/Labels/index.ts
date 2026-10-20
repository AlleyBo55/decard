import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { WalletLabel } from "@/lib/types";

export type LabelsType = {
  /** Private wallet labels saved in this browser, keyed by wallet. */
  labels: Record<string, WalletLabel>;
};

const initialState: LabelsType = {
  labels: {},
};

const Labels = createSlice({
  name: "labels",
  initialState,
  reducers: {
    /** Name a wallet; an empty label removes it. */
    setLabel: (state: LabelsType, action: PayloadAction<{ wallet: string; label: string }>) => {
      const { wallet } = action.payload;
      const label = action.payload.label.trim();
      if (label) state.labels[wallet] = { wallet, label: label.slice(0, 32), kind: "custom" };
      else delete state.labels[wallet];
    },
    /** Replace every label with the saved copy (page load, or another tab changed it). */
    hydrateLabels: (state: LabelsType, action: PayloadAction<Record<string, WalletLabel>>) => {
      state.labels = action.payload;
    },
  },
});

export const { setLabel, hydrateLabels } = Labels.actions;

export default Labels.reducer;
