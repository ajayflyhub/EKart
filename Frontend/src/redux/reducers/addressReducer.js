import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    fetchAddressesRequest(state) {
      state.loading = true;
    },
    fetchAddressesSuccess(state, action) {
      state.loading = false;
      state.addresses = action.payload;
    },
    fetchAddressesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createAddressRequest(state) {
      state.loading = true;
    },
    createAddressSuccess(state, action) {
      state.loading = false;
      state.addresses.push(action.payload);
    },
    createAddressFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateAddressRequest(state) {
      state.loading = true;
    },
    updateAddressSuccess(state, action) {
      state.loading = false;
      const index = state.addresses.findIndex((addr) => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    updateAddressFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAddressRequest(state) {
      state.loading = true;
    },
    deleteAddressSuccess(state, action) {
      state.loading = false;
      state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
    },
    deleteAddressFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAddressesRequest,
  fetchAddressesSuccess,
  fetchAddressesFailure,
  createAddressRequest,
  createAddressSuccess,
  createAddressFailure,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
  deleteAddressRequest,
  deleteAddressSuccess,
  deleteAddressFailure,
} = addressSlice.actions;

export default addressSlice.reducer;
