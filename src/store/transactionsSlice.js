import { createSlice } from "@reduxjs/toolkit";
import {
  getTotalSellerTransactions,
  getTransactions,
  getTransactionsBuyer,
  getTransactionsSeller,
} from "./transactionsThunk";

export const defaultTransactionState = {
  transactions: [],
  status: "",
  message: null,
  ordersReceived: [],
  ordersSold: [],
  ordersBought: [],
  totalTransactions: 0,
};

const transactionSlice = createSlice({
  name: "transactionsSlice",
  initialState: defaultTransactionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.ordersReceived = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getTransactionsSeller.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(getTransactionsSeller.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.ordersSold = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getTransactionsSeller.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getTransactionsBuyer.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(getTransactionsBuyer.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.ordersBought = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getTransactionsBuyer.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getTotalSellerTransactions.fulfilled, (state, action) => {
        state.totalTransactions = action.payload;
      });
  },
});

export const { clearOrdersReceived } = transactionSlice.actions;

export default transactionSlice.reducer;
