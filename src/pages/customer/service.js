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

export const getMyAccount = async (userName) => {
  const url = `${userURL}/${userName}/myaccount`;
  return client.get(url).then(({ myAccount }) => {
    const data = {
      myAccount,
      message: "My account loaded!",
    };
    return data;
  });
};

export const getSinglePublicProfile = async (userName) => {
  const url = `${userURL}/${userName}`;
  return client.get(url).then(({ publicProfileLoaded, message }) => {
    const data = {
      publicProfileLoaded,
      message,
    };
    return data;
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

  formData.forEach((value, key) => {
    console.log(key, value);
  });
  return client
    .put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(({ updatedPublicProfile, message }) => {
      const data = {
        updatedPublicProfile,
        message,
      };
      return data;
    });
};
