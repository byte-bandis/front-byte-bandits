import { client, setAuthorizationHeader } from "../../api/client";
import storage from "../../utils/storage";

export const register = (userData) => {
  return client.post("user/register", userData).then(({ token, user }) => {
    if (token) {
      setAuthorizationHeader(token);
      storage.set("auth", token);
      return {
        message: "User created correctly",
        user,
      };
    }
  });
};
