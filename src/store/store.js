import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'; 
import errorReducer from "./errorSlice";
import registerReducer from "./registerSlice";



export const store = configureStore({
  reducer: {
    authState: authReducer,
    register: registerReducer,
    errorState: errorReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
});

