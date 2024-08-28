import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../pages/register/service";
import { setMessage } from "./uiSlice";

const initialStateRegister = {
  loading: false,
  validationErrors: {},
};

export const registerAsync = createAsyncThunk(
  "register/registerAsync",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await register(userData);
      dispatch(
        setMessage({ payload: "User registered correctly", type: "success" }),
      );
      return response;
    } catch (error) {
      dispatch(setMessage(error.message || error), "error");
      return rejectWithValue(error.message || error);
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
    resetValidationErrors: (state) => {
      state.validationErrors = {};
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

export const { setValidations, resetForm, resetValidationErrors } =
  registerSlice.actions;
export default registerSlice.reducer;
