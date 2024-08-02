import { configureStore } from "@reduxjs/toolkit";
import authReducer, { setRememberMe } from "./authSlice";
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";
import adsReducer from "./adsSlice";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    adsState: adsReducer,
    products: productsReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

store.dispatch(setRememberMe());
