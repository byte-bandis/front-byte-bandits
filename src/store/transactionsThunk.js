import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const transactionsURL = "/transactions";

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction",
  async ({ adId, userId }, { rejectWithValue }) => {
    try {
      const response = await client.post(`${transactionsURL}/${adId}`, {
        userId,
      });
      if (response.data) {
        console.log(response.data);
        console.log(response.message);
        console.log(response.status);
        return {
          data: response.data,
          message: response.message,
          status: response.status,
        };
      } else throw new Error("Failure to create transaction");
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || error);
    }
  },
);
