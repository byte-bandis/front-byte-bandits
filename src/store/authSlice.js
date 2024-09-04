import { createSlice } from "@reduxjs/toolkit";
import { loginWithThunk } from "./loginThunk";
import storage from "../utils/storage";

const getDefaultAuthState = () => ({
  authState: !!storage.get("authToken"),
  user: {
    userName: storage.get("userName"),
    userId: storage.get("userId"),
    updatedAt: storage.get("updatedAt"),
  },
});

export const authSlice = createSlice({
  name: "authSlice",
  initialState: getDefaultAuthState(),
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
    resetLoggedUserInfo: (state) => {
      const defaultState = getDefaultAuthState();
      state.authState = defaultState.authState;
      state.user = defaultState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithThunk.fulfilled, (state, action) => {
      state.authState = true;
      state.user.userName = action.payload.user.userName;
      state.user.userId = action.payload.user.userId;
      state.user.updatedAt = action.payload.user.updatedAt;
    });
  },
});

export const { setAuth, resetLoggedUserInfo } = authSlice.actions;
export default authSlice.reducer;
