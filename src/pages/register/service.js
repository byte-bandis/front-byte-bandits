import { client } from "../../api/client";

export const register = (userData) => {
  return client.post("user/register", userData).then(({ token }) => {
    if (token) {
      return {
        message: "User created correctly",
      };
    }
  });
};
