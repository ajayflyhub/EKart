import { message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, 
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    message.error("Error occurred while preparing the request."); // Generic error for request preparation
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      message.warning("Session expired. Please log in again."); // Inform the user about session expiration
      window.location.href = '/login';
    } else {
      message.error(error.response?.data?.message || "An error occurred."); // Display server error message or generic error
    }
    return Promise.reject(error);
  }
);

export default api;
