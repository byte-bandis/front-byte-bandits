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
import commentsSlice from "./commentsSlice";
import myAddressReducer from "./MyPersonalData/addressSlice";

export const store = configureStore({
  reducer: {
    commentsSlice: commentsSlice,
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    ui: uiReducer,
    adsState: adsReducer,
    publicProfiles: publicProfilesReducer,
    myAccount: myAccountReducer,
    likesSlice: likesReducer,
    singlePublicProfile: singleProfileReducer,
    myAddress: myAddressReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});
