import { createSlice } from "@reduxjs/toolkit";

import { getLikes, getWishlist } from "./likesThunk";

export const defaultadsState = {
  adcrosslikes: {}, 
  wishlist: [], 
  loaded: false,  
};
const likesSlice = createSlice({
  name: "likesSlice",
  initialState: defaultadsState,
  reducers: {
    resetLikes: (state) => {
      state.adcrosslikes = {};
      state.wishlist = [];
      state.loaded = false;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLikes.pending, (state) => {
        state.loaded = false;
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.loaded = true;
       const adId = action.payload.adId;
       const count = action.payload.count;
        
        state.adcrosslikes = {...state.adcrosslikes, [adId] : count ?  count : count }
        })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loaded = true;
        console.log(action.payload)
        state.wishlist = action.payload.likes; 
      });
  },
});

export default likesSlice.reducer;
export const { increaseLikes, decreaseLikes,resetLikes } = likesSlice.actions;
