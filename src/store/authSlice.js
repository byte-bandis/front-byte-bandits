import { createSlice } from "@reduxjs/toolkit";
import { login } from "../pages/auth/service";
import { setError } from "./errorSlice";

export const defaultAuthState = {
  authState: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState: defaultAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.authState = action.payload;
    },
  },
});

export const loginThunk =
  (email, password, requestStorage) => async (dispatch) => {
    try {
      await login(email, password, requestStorage);
      dispatch(setAuth(true));
    } catch (error) {
      console.log(error.message);
      dispatch(setAuth(false));
      dispatch(
        setError({ message: error.message, status: error.response?.status })
      );
      throw error;
    }
  };

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
