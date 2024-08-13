import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPublicProfiles } from "../pages/customer/service";
import * as profiles from "../pages/customer/service";

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

export const getMyAccountWithThunk = createAsyncThunk(
  "profiles/myProfile",
  async (username, { rejectWithValue }) => {
    try {
      const response = await profiles.getMyAccount(username);
      console.log("Esto es response de getMyProfileWithThunk: ", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
