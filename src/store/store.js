import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import registerReducer from "./registerSlice";
import uiReducer from "./uiSlice";
import adsReducer from "./adsSlice";
import publicProfilesReducer from "./publicProfilesSlice";
import likesReducer from "./likesSlice";
import singleProfileReducer from "./singlePublicProfileSlice";
import commentsSlice from "./commentsSlice";
import myAddressReducer from "./MyPersonalData/addressSlice";
import myPaymentsReducer from "./MyPersonalData/paymentSlice";
import myDataReducer from "./MyPersonalData/myDataSlice";
import userReducer from "./userSlice";
import passwordReducer from "./MyPersonalData/passwordSlice";
import transactionsReducer from "./transactionsSlice";

export const store = configureStore({
  reducer: {
    commentsSlice: commentsSlice,
    authState: authReducer,
    register: registerReducer,
    ui: uiReducer,
    adsState: adsReducer,
    publicProfiles: publicProfilesReducer,
    likesSlice: likesReducer,
    singlePublicProfile: singleProfileReducer,
    myAddress: myAddressReducer,
    myPayment: myPaymentsReducer,
    myData: myDataReducer,
    account: userReducer,
    password: passwordReducer,
    transactions: transactionsReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  //devTools: true,
});
