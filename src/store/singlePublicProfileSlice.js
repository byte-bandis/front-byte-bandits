import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setSingleProfile } = singleProfileSlice.actions;
export default singleProfileSlice.reducer;
