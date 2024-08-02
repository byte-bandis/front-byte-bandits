import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import errorReducer from "./errorSlice";
import successReducer from "./successSlice";
import registerReducer from "./registerSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    products: productsReducer,
    error: errorReducer,
    success: successReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
