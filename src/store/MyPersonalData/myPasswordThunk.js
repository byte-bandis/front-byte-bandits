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
