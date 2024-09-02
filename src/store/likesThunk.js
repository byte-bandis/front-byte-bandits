import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

export const getLikes = createAsyncThunk(
  "ads/getLikes",
  async (adId, { rejectWithValue }) => {
    try {
      const response = await client.get(`/likes/ads/${adId}`);

      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  },
);

export const getWishlist = createAsyncThunk(
  "ads/getWishlist",
  async ({ username, page }, { rejectWithValue }) => {
    try {
      console.log(username);
      console.log(page);

      const response = await client.get(
        `/likes/${username}/wishlist?page=${page}&limit=10`,
      );
      console.log(username);
      console.log(page);

      return response.likes;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  },
);
