import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../pages/register/service";
import { setSuccess } from "./successSlice";
import { setError } from "./errorSlice";

const initialStateRegister = {
  loading: false,
  validationErrors: {},
};

export const registerAsync = createAsyncThunk(
  "register/registerAsync",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await register(userData);
      dispatch(setSuccess("User registered correctly."));
      return response;
    } catch (error) {
      dispatch(setError(error.message));
      return rejectWithValue(error.message);
    }
  },
);
export const registerSlice = createSlice({
  name: "register",
  initialState: initialStateRegister,
  reducers: {
    setValidations: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetForm: (state) => {
      state.loading = false;
      state.validationErrors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setValidations, resetForm } = registerSlice.actions;
export default registerSlice.reducer;
