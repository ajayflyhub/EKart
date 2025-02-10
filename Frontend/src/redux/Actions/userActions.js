import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  fetchAllUsersRequest,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  activateUserRequest,
  activateUserSuccess,
  activateUserFailure,
  deactivateUserRequest,
  deactivateUserSuccess,
  deactivateUserFailure,
} from "../reducers/userReducer";
import { message } from "antd";
import { createWalletAsync, getWalletAsync } from "./walletActions";

// Helper function to store token
const storeTokenInCookie = (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const exp = decodedToken.exp;
  const role = decodedToken.role;
  const expirationDate = new Date(exp * 1000);

  Cookies.set("jwtToken", token, {
    expires: expirationDate,
    secure: true,
    sameSite: "Strict",
  });

  return role;
};

export const LoginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/Users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send the raw password
      }
    );

    const data = await response.json();

    if (data.token) {
      // Store the token in cookies
      const token = data.token;
      Cookies.set("jwtToken", token, { secure: true, sameSite: "Strict" });
      message.success("Login Successful");

      // Decode the token payload
      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      // Assuming the userId is stored in the decoded token
      const userId = decodedToken.userId;

      // Dispatch login success action with the token
      dispatch(loginSuccess(token));
      dispatch(fetchUser(userId));
      dispatch(getWalletAsync(userId))

      return { success: true, user: decodedToken };
    } else {
      dispatch(loginFailure("Invalid username or password"));
      message.error("Invalid username or password.");
      return { success: false };
    }
  } catch (error) {
    dispatch(loginFailure("An error occurred. Please try again."));
    message.error("Login failed please check your username and password.");
    return { success: false };
  }
};

// Fetch User
export const fetchUser = (userId) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      const role = storeTokenInCookie(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Role"] = role;

      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Users/${userId}`
      );
      console.log("responseresponse", response.data);
      dispatch(fetchUserSuccess(response.data));
    } else {
      dispatch(fetchUserFailure("No token found"));
    }
  } catch (error) {
    dispatch(fetchUserFailure(error.response?.data?.message || error.message));
  }
};

export const createUser =
  (username, email, passwordHash, role, PhoneNumber, resetTokenExpires) =>
  async (dispatch) => {
    dispatch(createUserRequest());

    try {
      // Ensure resetTokenExpires is correctly formatted (ISO 8601)
      const formattedResetTokenExpires = new Date(resetTokenExpires).toISOString();

      const payload = {
        username,
        email,
        passwordHash,
        resetToken: role, // Assign role to resetToken based on your original call
        PhoneNumber,
        resetTokenExpires: formattedResetTokenExpires,
        role,
      };

      // Call API to create the user
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Users`,
        payload
      );

      const token = response.data.token;
      if (token) {
        // Store the token in cookies
        Cookies.set("jwtToken", token, { secure: true, sameSite: "Strict" });

        // Decode the token to get user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; // Ensure the token contains the user ID

        // Log the decoded token and user ID for debugging
        console.log("Decoded token:", decodedToken);
        console.log("Extracted user ID:", userId);

        // Dispatch the action to create the wallet using the user ID
        dispatch(createWalletAsync(userId));
      }

      // Log the response to ensure correct data
      console.log("User creation response:", response);
      dispatch(createUserSuccess(response.data));

      return response.data; // Return success response
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(createUserFailure(errorMessage));
      console.error("Error during user creation:", error);
      throw error; // Ensure the error is propagated to the caller
    }
  };


//  get all users Admin only action
export const getAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersRequest());
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Users/Allusers`
      );
      dispatch(fetchAllUsersSuccess(response.data));
      return true;
    } else {
      dispatch(fetchAllUsersFailure("No token found"));
    }
  } catch (error) {
    dispatch(
      fetchAllUsersFailure(error.response?.data?.message || error.message)
    );
  }
};

// Update User
export const updateUser = (userId, user) => async (dispatch) => {
  console.log("userId, user", userId, user);
  dispatch(updateUserRequest());
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/Users/${userId}`,
        user
      );
      dispatch(updateUserSuccess(response.data));
      message.success(user.username + " is updated successfully");
      return true;
    } else {
      dispatch(updateUserFailure("No token found"));
      return false;
    }
  } catch (error) {
    dispatch(updateUserFailure(error.response?.data?.message || error.message));
  }
};

// Delete User
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(deleteUserRequest());
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/Users/${userId}`
      );
      dispatch(deleteUserSuccess(userId));
      message.success("User deactivated successfully");
      return true;
    } else {
      dispatch(deleteUserFailure("No token found"));
      return false;
    }
  } catch (error) {
    dispatch(deleteUserFailure(error.response?.data?.message || error.message));
  }
};

// create address action
export const createAddress = (userId, street, city, state, postalCode) => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (!token) {
      message.error("No token found");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const payload = {
      street,
      city,
      state,
      postalCode,
      userId,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/address/${userId}`,
      payload
    );

    message.success("Address added successfully");
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || error.message);
  }
};

// update address

export const updateAddress = (addressId, street, city, state, postalCode) => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (!token) {
      message.error("No token found");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const payload = {
      street,
      city,
      state,
      postalCode,
    };

    const response = await axios.put(
      `${process.env.REACT_APP_API_BASE_URL}/address/${addressId}`,
      payload
    );

    message.success("Address updated successfully");
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || error.message);
  }
};


// delete address
export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (!token) {
      message.error("No token found");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/address/${addressId}`
    );

    message.success("Address deleted successfully");
  } catch (error) {
    message.error(error.response?.data?.message || error.message);
  }
};

// get all address
export const fetchAllAddresses = () => async (dispatch) => {
  try {
    const token = Cookies.get("jwtToken");
    if (!token) {
      message.error("No token found");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/addresses`
    );

    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || error.message);
  }
};

// Activate User
export const activateUser = (userId) => async (dispatch) => {
  dispatch(activateUserRequest());
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/Users/activate/${userId}`
      );
      dispatch(activateUserSuccess(userId));
      message.success("User activated successfully");
      return true;
    } else {
      dispatch(activateUserFailure("No token found"));
      return false;
    }
  } catch (error) {
    dispatch(activateUserFailure(error.response?.data?.message || error.message));
  }
};

// Deactivate User
export const deactivateUser = (userId) => async (dispatch) => {
  dispatch(deactivateUserRequest());
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/Users/deactivate/${userId}`
      );
      dispatch(deactivateUserSuccess(userId));
      message.success("User deactivated successfully");
      return true;
    } else {
      dispatch(deactivateUserFailure("No token found"));
      return false;
    }
  } catch (error) {
    dispatch(deactivateUserFailure(error.response?.data?.message || error.message));
  }
};


