import { createSlice } from "@reduxjs/toolkit";
import { getSinglePublicProfileWithThunk } from "./profilesThunk";

export const singleProfileState = {
  data: {},
};

const singleProfileSlice = createSlice({
  name: "singleProfileSlice",
  initialState: singleProfileState,
  reducers: {
    setSingleProfile: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSinglePublicProfileWithThunk.fulfilled,
      (state, action) => {
        state.data = action.payload.publicProfileLoaded;
      }
    );
  },
});

export const { setSingleProfile } = singleProfileSlice.actions;
export default singleProfileSlice.reducer;
