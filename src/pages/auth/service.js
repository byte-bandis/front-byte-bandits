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

  return client
    .post("user/login", credentials)
    .then(({ token, userName, userId }) => {
      setAuthorizationHeader(token);
      if (requestStorage) {
        storage.set("authToken", token);
        storage.set("userName", userName);
        storage.set("userId", userId);
      }
      if (token) {
        return {
          user: {
            userName,
            userId,
          },
          message: "Login successful!",
        };
      }
    });
};

export const logout = () => {
  removeAuthorizationHeader();
  storage.remove("authToken");
};
