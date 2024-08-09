import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const getAds = createAsyncThunk(
  "ads/fetchAds",
  async (params = { page: 1, id: "" }, { rejectWithValue }) => {
    const { page, id } = params;
    try {
      const response = await client.get(`/ads/${id}/?page=${page}&limit=8`);
      const result = response.ads || response.ad;
      return result;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);
export default getAds;
