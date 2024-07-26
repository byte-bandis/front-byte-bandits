import { createSlice } from "@reduxjs/toolkit";
import { login } from "../pages/auth/service";

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

export const loginThunk = (email, password) => async (dispatch) => {
  try {
    await login(email, password);
    dispatch(setAuth(true));
  } catch (error) {
    dispatch(setAuth(false));
    throw error;
  }
};

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
