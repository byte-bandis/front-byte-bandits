import { createAsyncThunk } from "@reduxjs/toolkit";
import * as payment from "../../pages/customer/myPersonalInfo/paymentService";

export const createMyCreditCardWithThunk = createAsyncThunk(
  "creditCard/create",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      const response = await payment.createMyCreditcard(username, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMyCreditCardWithThunk = createAsyncThunk(
  "creditCard/fetch",
  async (username, { rejectWithValue }) => {
    try {
      const response = await payment.getMyCreditCard(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMyCreditCardWithThunk = createAsyncThunk(
  "creditCard/update",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      const response = await payment.updateMyCreditCard(username, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetMyCreditCardWithThunk = createAsyncThunk(
  "creditCard/reset",
  async (username, { rejectWithValue }) => {
    try {
      const response = await payment.resetMyCreditCard(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMyCreditCardWithThunk = createAsyncThunk(
  "creditCard/delete",
  async (username, { rejectWithValue }) => {
    try {
      const response = await payment.deleteMyCreditCard(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
