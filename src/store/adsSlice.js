import { createSlice } from "@reduxjs/toolkit";
import getAds from "./adsThunk";
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
  extraReducers: builder => {
    builder
      .addCase(getAds.pending, state => {
        state.loaded = false;
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.loaded = true;
        state.data = action.payload;
      })
      .addCase(getTotalAds.fulfilled, (state, action) => {
        state.totalAds = action.payload;
      })
  },
});
export default adsSlice.reducer;
export const { getAdsAction } = adsSlice.actions;