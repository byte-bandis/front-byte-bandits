import { createSlice } from "@reduxjs/toolkit";

export const defaultAuthState = {
    auth: false,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: defaultAuthState, 
    reducers: {
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
