import { createSlice, isAnyOf, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit";

export const defaultErrorState = {
  errorState: false,
  errorMessage: null,
  loading: false,
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
  extraReducers: (builder) => {
    builder
    .addMatcher(
      isAnyOf(isRejected),
      (state, action) => {
        state.errorState = true
        /* state.errorMessage = `${action.error.message} - ${action.payload.message} `; */
        state.errorMessage = action.payload;
        state.loading = false;
      }
    )
    .addMatcher(
      isAnyOf(isPending),
      (state) => {
        state.loading = true;
      }
    )
    .addMatcher(
      isAnyOf(isFulfilled),
      (state) => {
        state.loading = false;
      }
      
    )
  },
});

export const { setError, resetError } = errorSlice.actions;
export default errorSlice.reducer;
