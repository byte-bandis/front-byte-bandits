import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";
import productsReducer from "./productsSlice";
import uiReducer from "./uiSlice";
import adsReducer from "./adsSlice";
import publicProfilesReducer from "./publicProfilesSlice";
import myAccountReducer from "./myAccountSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    products: productsReducer,
    ui: uiReducer,
    adsState: adsReducer,
    publicProfiles: publicProfilesReducer,
    myAccount: myAccountReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
