import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'; 
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";
import adsReducer from "./adsSlice";


export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
    adsState: adsReducer,
    
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

