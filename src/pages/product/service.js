import { client } from '../../api/client';
import { createAsyncThunk } from "@reduxjs/toolkit";

const productsURL = '/ads';

const getAds = createAsyncThunk('ads/fetchAds', async (_, { rejectWithValue }) => {
    try {
      const response = await client.get(productsURL);
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