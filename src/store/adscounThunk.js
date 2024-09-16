import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api/client';

const getTotalAds = createAsyncThunk('ads/fetchTotalAds', async ( user, { rejectWithValue }) => {
  let url ='/ads/count/'

  if (user) {

    url += `?user=${user.user}`
    console.log(url)
  }
  try {
    const response = await client.get(url);
    return response.count;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});

export default getTotalAds;