import { createSlice } from "@reduxjs/toolkit";
import { getTransactions, getTransactionsByUser } from "./transactionsThunk";

export const defaultTransactionState = {
  transactions: [],
  status: "",
  message: null,
  getTransactions: [],
  transactionsByUser: [],
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
        state.getTransactions = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getTransactionsByUser.pending, (state) => {
        state.status = "loading";
        state.message = null;
      })
      .addCase(getTransactionsByUser.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.transactionsByUser = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getTransactionsByUser.rejected, (state, action) => {
        state.status = action.payload.status;
        state.message = action.payload.message;
      });
  },
});

export const { clearOrdersReceived } = transactionSlice.actions;

export default transactionSlice.reducer;
