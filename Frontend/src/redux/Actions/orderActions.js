import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFailure,
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
} from "../reducers/orderReducer";
import { fetchAllUsersFailure, fetchAllUsersRequest, fetchAllUsersSuccess } from "../reducers/userReducer";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const createOrder = (orderData) => async (dispatch) => {
  dispatch(createOrderRequest());
  console.log(" const token = Cookies.get('jwtToken');",orderData)
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Sending the correct data format for order creation
    const orderPayload = {
      userId: orderData.userId,
      productIds: orderData.productIds,
      status: "ordered",
      orderDate: new Date().toISOString(),
      orderNumber: orderData.orderNumber,
      price: orderData.price,
      shippingAddress: String(orderData.shippingAddress),  // Ensure this is a string
      billingAddress: String(orderData.billingAddress),  // Ensure this is a string
      contactNumber: orderData.contactNumber,
      products: orderData.products || [],
      order: orderData.order || "Default Order",  // Ensure this field is passed as expected
    };
    
    

    const response = await axios.post(`${apiBaseUrl}/Order/User/${orderData.userId}`, orderPayload);

    dispatch(createOrderSuccess(response.data));
    message.success("Order placed successfully!");
    return true;
  } catch (error) {
    dispatch(createOrderFailure(error.response?.data?.message || error.message));
    message.error(error?.response?.data);
    return false;
  }
};

// For updating the order
export const updateOrder = (orderId, order) => async (dispatch) => {
  dispatch(updateOrderRequest());
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.put(`${apiBaseUrl}/Order/${orderId}`, order);

    dispatch(updateOrderSuccess(response.data));
    message.success("Order updated successfully!");
  } catch (error) {
    dispatch(updateOrderFailure(error.response?.data?.message || error.message));
    message.error("Failed to update order.");
  }
};

export const fetchOrders = (userId) => async (dispatch) => {
  dispatch(fetchOrdersRequest());
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`${apiBaseUrl}/Order/User/${userId}`);

    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    dispatch(fetchOrdersFailure(error.response?.data?.message || error.message));
    message.error("Failed to fetch orders.");
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch(fetchOrdersRequest());
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`${apiBaseUrl}/Order`); // Fetch all orders from API

    dispatch(fetchOrdersSuccess(response.data));  // On success, update the state
  } catch (error) {
    dispatch(fetchOrdersFailure(error.response?.data?.message || error.message));  // Handle error
    message.error("Failed to fetch orders.");
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch(fetchAllUsersRequest());
  try {
    const token = Cookies.get("jwtToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Users`);
      dispatch(fetchAllUsersSuccess(response.data));
    } else {
      dispatch(fetchAllUsersFailure("No token found"));
    }
  } catch (error) {
    dispatch(fetchAllUsersFailure(error.response?.data?.message || error.message));
  }
};
