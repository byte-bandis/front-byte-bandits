import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../pages/auth/service";
import { setAuth } from "./authSlice";
import { setMessage } from "./uiSlice";

export const loginWithThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, requestStorage }, { rejectWithValue }) => {
    try {
      const response = await login(email, password, requestStorage);
      //dispatch(setAuth(true));
      return response;
    } catch (error) {
      const errorPayload = {
        message: error.message,
      };
      //dispatch(setMessage(errorPayload));
      return rejectWithValue(errorPayload);
    }
  }
);
