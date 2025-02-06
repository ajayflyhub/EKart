// productActions.js
import axios from "axios";
import { 
  fetchProductsRequest, 
  fetchProductsSuccess, 
  fetchProductsFailure, 
  fetchProductRequest, 
  fetchProductSuccess, 
  fetchProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  addProductSuccess,
  addProductRequest,
  addProductFailure
} from "../reducers/productReducer";
import { message } from "antd";

export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Products`);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(fetchProductRequest());
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Products/${id}`);
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  dispatch(updateProductRequest());
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/Products/${id}`, product);
    dispatch(updateProductSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(updateProductFailure(error.message));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest(id));
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/Products/${id}`);
    dispatch(deleteProductSuccess(id));
    return true;
  } catch (error) {
    dispatch(deleteProductFailure(error.message));
    message.error(`Failed to delete product: ${error.message}`);
  }
};

export const addProduct = (product) => async (dispatch) => {
  dispatch(addProductRequest());
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/Products`, product);
    dispatch(addProductSuccess(response.data));
    return true;
  } catch (error) {
    dispatch(addProductFailure(error.message));
    message.error(`Failed to add product: ${error.message}`);
  }
};
