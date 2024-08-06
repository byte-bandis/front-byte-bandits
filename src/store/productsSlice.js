import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from './productsThunk';

const productDefaultState = {
    loaded: false,
    data: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productDefaultState, 
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);  
      })
  },
});


export default productsSlice.reducer;

