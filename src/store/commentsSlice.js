import { createSlice } from "@reduxjs/toolkit";
import { getComments, createComment, updateComment } from "./commentsThunk";
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
        state.data = [ action.payload, ...state.data];
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.data = [action.payload];
      });
  },
});
export default commentsSlice.reducer;
export const {  setPageComments,resetComments } = commentsSlice.actions;
