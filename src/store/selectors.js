export const getIsLogged = (state) => state.authState;
export const getError = (state) => state.errorState.errorMessage;
export const getUIMessage = (state) => state.ui.message;
export const getUIState = (state) => state.ui.state;
