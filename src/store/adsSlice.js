import { createSlice } from "@reduxjs/toolkit";
import { getAds, createAd, updateAd } from "./adsThunk";
import getTotalAds from "./adscounThunk";
export const defaultadsState = {
  loaded: false,
  data: [],
  page: 1,
  totalAds: 0,
  filters: {},
};

const adsSlice = createSlice({
  name: "adsSlice",
  initialState: defaultadsState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(getAds.fulfilled, (state, action) => {
        state.loaded = true;
        state.data = action.payload;
      })
      .addCase(getTotalAds.fulfilled, (state, action) => {
        state.totalAds = action.payload;
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.loaded = false;
        state.data = [action.payload];
      })
      .addCase(updateAd.fulfilled, (state, action) => {
        state.loaded = false;
        state.data = [action.payload];
      });
  },
});
export default adsSlice.reducer;
export const { getAdsAction, setPage, setFilters } = adsSlice.actions;
