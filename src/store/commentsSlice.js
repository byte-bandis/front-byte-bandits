import { createSlice } from "@reduxjs/toolkit";
import { getComments, createComment, updateComment, deleteComment } from "./commentsThunk";
export const defaultadsState = {
  data: [],
  page: 1,
};

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState: defaultadsState,
  reducers: {
    setPageComments: (state, action) => {
      state.page = action.payload;
    },
    resetComments: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data];
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const newComment = action.payload;
        state.data = state.data.filter(comment => comment._id !== newComment._id);
        state.data = [newComment, ...state.data];
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        console.log(action.payload)
        state.data = state.data.filter(comment => comment._id !== action.payload);
      })
      

  },
});
export default commentsSlice.reducer;
export const { setPageComments, resetComments } = commentsSlice.actions;
