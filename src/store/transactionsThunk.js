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
  async (params={filters: {}}, { rejectWithValue }) => {
    const { filters } = params;

    let reqUrl = "?";
      for (const key in filters) {
        if (
          filters[key] !== undefined &&
          filters[key] !== null &&
          filters[key] !== "" &&
          filters[key] !== 0
        ) {
          reqUrl += `&${key}=${filters[key]}`;
        }
      }

      console.log(reqUrl)
    try {
      const response = await client.get(
        `${transactionsURL}/transactionsByUser/${reqUrl}`,
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
export const getCountTransactions = createAsyncThunk(
  "transactions/getTotalTransactions",
  async (rol, { rejectWithValue }) => {
    try {
      const response = await client.get(
        `${transactionsURL}/count/${rol}`,
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