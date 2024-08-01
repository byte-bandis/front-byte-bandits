import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError } from './errorSlice';
import * as products from '../pages/product/service';

export const createProduct = createAsyncThunk(
  'products/create',
  async (product, { dispatch, rejectWithValue }) => {
    try {
      const response = await products.createProduct(product);

      if (response.success) {
        return response.data;       
    } else throw new Error('Failed to create product');
      } catch (error) {
        dispatch(setError(error.message || error));
        return rejectWithValue(error.message || error);
      }
  }
);