import { client } from "../../../api/client";

const userURL = "/user";

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
