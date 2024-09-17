import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const commentsURL = "/comments";

const createComment = createAsyncThunk(
  "comments/createComments",
  async ({ comment, productId }, { rejectWithValue }) => {
    try {
      const response = await client.post(`${commentsURL}/${productId}`, comment);

      if (response.success) {

        return response.data;
      } else throw new Error("Failed to create comment");
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

const getComments = createAsyncThunk(
  "comments/fetchComments",
  async (productId, { rejectWithValue }) => {


    try {
      const response = await client.get(`${commentsURL}/${productId}`);
      const result = response.data;
      return result;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  },
);

const updateComment = createAsyncThunk(
  "comments/updateComments",
  async (params, { rejectWithValue }) => {
    const { commentId, adFormData } = params;
    try {
      const response = await client.put(`${commentsURL}/${commentId}`, adFormData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

const deleteComment = createAsyncThunk(
  "comments/deleteComments",
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await client.delete(`${commentsURL}/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

export { createComment, getComments, updateComment, deleteComment  };
