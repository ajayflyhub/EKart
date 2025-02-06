import axios from 'axios';
import Cookies from 'js-cookie';
import {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCart,
  removeFromCart,
  updateCart,
} from '../reducers/cartReducer';
import { message } from 'antd';

export const fetchCart = (userId) => async (dispatch) => {
  dispatch(fetchCartRequest());
  try {
    const token = Cookies.get('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/Carts/user/${userId}`);
      dispatch(fetchCartSuccess(response.data));
    } else {
      dispatch(fetchCartFailure("No token found"));
    }
  } catch (error) {
    dispatch(fetchCartFailure(error.response?.data?.message || error.message));
  }
};

export const addToCartAsync = (productId, userId) => async (dispatch) => {
  try {
    const token = Cookies.get('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Carts/AddToCart?productId=${productId}&userId=${userId}`,
      );
      dispatch(addToCart(response.data));
      message.success('Item added to cart');
      return true;
    }
  } catch (error) {
    message.error('Failed to add item to cart');
  }
};

export const removeFromCartAsync = (productId, userId) => async (dispatch) => {
  try {
    const token = Cookies.get('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/carts/RemoveFromCart?productId=${productId}&userId=${userId}`
      );
      dispatch(removeFromCart(productId))
      message.success('Item removed from cart');
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    message.error('Failed to remove item from cart');
  }
};

export const clearCartAsync = (userId) => async (dispatch) => {
  try {
    const token = Cookies.get('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/Carts/clearCart/${userId}`);
      dispatch(fetchCart(userId)); // Optionally refresh the cart
      message.success('Cart cleared successfully');
      return true;
    }
  } catch (error) {
    console.error('Error clearing cart:', error);
    message.error('Failed to clear cart');
  }
};

export const updateCartAsync = (userId, cart) => async (dispatch) => {
  try {
    const token = Cookies.get('jwtToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/carts/updateCart/${cart.id}`,
        cart
      );
      console.log('API response:', response);
      let fetchUpdatedCart = await dispatch(fetchCart(userId));
      dispatch(updateCart(fetchUpdatedCart));
      message.success('Cart updated successfully');
    }
  } catch (error) {
    console.error('Error updating cart:', error);
  }
};
