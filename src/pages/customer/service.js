import { client } from "../../api/client";

const userURL = "/user";

export const getPublicProfiles = async () => {
  return client.get("user/usersprofiles").then(({ usersPublicProfiles }) => {
    const data = {
      usersPublicProfiles,
      message: "Public users profiles loaded!",
    };
    return data;
  });
};

/* export const getMyAccount = async (userName) => {
  const url = `${userURL}/${userName}/myaccount`;
  return client.get(url).then(({ myAccount }) => {
    const data = {
      myAccount,
      message: "My account loaded!",
    };
    return data;
  });
}; */

export const getSinglePublicProfile = async (userName) => {
  const url = `${userURL}/${userName}`;
  return client.get(url).then(({ state, data, message }) => {
    const response = {
      state,
      data,
      message,
    };
    return response;
  });
};

export const createSinglePublicProfile = async (userName, formData) => {
  const url = `${userURL}/${userName}`;
  return client
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ newPublicProfile, message }) => {
      const data = {
        newPublicProfile,
        message,
      };
      return data;
    });
};

export const updateSinglePublicProfile = async (userName, formData) => {
  const url = `${userURL}/${userName}`;
  return client
    .put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ state, data, message }) => {
      const response = {
        state,
        data,
        message,
      };
      return response;
    });
};
/* export const deleteSinglePublicProfile = async (userName) => {
  const url = `${userURL}/${userName}`;
  return client.delete(url).then((message) => message);
}; */

export const deleteUser = async (username) => {
  const url = `${userURL}/${username}`;

  return client.delete(url).then((response) => {
    const result = {
      status: response.status,
      message: response.message,
    };
    return result;
  });
};
