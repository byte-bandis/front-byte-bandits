import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setRememberMe } from "./authSlice";
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    products: productsReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

store.dispatch(setRememberMe());
