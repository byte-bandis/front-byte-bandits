import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const transactionsURL = "/transactions";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async ({ rejectWithValue }) => {
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
          status: response.status,
        };
      }
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  },
);
