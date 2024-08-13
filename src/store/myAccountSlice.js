import { createSlice } from "@reduxjs/toolkit";
import { getMyAccountWithThunk } from "./profilesThunk";

export const myAccountState = {
  data: {},
};

const myAccountSlice = createSlice({
  name: "myAccountSlice",
  initialState: myAccountState,
  reducers: {
    setMyAccount: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyAccountWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.myAccount;
    });
  },
});

export const { setMyAccount } = myAccountSlice.actions;
export default myAccountSlice.reducer;
