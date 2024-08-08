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

export const getMyProfile = async (userName) => {
  const url = `${userURL}/${userName}`;
  return client.get(url).then(({ myProfile }) => {
    const data = {
      myProfile,
      message: "My profile loaded!",
    };
    return data;
  });
};
