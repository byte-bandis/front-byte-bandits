import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPublicProfiles } from "../pages/customer/service";

export const getProfilesWithThunk = createAsyncThunk(
  "profiles/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPublicProfiles();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
