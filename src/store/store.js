import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
