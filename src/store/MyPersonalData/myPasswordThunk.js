import { createAsyncThunk } from "@reduxjs/toolkit";
import * as password from "../../pages/customer/myPersonalInfo/passwordService";

export const updateMyPasswordWithThunk = createAsyncThunk(
  "password/update",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      const response = await password.updateMyPassword(username, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const validateEmailForRestorePasswordThunk = createAsyncThunk(
  "restorePassword/validateEmail",
  async ({ email, type }, { rejectWithValue }) => {
    try {
      const response = await password.validateEmailForRestorePassword(
        email,
        type
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const sendMyRestoredPasswordThunk = createAsyncThunk(
  "restorePassword/restore",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      const response = await password.sendMyRestoredPassword(token, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
