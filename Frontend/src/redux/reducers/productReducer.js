import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // List of products
    product: null, // Single product details
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductRequest: (state) => {
      state.loading = true;
      state.product = null; // Reset the product to avoid stale data
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
} = productSlice.actions;

// Thunk to fetch all products
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/Products`
    );
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  dispatch(fetchProductRequest());
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/Products/${id}`
    );
    dispatch(fetchProductSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
};

export default productSlice.reducer;
