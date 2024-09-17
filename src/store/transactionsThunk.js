import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const transactionsURL = "/transactions";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, { rejectWithValue }) => {
    try {
      console.log("entra en transactionsThunk");
      const response = await client.get(`${transactionsURL}/getTransactions/`);

      console.log("Respuesta recibida", response);
      if (response.data) {
        console.log(response.data);
        console.log(response.message);
        console.log(response.status);
        return {
          data: response.data,
          message: response.message,
          status: response.state,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

export const getTransactionsSeller = createAsyncThunk(
  "transactions/seller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(`${transactionsURL}/seller`);

      if (response.data) {
        console.log(response.data);
        console.log(response.message);
        console.log(response.status);
        return {
          data: response.data,
          message: response.message,
          status: response.state,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

export const getTransactionsBuyer = createAsyncThunk(
  "transactions/buyer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(`${transactionsURL}/buyer`);

      if (response.data) {
        console.log(response.data);
        console.log(response.message);
        console.log(response.status);
        return {
          data: response.data,
          message: response.message,
          status: response.state,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);

export const getTransactionsByUser = createAsyncThunk(
  "transactionsByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(
        `${transactionsURL}/transactionsByUser`,
      );

      if (response.data) {
        console.log(response.data);
        console.log(response.message);
        console.log(response.state);
        return {
          data: response.data,
          message: response.message,
          status: response.state,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);
