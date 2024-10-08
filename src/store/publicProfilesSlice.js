import { createSlice } from "@reduxjs/toolkit";
import { getProfilesWithThunk } from "./profilesThunk";

export const defaultPublicProfilesState = {
  data: [],
};

const publicProfilesSlice = createSlice({
  name: "publicProfilesSlice",
  initialState: defaultPublicProfilesState,
  reducers: {
    setPublicProfiles: (state, action) => {
      state.data = action.payload;
    },
    resetPublicProfiles: defaultPublicProfilesState,
  },
  extraReducers: (builder) => {
    builder.addCase(getProfilesWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.usersPublicProfiles;
    });
  },
});

export const { setPublicProfiles } = publicProfilesSlice.actions;
export default publicProfilesSlice.reducer;
