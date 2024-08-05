import { setAuthorizationHeader } from "../api/client";

export const checkAuthTokenSaved = () => {
  const token = localStorage.getItem("authToken");
  return !!token;
};
export const setSavedAuthTokenInHeader = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    setAuthorizationHeader(token);
  }
};
