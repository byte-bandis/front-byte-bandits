import { createSlice } from "@reduxjs/toolkit";

export const defaultErrorState = {
  errorState: false,
  errorMessage: null,
};

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState: defaultErrorState,
  reducers: {
    setError: (state, action) => {
      state.errorState = true;
      state.errorMessage = action.payload;
    },
    resetError: (state) => {
      state.errorState = false;
      state.errorMessage = null;
    },
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
