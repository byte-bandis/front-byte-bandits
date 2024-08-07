import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../pages/auth/service";

export const loginWithThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, requestStorage }, { rejectWithValue }) => {
    try {
      const response = await login(email, password, requestStorage);
      return response;
    } catch (error) {
      const errorPayload = {
        message: error.message,
      };
      return rejectWithValue(errorPayload);
    }
  }
);
