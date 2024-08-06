import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";
import productsReducer from "./productsSlice";
import uiReducer from "./uiSlice";
import adsReducer from "./adsSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    products: productsReducer,
    ui: uiReducer,
    adsState: adsReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
