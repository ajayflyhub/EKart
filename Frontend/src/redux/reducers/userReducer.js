import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Fetch user actions
    fetchUserRequest: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Create user actions
    createUserRequest: (state) => {
      state.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    createUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Login user actions
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
} = userSlice.actions;

export default userSlice.reducer;
