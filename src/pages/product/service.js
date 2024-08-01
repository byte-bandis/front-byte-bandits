import { client } from '../../api/client';
import { createAsyncThunk } from "@reduxjs/toolkit";


const getAds = createAsyncThunk('ads/fetchAds', async (_, { rejectWithValue }) => {
    try {
      const response = await client.get('/ads');
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
