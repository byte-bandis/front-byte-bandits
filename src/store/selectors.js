export const getIsLogged = (state) => state.authState;
//export const getError = (state) => state.errorState.errorMessage;
export const getError = (state) => {
  if (state.ui.state === "error") {
    return state.ui.message;
  }
  return null;
};
export const getUIMessage = (state) => state.ui.message;
export const getUIState = (state) => state.ui.state;
export const getUILoading = (state) => state.ui.loading;
export const getLoggedUser = (state) => state.authState.user;
