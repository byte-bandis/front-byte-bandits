import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const adsURL = '/ads';

const createAd = createAsyncThunk(
  'ads/create',
  async (adFormData, { rejectWithValue }) => {
    try {
      const response = await client.post(adsURL, adFormData);

      if (response.success) {
        return response.data;       
    } else throw new Error('Failed to create advert');
      } catch (error) {
        return rejectWithValue(error.message || error);
      }
  }
);

const getAds = createAsyncThunk(
  "ads/fetchAds",
  async (params = { page: 1, id: "" }, { rejectWithValue }) => {
    const { page, id } = params;
    try {
      const response = await client.get(`${adsURL}/${id}/?page=${page}&limit=8`);
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


export { createAd, getAds };
