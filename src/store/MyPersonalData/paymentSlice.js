import { createSlice } from "@reduxjs/toolkit";
import {
  deleteMyCreditCardWithThunk,
  getMyCreditCardWithThunk,
  resetMyCreditCardWithThunk,
  updateMyCreditCardWithThunk,
} from "./myPaymentsThunk";

export const defaultPaymentState = {
  data: {},
};

const myPaymentsSlice = createSlice({
  name: "myPaymentsSlice",
  initialState: defaultPaymentState,
  reducers: {
    setMyPayment: (state, action) => {
      state.data = action.payload;
    },
    emptyMyPayment: (state) => {
      state.data = defaultPaymentState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyCreditCardWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(updateMyCreditCardWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(deleteMyCreditCardWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(resetMyCreditCardWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const { setMyPayment, emptyMyPayment } = myPaymentsSlice.actions;
export default myPaymentsSlice.reducer;
