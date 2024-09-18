import { createSlice } from "@reduxjs/toolkit";
import { getCountSellerTransactions, getTransactions, getTransactionsByUser } from "./transactionsThunk";

export const defaultTransactionState = {
  transactions: [],
  status: "",
  message: null,
  getTransactions: [],
  transactionsByUser: [],
  count: 0
};

const transactionSlice = createSlice({
  name: "transactionsSlice",
  initialState: defaultTransactionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.getTransactions = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getTransactionsByUser.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.transactionsByUser = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getCountSellerTransactions.fulfilled, (state, action) => {
        console.log(action.payload)
        state.count = action.payload;
      } )

      
  },
});

export const { clearOrdersReceived } = transactionSlice.actions;

export default transactionSlice.reducer;
