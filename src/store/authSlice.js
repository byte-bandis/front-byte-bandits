import { createSlice } from "@reduxjs/toolkit";
import { loginWithThunk } from "./loginThunk";

const accessToken = localStorage.getItem("authToken");
export const defaultAuthState = {
  authState: !!accessToken,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: defaultAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithThunk.fulfilled, (state) => {
        state.loading = false;
        state.authState = true;
      })
      .addCase(loginWithThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
