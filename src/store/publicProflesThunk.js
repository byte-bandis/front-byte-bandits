import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPublicProfiles } from "../pages/customer/service";
import { setMessage } from "./uiSlice";
import { setPublicProfiles } from "./publicProfilesSlice";

export const getProfilesWithThunk = createAsyncThunk(
  "profiles/fetch",
  async ({ dispatch, rejectWhithValue }) => {
    try {
      const response = await getPublicProfiles();
      console.log("Esto es response: ", response);
      dispatch(setPublicProfiles(response));
    } catch (error) {
      dispatch(setMessage(error.message));
      return rejectWhithValue(error.message);
    }
  }
);
