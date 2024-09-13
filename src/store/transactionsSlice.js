import { createSlice } from "@reduxjs/toolkit";
import { createTransaction, getTransactions } from "./transactionsThunk";

export const defaultTransactionState = {
  transactions: [],
  status: "",
  message: null,
  ordersReceived: [],
};

const transactionSlice = createSlice({
  name: "transactionsSlice",
  initialState: defaultTransactionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        (state.status = action.payload.status),
          (state.transactions = [action.payload.data, ...state.transactions]),
          (state.message = action.payload.message);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.status = "error";
        state.transactions = action.payload;
      })
      .addCase(getTransactions.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        (state.status = action.payload.status),
          (state.ordersReceived = action.payload.data),
          (state.message = action.payload.message);
      })
      .addCase(getTransactions.rejected, (state, action) => {
        (state.status = action.payload.status),
          (state.status = action.payload.message);
      });
  },
});

export default transactionSlice.reducer;
