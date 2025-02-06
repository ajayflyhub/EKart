import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import {
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
} from "../reducers/addressReducer";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const fetchAddresses = (userId) => async (dispatch) => {
  dispatch(fetchAddressesRequest());
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Update URL according to the backend structure
    const response = await axios.get(`${apiBaseUrl}/Users/addresses/user/${userId}`);
    
    dispatch(fetchAddressesSuccess(response.data));
  } catch (error) {
    dispatch(fetchAddressesFailure(error.response?.data?.message || error.message));
    message.error("Failed to fetch addresses.");
  }
};

export const createAddress = (userId, addressData) => async (dispatch) => {
  dispatch(createAddressRequest());
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Updated URL for creating address, passing userId in URL
    const response = await axios.post(`${apiBaseUrl}/Users/address/${userId}`, addressData);
    console.log("responsebasd",response)
    if(response.status === 201)
    dispatch(createAddressSuccess(response.data));
    message.success("Address added successfully!");
  } catch (error) {
    dispatch(createAddressFailure(error.response?.data?.message || error.message));
    // message.error("Failed to create address.");
  }
};

export const updateAddress = (addressId, updatedData) => async (dispatch) => {
  dispatch(updateAddressRequest());
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Updated URL for updating address by addressId
    const response = await axios.put(`${apiBaseUrl}/Users/address/${addressId}`, updatedData);
    
    dispatch(updateAddressSuccess(response.data));
    message.success("Address updated successfully!");
  } catch (error) {
    dispatch(updateAddressFailure(error.response?.data?.message || error.message));
    message.error("Failed to update address.");
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch(deleteAddressRequest());
  try {
    const token = Cookies.get("jwtToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Updated URL for deleting address by addressId
    await axios.delete(`${apiBaseUrl}/Users/address/${addressId}`);
    
    dispatch(deleteAddressSuccess(addressId));
    message.success("Address deleted successfully!");
  } catch (error) {
    dispatch(deleteAddressFailure(error.response?.data?.message || error.message));
    message.error("Failed to delete address.");
  }
};
