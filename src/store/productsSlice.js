import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from './productsThunk';

const productDefaultState = {
    loaded: false,
    data: [],
    pending: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productDefaultState, 
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.pending = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload); 
        state.pending = false; 
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.pending = false;
      })
  },
});


export default productsSlice.reducer;

