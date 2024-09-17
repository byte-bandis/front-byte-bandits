import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const transactionsURL = "/transactions";
export const getTotalSellerTransactions = createAsyncThunk(
  "transactions/getTotalSellerTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(
        `${transactionsURL}/count/seller`,
      );
      if (response.data) {
        return  response.data
        
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
)
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

export const getTransactionsSeller = createAsyncThunk(
  "transactions/seller",
  async (params, { rejectWithValue }) => {
    const { page, limit } = params;
    try {
      const response = await client.get(`${transactionsURL}/seller?page=${page}&limit=${limit}`);
      
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

export const getTransactionsBuyer = createAsyncThunk(
  "transactions/buyer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(`${transactionsURL}/buyer`);

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
