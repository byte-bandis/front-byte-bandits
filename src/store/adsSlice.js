import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./errorSlice";
import getAds from "./adsThunk";
export const defaultadsState = {
  
    loaded: false,
    data: [],
    page: 1,
  
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
      .addCase(getAds.rejected, (state, action) => {
        state.loaded = false;
        setError({ message: action.error.message, status: action.error.response?.status })
        throw action.error;
      });
  },
});
export default adsSlice.reducer;
export const { getAdsAction } = adsSlice.actions;