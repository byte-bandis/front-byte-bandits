import { createAsyncThunk } from "@reduxjs/toolkit";
import * as myData from "../../pages/customer/myPersonalInfo/userDataService";

export const getMyDataWithThunk = createAsyncThunk(
  "mydata/fetch",
  async (username, { rejectWithValue }) => {
    try {
      const response = await myData.getMyData(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMyDataWithThunk = createAsyncThunk(
  "mydata/update",
  async ({ username, formData }, { rejectWithValue }) => {
    try {
      console.log("Esto es formdata en el thunk de data: ", formData);
      const response = await myData.updateMyData(username, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* export const resetMyAddressWithThunk = createAsyncThunk(
  "mydata/reset",
  async (username, { rejectWithValue }) => {
    try {
      const response = await myData.resetMyAddress(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); */

/* export const deleteUserWithThunk = createAsyncThunk(
  "user/delete",
  async (username, { rejectWithValue }) => {
    try {
      const response = await User.deleteUser(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
); */
