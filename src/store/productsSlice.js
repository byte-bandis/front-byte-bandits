import { createSlice } from '@reduxjs/toolkit';
import { createProduct } from './productsAsyncThunk';

const productDefaultState = {
  products: {
    loaded: false,
    data: [],
  },
  ui: {
    pending: false,
    error: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState: productDefaultState, // Importa el estado inicial
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.ui.pending = true;
        state.ui.error = null; 
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.data.push(action.payload); // Agrega el nuevo producto
        state.ui.pending = false;
        state.ui.error = null; 
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.ui.pending = false;
        state.ui.error = action.payload; // Guarda el error
      });
  },
});

// No se necesita exportar las acciones síncronas
// export const { action } = productsSlice.actions;
export default productsSlice.reducer;

