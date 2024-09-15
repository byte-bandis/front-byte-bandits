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
export const getTotalLikes = createAsyncThunk(
    "ads/getTotalLikes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await client.get('/likes/wishlist/count');
            return response.count;
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status,
            });
        }
    },
)
export const getWishlist = createAsyncThunk(
    "ads/getWishlist",
    async (params, { rejectWithValue }) => {
        const { page, limit } = params;
        console.log(params)
        try {
            const response = await client.get(`/likes/wishlist/?page=${page}&limit=${limit}`);
            return response.likes;
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status,
            });
        }
    }

);
export const setLike = createAsyncThunk(
    "ads/setLike",
    async ({ adId, userId }, { rejectWithValue }) => {
        try {
            const body = { adId, userId };
            const response = await client.post('/likes/', body);
            if (response) {
                response.like.like = true;
                return response.like;
            }
                return  { ad:adId, user:userId, like: false };
            
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status,
            });
        }
    }
);

