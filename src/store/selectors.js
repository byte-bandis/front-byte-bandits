export const getIsLogged = (state) => state.authState;
export const getError = (state) => {
  if (state.ui.state === "error") {
    return state.ui.message;
  }
  return null;
};
export const getUI = (state) => state.ui;
export const getUIMessage = (state) => state.ui.message;
export const getUIState = (state) => state.ui.state;
export const getUILoading = (state) => state.ui.loading;
export const getLoggedUser = (state) => state.authState.user;
export const getLoggedUserName = (state) => state.authState.user.userName;
export const getLoggedUserId = (state) => state.authState.user.userId;
export const getPublicProfiles = (state) => state.publicProfiles.data;
export const getMyAccount = (state) => state.myAccount.data;
export const getSinglePublicProfile = (state) => state.singlePublicProfile.data;
export const getSinglePublicProfileUserPhoto = (state) =>
  state.singlePublicProfile.data.userPhoto;
export const getSinglePublicProfileHeaderPhoto = (state) =>
  state.singlePublicProfile.data.headerPhoto;
export const getSinglePublicProfileUserDescription = (state) =>
  state.singlePublicProfile.data.userDescription;
export const getSinglePublicProfileOwner = (state) =>
  state.singlePublicProfile.data.userName;
export const getAdsSelector = (state) => state.adsState.data;
