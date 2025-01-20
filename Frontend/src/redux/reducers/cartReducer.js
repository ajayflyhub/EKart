import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartRequest(state) {
      state.loading = true;
    },
    fetchCartSuccess(state, action) {
      state.loading = false;
      state.cartItems = action.payload;
    },
    fetchCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addToCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    updateCart(state, action) {
      const updatedCart = action.payload;
      state.cartItems = updatedCart.items || state.cartItems;
    },
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCart,
  removeFromCart,
  updateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
