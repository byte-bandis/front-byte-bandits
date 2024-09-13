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
    .then(({ token, userName, userId, updatedAt }) => {
      setAuthorizationHeader(token);
      if (requestStorage) {
        storage.set("authToken", token);
        storage.set("userName", userName);
        storage.set("userId", userId);
        storage.set("updatedAt", updatedAt);
      }
      if (token) {
        return {
          user: {
            userName,
            userId,
            updatedAt,
          },
          message: "Login successful!",
        };
      }
    });
};

export const logout = (reloadPage) => {
  const reload = reloadPage;
  //console.log("Esto es reload: ", reloadPage, "de tipo", typeof reloadPage);

  storage.remove("authToken");
  storage.remove("userName");
  storage.remove("userId");
  storage.remove("updatedAt");
  removeAuthorizationHeader();

  if (reload === "true") {
    window.location.href = "/";
  }
};
