import { createSlice } from "@reduxjs/toolkit";
import getAds from "./adsThunk";
export const defaultadsState = {
  
    loaded: false,
    data: [],
    page: 1,
  
};

 const adsSlice = createSlice({
  name: "adsSlice",
  initialState: defaultadsState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAds.pending, state => {
        state.loaded = false;
      })
      .addCase(getAds.fulfilled, (state, action) => {
        state.loaded = true;
        state.data = action.payload;
      })
  },
});
export default adsSlice.reducer;
export const { getAdsAction, setPage } = adsSlice.actions;