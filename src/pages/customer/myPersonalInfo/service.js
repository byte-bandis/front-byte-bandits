import { client } from "../../../api/client";

const userURL = "/user";

export const createMyAddress = async (username, formData) => {
  const url = `${userURL}/${username}/myaddress`;
  return client.post(url, formData).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.address,
    };
    return result;
  });
};

export const getMyAddress = async (username) => {
  const url = `${userURL}/${username}/myaddress`;
  return client.get(url).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.address,
    };
    return result;
  });
};

export const updateMyAddress = async (username, formData) => {
  const url = `${userURL}/${username}/myaddress`;
  return client.put(url, formData).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.address,
    };
    return result;
  });
};

export const resetMyAddress = async (username) => {
  const resetData = {
    country: "",
    streetName: "",
    streetNumber: "",
    flat: "",
    door: "",
    postalCode: "",
    city: "",
    mobilePhoneNumber: "",
  };
  const url = `${userURL}/${username}/myaddress`;
  return client.put(url, resetData).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.address,
    };
    return result;
  });
};

export const deleteMyAddress = async (username) => {
  const url = `${userURL}/${username}/myaddress`;

  return client.delete(url).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
    };
    return result;
  });
};
