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
      console.log(
        "Este es el userName y el userId que me traigo de login: ",
        userName,
        "con",
        userId
      );
      if (requestStorage) {
        storage.set("authToken", token);
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
