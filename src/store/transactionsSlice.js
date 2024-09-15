import { createSlice } from "@reduxjs/toolkit";
import { getTransactions } from "./transactionsThunk";

export const defaultTransactionState = {
  transactions: [],
  status: "",
  message: null,
  ordersReceived: [], // Aquí guardamos las órdenes recibidas
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
      });
  },
});

export const { clearOrdersReceived } = transactionSlice.actions;

export default transactionSlice.reducer;
