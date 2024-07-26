import { createSlice } from "@reduxjs/toolkit";

export const defaultErrorState = {
  errorState: false,
  errorMessage: null,
  errorStatus: null,
};

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState: defaultErrorState,
  reducers: {
    setError: (state, action) => {
      const { message, status } = action.payload;
      state.errorState = true;
      state.errorMessage = message;
      state.errorStatus = status;
    },
    resetError: (state) => {
      state.errorState = false;
      state.errorMessage = null;
      state.errorStatus = null;
    },
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
