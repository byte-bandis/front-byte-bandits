import { createSlice } from "@reduxjs/toolkit";
import { loginWithThunk } from "./loginThunk";

export const defaultAuthState = {
  authState: false,
  loading: false,
  error: null,
};

export const checkAuthTokenSaved = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: defaultAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
    setRememberMe: (state) => {
      if (checkAuthTokenSaved()) {
        state.authState = checkAuthTokenSaved();
      }
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

export const { setAuth, setRememberMe } = authSlice.actions;
export default authSlice.reducer;
