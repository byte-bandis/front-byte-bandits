import { createSlice } from "@reduxjs/toolkit";
import { getMyDataWithThunk, updateMyDataWithThunk } from "./myDataThunk";

export const defaultMyDataState = {
  data: {},
};

const myDataSlice = createSlice({
  name: "myDataSlice",
  initialState: defaultMyDataState,
  reducers: {
    setMyData: (state, action) => {
      state.data = action.payload;
    },
    emptyMyData: (state) => {
      state.data = defaultMyDataState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyDataWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(updateMyDataWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const { setMyData, emptyMyData } = myDataSlice.actions;
export default myDataSlice.reducer;
