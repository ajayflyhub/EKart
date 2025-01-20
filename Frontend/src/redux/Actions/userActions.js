import axios from 'axios';
import Cookies from 'js-cookie';
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
} from '../reducers/userReducer';
import { message } from 'antd';

const storeTokenInCookie = (token) => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const exp = decodedToken.exp;
  const role = decodedToken.role;
  const expirationDate = new Date(exp * 1000);

  Cookies.set('jwtToken', token, { expires: expirationDate, secure: true, sameSite: 'Strict' });

  return role;
};

export const LoginUser = (username, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.token) {
      // Store the token and extract userId
      const token = data.token;
      Cookies.set('jwtToken', token);
      message.success("Login Successful");

      // Store token in cookie and extract userId
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.userId; // Assuming 'userId' is a field in the token's payload

      // Dispatch loginSuccess with token
      dispatch(loginSuccess(token));

      // Fetch user data with the extracted userId
      dispatch(fetchUser(userId));

      return { success: true, user: data.token };
    } else {
      dispatch(loginFailure("Invalid username or password"));
      message.error("Invalid username or password.");
      return { success: false };
    }
  } catch (error) {
    dispatch(loginFailure("An error occurred. Please try again."));
    message.error("An error occurred. Please try again.");
    return { success: false };
  }
};

export const fetchUser = (userId) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const token = Cookies.get('jwtToken');
    if (token) {
      const role = storeTokenInCookie(token); // Extract role from token and set it in headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.defaults.headers.common['Role'] = role;

      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}`);
      dispatch(fetchUserSuccess(response.data));
    } else {
      dispatch(fetchUserFailure("No token found"));
    }
  } catch (error) {
    dispatch(fetchUserFailure(error.response?.data?.message || error.message));
  }
};

export const createUser = (
  username, email, passwordHash, resetToken, resetTokenExpires, role
) => async (dispatch) => {
  dispatch(createUserRequest());
  try {
    const payload = { username, email, passwordHash, resetToken, resetTokenExpires, role };
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/users`,
      payload
    );
    dispatch(createUserSuccess(response.data));
  } catch (error) {
    dispatch(createUserFailure(error.response?.data?.message || error.message));
  }
};
