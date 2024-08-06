import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

const getTotalAds = createAsyncThunk('ads/fetchTotalAds', async (_, { rejectWithValue }) => {
  try {
    const response = await client.get('/ads/count');
    console.log(response.count)
    return response.count;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

export default getTotalAds;