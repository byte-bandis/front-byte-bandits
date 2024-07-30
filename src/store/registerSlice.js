import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../pages/register/register";

const initialStateRegister = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  birthdate: "",
  acceptTerms: false,
  loading: false,
  error: null,
  success: null,
  validationErrors: {},
};

export const registerAsync = createAsyncThunk(
  "register/registerAsync",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const registerSlice = createSlice({
  name: "register",
  initialState: initialStateRegister,
  reducers: {
    registerUser: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setValidations: (state, action) => {
      state.validationErrors = action.payload;
    },
    resetForm: (state) => {
      return initialStateRegister;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "User created correctly";
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { registerUser, setValidations, resetForm } =
  registerSlice.actions;
export default registerSlice.reducer;
