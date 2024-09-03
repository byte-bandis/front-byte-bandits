import { createSlice } from "@reduxjs/toolkit";
import { updateMyPasswordWithThunk } from "./myPasswordThunk";

export const defaultPasswordState = {
  data: {},
  validationErrors: {},
};

const myPasswordSlice = createSlice({
  name: "myPasswordSlice",
  initialState: defaultPasswordState,
  reducers: {
    setMyPassword: (state, action) => {
      state.data = action.payload;
    },
    emptyMyPassword: (state) => {
      state.data = defaultPasswordState;
    },
    setValidations: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMyPasswordWithThunk.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setMyPassword, emptyMyPassword } = myPasswordSlice.actions;
export default myPasswordSlice.reducer;
