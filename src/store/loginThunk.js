import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../pages/auth/service";
import { setError } from "./errorSlice";
import { setAuth } from "./authSlice";

export const loginWithThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password, requestStorage },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await login(email, password, requestStorage);
      dispatch(setAuth(true));
      return response;
    } catch (error) {
      const errorPayload = {
        message: error.message,
      };
      dispatch(setError(errorPayload));
      return rejectWithValue(errorPayload);
    }
  }
);
