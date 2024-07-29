import { createSlice } from "@reduxjs/toolkit";

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

export const registerSlice = createSlice({
  name: "register",
  initialState: initialStateRegister,
  reducers: {
    registerUser: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setValidations: (state, action) => {
      state.validationErrors = action.payload;
    },
  },
});

export const {
  registerUser,
  setLoading,
  setError,
  setSuccess,
  setValidations,
  resetForm,
} = registerSlice.actions;
export default registerSlice.reducer;
