import { createAsyncThunk } from "@reduxjs/toolkit";
import * as users from "../pages/customer/service";

/* export const deleteSinglePublicProfileWithThunk = createAsyncThunk(
  "publicProfile/delete",
  async (username, { rejectWithValue }) => {
    try {
      const response = await users.deleteUser(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); */

export const deleteUserWithThunk = createAsyncThunk(
  "user/delete",
  async (username, { rejectWithValue }) => {
    try {
      const response = await users.deleteUser(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
