import { createSlice } from "@reduxjs/toolkit";

import { getLikes, getWishlist, setLike } from "./likesThunk";

export const defaultadsState = {
  adcrosslikes: {},
  wishlist: [],
  loaded: false,
  page: 1,
  filters: {},
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

        state.adcrosslikes = {
          ...state.adcrosslikes,
          [adId]: count ? count : count,
        };
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loaded = true;
        state.wishlist = action.payload;
      })
      .addCase(setLike.fulfilled, (state, action) => {
        if (action.payload.like) {
          state.wishlist = [...state.wishlist, action.payload];
          state.adcrosslikes = {
          
            ...state.adcrosslikes,
            [action.payload.ad]: state.adcrosslikes[action.payload.ad] ? state.adcrosslikes[action.payload.ad] + 1 : 1,
          };
        }else{
          state.wishlist = state.wishlist.filter(
          (like) => like.ad !== action.payload.ad && like.ad._id !== action.payload.ad
        );
        state.adcrosslikes = {
          
          ...state.adcrosslikes,
          [action.payload.ad]: state.adcrosslikes[action.payload.ad] - 1 ,
        };}
        
      });
  },
});

export default likesSlice.reducer;
export const { increaseLikes, decreaseLikes, resetLikes } = likesSlice.actions;
