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
    console.log("Esto es myProfile en service: ", myAccount);
    const data = {
      myAccount,
      message: "My account loaded!",
    };
    return data;
  });
};
