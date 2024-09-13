import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const transactionsURL = "/transactions";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async ({ rejectWithValue }) => {
    try {
      const response = await client.get(`${transactionsURL}/getTransactions/`);

      if (response.data) {
        console.log(response.data);
        console.log(response.message);
        console.log(response.status);
        return {
          data: response.data,
          message: response.message,
          status: response.status,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);
