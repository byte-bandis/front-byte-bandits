import { createSlice } from "@reduxjs/toolkit";
import { deleteUserWithThunk } from "./userThunk";

export const userDefaultState = {
  data: {},
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: userDefaultState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUserWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const { setMyAccount } = userSlice.actions;
export default userSlice.reducer;
