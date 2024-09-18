import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

const getTotalAds = createAsyncThunk('ads/fetchTotalAds', async (filters = { }, { rejectWithValue }) => {
  let reqUrl = '/ads/count/?';

  for (const key in filters) {
    if (
      filters[key] !== undefined &&
      filters[key] !== null &&
      filters[key] !== "" &&
      filters[key] !== 0
    ) {
      reqUrl += `${key}=${filters[key]}&`;
    }
  }

  console.log(reqUrl)
  try {
    const response = await client.get(reqUrl);
    return response.count;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

export default getTotalAds;