import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import errorReducer from "./errorSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    errorState: errorReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
