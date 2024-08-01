import { createSlice } from "@reduxjs/toolkit";

export const defaultSuccessState = {
  successState: false,
  successMessage: null,
};

export const successSlice = createSlice({
  name: "successSlice",
  initialState: defaultSuccessState,
  reducers: {
    setSuccess: (state, action) => {
      state.successState = true;
      state.successMessage = action.payload;
    },
    resetSuccess: (state) => {
      state.successState = false;
      state.successMessage = null;
    },
  },
});

export const { setSuccess, resetSuccess } = successSlice.actions;
export default successSlice.reducer;
