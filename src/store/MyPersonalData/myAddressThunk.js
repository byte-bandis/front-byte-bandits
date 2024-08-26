import { createAsyncThunk } from "@reduxjs/toolkit";
import * as address from "../../pages/customer/myPersonalInfo/service";

export const getAddressWithThunk = createAsyncThunk(
  "address/fetch",
  async (username, { rejectWithValue }) => {
    try {
      const response = await address.getMyAddress(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMyAddressWithThunk = createAsyncThunk(
  "address/update",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      const response = await address.updateMyAddress(username, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* export const getMyAccountWithThunk = createAsyncThunk(
  "myAccount/fetch",
  async (username, { rejectWithValue }) => {
    try {
      const response = await profiles.getMyAccount(username);
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

export const deleteSinglePublicProfileWithThunk = createAsyncThunk(
  "singlePublicProfile/delete",
  async (username, { rejectWithValue }) => {
    try {
      const response = await profiles.deleteSinglePublicProfile(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 */
