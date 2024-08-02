import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { register } from "../pages/register/service";
import { setSuccess } from "./successSlice";
import { setError } from "./errorSlice";

const initialStateRegister = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  birthdate: "",
  acceptTerms: false,
  loading: false,
  validationErrors: {},
};

export const registerAsync = createAsyncThunk(
  "register/registerAsync",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await register(userData);
      dispatch(setSuccess("User created correctly"));
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
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { registerUser, setValidations, resetForm } =
  registerSlice.actions;
export default registerSlice.reducer;
