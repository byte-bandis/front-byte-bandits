import { client } from "../../../api/client";

const userURL = "/user";
const nodemailerURL = "/nodemailer";

export const updateMyPassword = async (username, formData) => {
  const url = `${userURL}/${username}/password`;
  return client.put(url, formData).then((response) => {
    const result = {
      state: response.state,
      message: response.message,
      data: response.data,
    };
    return result;
  });
};

export const validateEmailForRestorePassword = async (email, type) => {
  const credentials = {
    email,
    type,
  };

  return client.post(nodemailerURL, credentials).then((response) => {
    const result = {
      state: response.state,
      message: response.message,
    };
    return result;
  });
};

export const sendMyRestoredPassword = async (token, formData) => {
  const url = `${nodemailerURL}/reset-password/${token}`;
  console.log("Este es el token en el service de restore pass: ", token);
  console.log("Y esta es la URL que mando: ", url);

  return client.put(url, formData).then((response) => {
    const result = {
      state: response.state,
      message: response.message,
    };
    return result;
  });
};
