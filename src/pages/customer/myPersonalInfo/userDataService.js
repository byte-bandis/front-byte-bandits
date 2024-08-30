import { client } from "../../../api/client";

const userURL = "/user";

export const getMyData = async (username) => {
  const url = `${userURL}/${username}/mydata`;
  return client.get(url).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.userData,
    };
    return result;
  });
};

export const updateMyData = async (username, formData) => {
  const url = `${userURL}/${username}/mydata`;
  return client.put(url, formData).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
      data: response.data.userData,
    };
    return result;
  });
};
