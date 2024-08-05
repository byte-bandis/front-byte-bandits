import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";

export const login = async (email, password, requestStorage) => {
  const credentials = {
    email,
    password,
    requestStorage,
  };

  return client.post("user/login", credentials).then(({ token }) => {
    setAuthorizationHeader(token);
    if (requestStorage) {
      storage.set("authToken", token);
    }
  });
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove("authToken");
};
