import { createSlice } from "@reduxjs/toolkit";
import { updateMyPasswordWithThunk } from "./myPasswordThunk";

export const defaultPasswordState = {
  data: {},
  state: "",
  message: "",
};

const myPasswordSlice = createSlice({
  name: "myPasswordSlice",
  initialState: defaultPasswordState,
  reducers: {
    setMyPassword: (state, action) => {
      state.data = action.payload;
    },
    emptyMyPassword: (state) => {
      state.data = {};
      state.state = "";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMyPasswordWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.state = action.payload.state;
      state.message = action.payload.message;
    });
  },
});

export const { setMyPassword, emptyMyPassword } = myPasswordSlice.actions;
export default myPasswordSlice.reducer;
