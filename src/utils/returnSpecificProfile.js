export const returnSpecificProfile = (listOfProfiles, username) => {
  return listOfProfiles.reduce((acc, item) => {
    if (item.userName === username) {
      acc = item;
    }
    return acc;
  }, null);
};
