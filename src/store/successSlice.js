import {
  createSlice,
  isAnyOf,
  isRejected,
  isFulfilled,
  isPending,
} from "@reduxjs/toolkit";

export const defaultSuccessState = {
  successState: false,
  successMessage: null,
};

export const successSlice = createSlice({
  name: "success",
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
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(isRejected), (state) => {
        state.loading = false;
      })
      .addMatcher(isAnyOf(isPending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(isFulfilled), (state, action) => {
        state.loading = true;
        state.successState = true;
        state.successMessage = action.payload;
      });
  },
});

export const { setSuccess, resetSuccess } = successSlice.actions;
export default successSlice.reducer;
