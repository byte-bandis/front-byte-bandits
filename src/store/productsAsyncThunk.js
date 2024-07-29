import { createAsyncThunk } from '@reduxjs/toolkit';
import * as products from '../pages/product/service';

export const createProduct = createAsyncThunk(
  'products/create',
  async (product, { rejectWithValue }) => {
    try {
      const response = await products.createProduct(product);

      if (response.success) {
        const { _id } = response.data;
        if (!_id) throw new Error('Product ID is missing');

      const createdProduct = await products.getProduct(_id);
      return createdProduct.ad; 
    } else throw new Error('Failed to create product');
      } catch (error) {
        return rejectWithValue(error.message || error);
      }
  }
);