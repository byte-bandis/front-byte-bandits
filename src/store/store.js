import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";
import uiReducer from "./uiSlice";
import adsReducer from "./adsSlice";
import publicProfilesReducer from "./publicProfilesSlice";
import myProfileReducer from "./myProfileSlice";
import likesReducer from "./likesSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    ui: uiReducer,
    adsState: adsReducer,
    publicProfiles: publicProfilesReducer,
    myProfile: myProfileReducer,
    likesSlice: likesReducer, 
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
