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

export const getMyProfileWithThunk = createAsyncThunk(
  "profiles/myProfile",
  async (username, { rejectWithValue }) => {
    try {
      const response = await profiles.getMyProfile(username);
      console.log("Esto es response en myProfileThunk: ", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
