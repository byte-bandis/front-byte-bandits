import { client } from "../../api/client";

export const getPublicProfiles = async () => {
  return client.get("user/usersprofiles").then(({ usersPublicProfiles }) => {
    return {
      usersPublicProfiles,
      message: "Public users profiles loaded!",
    };
  });
};
