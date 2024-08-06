export const getIsLogged = (state) => state.authState;
export const getError = (state) => state.errorState.errorMessage;
export const getLoading = (state) => state.errorState.pending;
