import { createSlice } from "@reduxjs/toolkit";
import { getProfilesWithThunk } from "./publicProflesThunk";

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
  },
  extraReducers: (builder) => {
    builder.addCase(getProfilesWithThunk.fulfilled, (state, action) => {
      state.data(action.payload);
    });
  },
});

export default publicProfilesSlice.reducer;
export const { setPublicProfiles } = publicProfilesSlice;
