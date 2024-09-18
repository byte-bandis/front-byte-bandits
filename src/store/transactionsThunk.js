import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const transactionsURL = "/transactions";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(`${transactionsURL}/getTransactions/`);

      if (response.data) {
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
        return {
          data: response.data,
          // message: response.message,
          status: response.state,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);
export const getCountSellerTransactions = createAsyncThunk(
  "transactions/getTotalSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(
        `${transactionsURL}/count/seller`,
      );
      if (response.data) {
        console.log(response.data)
        return  response.data
        
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
)