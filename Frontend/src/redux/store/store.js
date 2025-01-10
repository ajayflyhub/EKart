import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import orderReducer from '../reducers/orderReducer';
import cartReducer from '../reducers/cartReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    orders: orderReducer,
    cart: cartReducer,
  },
});

export default store;
