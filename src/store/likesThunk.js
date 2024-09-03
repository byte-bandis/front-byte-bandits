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
    async (params, { rejectWithValue }) => {
        const { page, limit } = params;
        try {
            const response = await client.get(`/likes/wishlist/?page=${page}&limit=${limit}`);

            console.log(response);
            return response.likes;
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status,
            });
        }
    }
);

