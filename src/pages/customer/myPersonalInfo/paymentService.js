import { client } from "../../../api/client";

const userURL = "/user";

export const createMyCreditcard = async (username, formData) => {
  const url = `${userURL}/${username}/mycreditcard`;
  return client.post(url, formData).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.creditCard,
    };
    return result;
  });
};

export const getMyCreditCard = async (username) => {
  const url = `${userURL}/${username}/mycreditcard`;
  return client.get(url).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data,
    };
    return result;
  });
};

export const updateMyCreditCard = async (username, formData) => {
  const url = `${userURL}/${username}/mycreditcard`;
  return client.put(url, formData).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.creditCard,
    };
    return result;
  });
};

export const resetMyCreditCard = async (username) => {
  const resetData = {
    creditCard: "Insert your credit card here",
  };
  const url = `${userURL}/${username}/mycreditcard`;
  return client.put(url, resetData).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.creditCard,
    };
    return result;
  });
};

export const deleteMyCreditCard = async (username) => {
  const url = `${userURL}/${username}/mycreditcard`;

  return client.delete(url).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
    };
    return result;
  });
};
