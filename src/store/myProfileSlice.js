import { createSlice } from "@reduxjs/toolkit";
import { getMyProfileWithThunk } from "./profilesThunk";

export const myProfilesState = {
  data: {},
};

const myProfileSlice = createSlice({
  name: "myProfileSlice",
  initialState: myProfilesState,
  reducers: {
    setMyProfile: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProfileWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.myProfile;
    });
  },
});

export const { setMyProfile } = myProfileSlice.actions;
export default myProfileSlice.reducer;
