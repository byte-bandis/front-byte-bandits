import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import storage from "../utils/storage";

export const login = async (email, password) => {
  const credentials = {
    email,
    password,
  };

  return client.post("user/login", credentials).then(({ token }) => {
    setAuthorizationHeader(token);
    storage.set("authToken", token);
  });
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove("authToken");
};
