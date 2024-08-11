import { createSlice } from "@reduxjs/toolkit";
import {getAds, createAd, updateAd} from "./adsThunk";
import getTotalAds from "./adscounThunk";
export const defaultadsState = {
  loaded: false,
  data: [],
  page: 1,
  totalAds: 0,
};

const adsSlice = createSlice({
  name: "adsSlice",
  initialState: defaultadsState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAds.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.loaded = true;
        state.data = action.payload;
      })
      .addCase(getTotalAds.fulfilled, (state, action) => {
        state.totalAds = action.payload;
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.loaded = false;
        state.data = [];
      })
      .addCase(updateAd.fulfilled, (state, action) => {
        state.loaded = false;
        state.data = [];
      });
  },
});
export default adsSlice.reducer;
export const { getAdsAction, setPage } = adsSlice.actions;
