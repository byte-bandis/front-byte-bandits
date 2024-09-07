import { client } from "../../api/client";

export const register = (userData) => {
  return client.post("user/register", userData).then(({ token }) => {
    if (token) {
      client.post("nodemailer/",  {
        email: userData.email,
        userName: userData.username,
        type: "welcome",
      });
      return {
        message: "User created correctly",
      };
    }
  });
};
