import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

export const defaultUIState = {
  state: null,
  message: null,
  loading: false,
};

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: defaultUIState,
  reducers: {
    setMessage: (state, action) => {
      const { payload, type } = action.payload;
      state.state = type;
      state.message = typeof payload === "object" ? payload.message : payload;
    },
    resetMessage: (state) => {
      state.message = null;
      state.state = null;
    },
    resetUI: (state) => {
      state.state = null;
      state.message = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(isRejected), (state, action) => {
        state.state = "error";
        //state.message = action.error.message || action.payload;
        state.message = action.payload.message || action.payload;
        state.loading = false;
      })
      .addMatcher(isAnyOf(isPending), (state) => {
        state.loading = true;
      })
      .addMatcher(isAnyOf(isFulfilled), (state, action) => {
        state.loading = false;
        state.message = action.payload.message || null;
        state.state = "success";
      });
  },
});

export const { setMessage, resetMessage, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
