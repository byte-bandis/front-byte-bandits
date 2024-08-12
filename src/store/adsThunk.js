import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../api/client";

const adsURL = '/ads';

const createAd = createAsyncThunk(
  'ads/create',
  async (adFormData, { rejectWithValue }) => {
    try {
      const response = await client.post(adsURL, adFormData);

      if (response.success) {
        return response.data;       
    } else throw new Error('Failed to create advert');
      } catch (error) {
        return rejectWithValue(error.message || error);
      }
  }
);

const getAds = createAsyncThunk(
  "ads/fetchAds",
  async (params = { page: 1, id: "" }, { rejectWithValue }) => {
    const { page, id } = params;
    let reqUrl = ``;
    if (id) { reqUrl =reqUrl + `/${id}` }
    else { 
      reqUrl = reqUrl + `/?page=${page}&limit=8`
      /* aqui se pueden añadir las opciones de filtros
      por ejemplo: if (myFilter) { reqUrl = reqUrl + `&myFilter=${myFilterValue}` }
      */
     }
     

    try {
      const response = await client.get(`${adsURL}${reqUrl}`);
      const result = response.ads || response.ad;
      return result;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

const updateAd = createAsyncThunk(
  "ads/updateAd",
  async (params, { rejectWithValue }) => {
    const { adId, adFormData } = params;
    try {
      const response = await client.put(`${adsURL}/${adId}`, adFormData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);

const deleteAd = createAsyncThunk(
  "ads/deleteAd",
  async (adId, { rejectWithValue }) => {
    try {
      const response = await client.delete(`${adsURL}/${adId}`);
      response.message = 'Anuncio borrado correctamente'
      return response;
    } catch (error) {
      return rejectWithValue(error.message || error);
    }
  }
);


export { createAd, getAds, updateAd, deleteAd };
