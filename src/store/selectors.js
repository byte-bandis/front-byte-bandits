export const getIsLogged = (state) => state.authState;
//export const getError = (state) => state.errorState.errorMessage;
export const getError = (state) => {
  if (state.ui.state === "error") {
    return state.ui.message;
  }
  return null;
};
export const getLoading = (state) => state.errorState.pending;
export const getUIMessage = (state) => state.ui.message;
export const getUIState = (state) => state.ui.state;
export const getLoggedUser = (state) => state.authState.user;
