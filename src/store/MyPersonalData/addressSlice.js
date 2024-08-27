import { createSlice } from "@reduxjs/toolkit";
import {
  createMyAddressWithThunk,
  deleteMyAddressWithThunk,
  getAddressWithThunk,
  resetMyAddressWithThunk,
  updateMyAddressWithThunk,
} from "./myAddressThunk";

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
    emptyMyAddress: (state) => {
      state.data = defaultAddressState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMyAddressWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(getAddressWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(updateMyAddressWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(resetMyAddressWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
    builder.addCase(deleteMyAddressWithThunk.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const { setMyAddress, emptyMyAddress } = myAddressSlice.actions;
export default myAddressSlice.reducer;
