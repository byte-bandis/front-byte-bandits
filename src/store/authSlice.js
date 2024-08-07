import { createSlice } from "@reduxjs/toolkit";
import { loginWithThunk } from "./loginThunk";

const accessToken = localStorage.getItem("authToken");
export const defaultAuthState = {
  authState: !!accessToken,
  user: {
    userName: null,
    userId: null,
  },
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
    builder.addCase(loginWithThunk.fulfilled, (state, action) => {
      state.authState = true;
      state.user.userName = action.payload.user.userName;
      state.user.userId = action.payload.user.userId;
    });
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
