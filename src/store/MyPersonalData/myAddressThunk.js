import { createAsyncThunk } from "@reduxjs/toolkit";
import * as address from "../../pages/customer/myPersonalInfo/addressService";

export const createMyAddressWithThunk = createAsyncThunk(
  "address/create",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      const response = await address.createMyAddress(username, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

export const resetMyAddressWithThunk = createAsyncThunk(
  "address/reset",
  async (username, { rejectWithValue }) => {
    try {
      const response = await address.resetMyAddress(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMyAddressWithThunk = createAsyncThunk(
  "address/delete",
  async (username, { rejectWithValue }) => {
    try {
      const response = await address.deleteMyAddress(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
