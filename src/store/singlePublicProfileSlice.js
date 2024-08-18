import { createSlice } from "@reduxjs/toolkit";
import {
  createSinglePublicProfileWithThunk,
  getSinglePublicProfileWithThunk,
  updateSinglePublicProfileWithThunk,
} from "./profilesThunk";

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
    resetSinglePublicProfile: (state) => {
      state.data = singleProfileState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSinglePublicProfileWithThunk.fulfilled,
      (state, action) => {
        state.data = action.payload.publicProfileLoaded;
      }
    );
    builder.addCase(
      createSinglePublicProfileWithThunk.fulfilled,
      (state, action) => {
        state.data = action.payload.newPublicProfile;
      }
    );
    builder.addCase(
      updateSinglePublicProfileWithThunk.fulfilled,
      (state, action) => {
        state.data = action.payload.updatedPublicProfile;
      }
    );
  },
});

export const { setSingleProfile, resetSinglePublicProfile } =
  singleProfileSlice.actions;
export default singleProfileSlice.reducer;
