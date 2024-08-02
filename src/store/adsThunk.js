import { createAsyncThunk } from '@reduxjs/toolkit';
import {client} from '../api/client';

const getAds = createAsyncThunk('ads/fetchAds', async (id='', { rejectWithValue }) => {
  try {
    const response = await client.get(`/ads/${id}`);
    console.log(response.data)
    return response.ads;
    
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response?.status,
    });
  }
});
export default getAds;