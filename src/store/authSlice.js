import { createSlice } from "@reduxjs/toolkit";

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

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
