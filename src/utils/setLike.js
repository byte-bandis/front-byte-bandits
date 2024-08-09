import { client } from "../api/client";

export const setLike = (adId, userId) => async () => {
  try {
    const body = { adId, userId };
    const result = await client.post('/likes/', body); 

    return {
      message: '¡Agregado a la lista de deseos!',
      status: 'success',
      data: result.data, 
    };
  } catch (error) {
    return {
      message: 'Error al agregar a la lista de deseos',
      status: 'error',
      error: error.response ? error.response.data : error.message,
    };
  }
};
