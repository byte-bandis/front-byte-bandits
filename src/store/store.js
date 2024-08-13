import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";
import uiReducer from "./uiSlice";
import adsReducer from "./adsSlice";
import publicProfilesReducer from "./publicProfilesSlice";
import myAccountReducer from "./myAccountSlice";
import likesReducer from "./likesSlice";
import singleProfileReducer from "./singlePublicProfileSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    ui: uiReducer,
    adsState: adsReducer,
    publicProfiles: publicProfilesReducer,
    myAccount: myAccountReducer,
    likesSlice: likesReducer,
    singlePublicProfile: singleProfileReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
