import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const client = axios.create({
  baseURL: apiUrl,
});

client.interceptors.response.use((response) => response.data);

export const setAuthorizationHeader = (token) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};
