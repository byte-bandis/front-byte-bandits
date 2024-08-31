// uiSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: {}, // { componentId1: 'Error message', componentId2: 'Another error message' }
};

const uiIDSlice = createSlice({
  name: "uiIDSlice",
  initialState,
  reducers: {
    setError(state, action) {
      const { componentId, message } = action.payload;
      state.errors[componentId] = message;
    },
    clearError(state, action) {
      const { componentId } = action.payload;
      delete state.errors[componentId];
    },
    clearAllErrors(state) {
      state.errors = {};
    },
  },
});

export const { setError, clearError, clearAllErrors } = uiIDSlice.actions;
export default uiIDSlice.reducer;
