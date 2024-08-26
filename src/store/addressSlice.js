import { createSlice } from "@reduxjs/toolkit";
import {
  getAddressWithThunk,
  updateMyAddressWithThunk,
} from "./MyPersonalData/myAddressThunk";

export const defaultAddressState = {
  data: {},
};

const myAddressSlice = createSlice({
  name: "myAddressSlice",
  initialState: defaultAddressState,
  reducers: {
    setMyAddress: (state, action) => {
      state.data = action.payload;
    },
    resetMyAddress: (state) => {
      state.data = defaultAddressState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAddressWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(updateMyAddressWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const { setMyAddress, resetMyAddress } = myAddressSlice.actions;
export default myAddressSlice.reducer;
