import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from './productsThunk';

const productDefaultState = {
    loaded: false,
    data: [],
    pending: false,
    error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productDefaultState, 
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.pending = true;
        state.error = null; 
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload); 
        state.pending = false;
        state.error = null; 
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload; // Guarda el error
      })
  },
});


export const { clearError } = productsSlice.actions;
export default productsSlice.reducer;

