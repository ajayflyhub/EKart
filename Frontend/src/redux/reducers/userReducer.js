import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [], // Added to manage multiple users
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

    fetchAllUsersRequest: (state) => {
      state.loading = true;
    },
    fetchAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchAllUsersFailure: (state, action) => {
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

    // Update user actions
    updateUserRequest: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete user actions
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.user = null; // or implement logic for user removal
    },
    deleteUserFailure: (state, action) => {
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

    // Activate user actions
    activateUserRequest: (state) => {
      state.loading = true;
    },
    activateUserSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? { ...user, active: true } : user
      );
    },
    activateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Deactivate user actions
    deactivateUserRequest: (state) => {
      state.loading = true;
    },
    deactivateUserSuccess: (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? { ...user, active: false } : user
      );
    },
    deactivateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  activateUserRequest,
  activateUserSuccess,
  activateUserFailure,
  deactivateUserRequest,
  deactivateUserSuccess,
  deactivateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
