import axios from 'axios';

export const client = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

client.interceptors.response.use(
  response => {
    return response.data},
  error => {
    if (error.response) {
      return Promise.reject({
        message: error.response.statusText,
        ...error.response,
        ...error.response.data,
      });
    }
    // Request error
    return Promise.reject({ message: error.message });
  },
);

export const setAuthorizationHeader = token =>
  (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};
