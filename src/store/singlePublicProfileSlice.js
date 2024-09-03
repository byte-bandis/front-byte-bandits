import { createSlice } from "@reduxjs/toolkit";
import {
  createSinglePublicProfileWithThunk,
  deleteSinglePublicProfileWithThunk,
  getSinglePublicProfileWithThunk,
  updateSinglePublicProfileWithThunk,
} from "./profilesThunk";

export const singleProfileInitialState = {
  data: [],
};

const singleProfileSlice = createSlice({
  name: "singleProfileSlice",
  initialState: singleProfileInitialState,
  reducers: {
    setSingleProfile: (state, action) => {
      state.data = action.payload;
    },
    resetSinglePublicProfile: (state) => {
      state.data = singleProfileInitialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSinglePublicProfileWithThunk.fulfilled,
      (state, action) => {
        state.data = [...state.data, action.payload.data];
      }
    );
    builder.addCase(
      createSinglePublicProfileWithThunk.fulfilled,
      (state, action) => {
        state.data = [action.payload.newPublicProfile];
      }
    );
    builder.addCase(
      updateSinglePublicProfileWithThunk.fulfilled,
      (state, action) => {
        state.data = [action.payload.updatedPublicProfile];
      }
    );
    builder.addCase(deleteSinglePublicProfileWithThunk.fulfilled, (state) => {
      state.data = singleProfileInitialState.data;
    });
  },
});

export const { setSingleProfile, resetSinglePublicProfile } =
  singleProfileSlice.actions;
export default singleProfileSlice.reducer;
