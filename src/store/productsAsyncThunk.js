import { createAsyncThunk } from '@reduxjs/toolkit';
import * as products from '../pages/product/service';
import {
  setAuthorizationHeader,
} from '../api/client';


export const createProduct = createAsyncThunk(
  'products/create',
  async (product, { rejectWithValue }) => {
    try {
      setAuthorizationHeader("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2YTIxN2Q1ZDJkODkxOTMwMDFiMjcwYSIsInVzZXJuYW1lIjoiam9ycXVpYmVyIiwibmFtZSI6IkpvcmdlIiwibGFzdG5hbWUiOiJRdWludGVybyIsImVtYWlsIjoiam9yZ2VAZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsInBhc3N3b3JkIjoiJDJhJDEwJFh0ektPVFNjTlJLNGw1UktYNGtLWU9WUGhPM3FlSUYwMXBibmQ4U1pVSHB5VWZCU0Nwbi91IiwiYmlydGhkYXRlIjoiMTk5NC0wMy0xNVQwMDowMDowMC4wMDBaIiwiYWRkcmVzcyI6IkNhbGxlIGRlIEp1YW4gR2FyY2lhIiwiY3JlZGl0Q2FyZCI6IjExMTExMTExMTExMTExMTEiLCJjcmVhdGVkQXQiOiIyMDI0LTA3LTI1VDA5OjE2OjA1Ljk0OFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA3LTI1VDA5OjE2OjA1Ljk0OFoiLCJfX3YiOjB9LCJpYXQiOjE3MjE5MTIxNTYsImV4cCI6MTcyMjUxNjk1Nn0.Cpa6-quCEJvbrzW7ewKTi__cTp8mJY6iYDhppPxNocU"); 

      const response = await products.createProduct(product);

      if (response.success) {
        const { _id } = response.data;
        if (!_id) {
          throw new Error('Product ID is missing');
        }

      const createdProduct = await products.getProduct(_id);
      return createdProduct.ad; 
    } else {
      throw new Error('Failed to create product');
          }
      } catch (error) {
        return rejectWithValue(error.message || error);
      }
  }
);