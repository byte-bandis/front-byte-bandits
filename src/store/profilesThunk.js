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

export const getSinglePublicProfileWithThunk = createAsyncThunk(
  "singlePublicProfile/fetch",
  async (username, { rejectWithValue }) => {
    try {
      const response = await profiles.getSinglePublicProfile(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createSinglePublicProfileWithThunk = createAsyncThunk(
  "singlePublicProfile/create",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      const response = await profiles.createSinglePublicProfile(
        username,
        formData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateSinglePublicProfileWithThunk = createAsyncThunk(
  "singlePublicProfile/update",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      const response = await profiles.updateSinglePublicProfile(
        username,
        formData
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
