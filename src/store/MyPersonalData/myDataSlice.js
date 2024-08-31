import { createSlice } from "@reduxjs/toolkit";
import { getMyDataWithThunk, updateMyDataWithThunk } from "./myDataThunk";

export const defaultMyDataState = {
  data: {},
  validationErrors: {},
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
    setValidations: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetValidationErrors: (state) => {
      state.validationErrors = {};
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

export const { setMyData, emptyMyData, setValidations, resetValidationErrors } =
  myDataSlice.actions;
export default myDataSlice.reducer;
