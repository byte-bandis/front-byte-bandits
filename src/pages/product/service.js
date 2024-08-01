import { client } from '../../api/client';
import { createAsyncThunk } from "@reduxjs/toolkit";


const getAds = createAsyncThunk('ads/fetchAds', async (_, { rejectWithValue }) => {
    try {
      const response = await client.get('/ads');
      console.log(response.data)
      return response.ads;
      
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  });

export default getAds;
import { client } from '../../api/client';

const productsURL = '/ads';

export const getProducts = () => {
  const url = productsURL;
  return client.get(url);
};

export const getProduct = productId => {
  const url = `${productsURL}/${productId}`;
  return client.get(url);
};

export const createProduct = (productFormData) => {
  return client.post(productsURL, productFormData);
};

/*
export const getProductTags = () => {
  const url = `${productsURL}/tags`;
  return client.get(url);
}

export const deleteProduct = productId => {
  return client.delete(`${productsURL}/${productId}`);
};

*/