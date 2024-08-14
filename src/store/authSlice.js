import { createSlice } from "@reduxjs/toolkit";
import { loginWithThunk } from "./loginThunk";
import storage from "../utils/storage";

const accessToken = storage.get("authToken");
const userName = storage.get("userName");
const userId = storage.get("userId");
export const defaultAuthState = {
  authState: !!accessToken,
  user: {
    userName: userName,
    userId: userId,
  },
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: defaultAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
    resetLoggedUserInfo: (state) => {
      state.user = defaultAuthState.user;
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

export const { setAuth, resetLoggedUserInfo } = authSlice.actions;
export default authSlice.reducer;
