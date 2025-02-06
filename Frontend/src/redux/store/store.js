import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import productReducer from '../reducers/productReducer';
import orderReducer from '../reducers/orderReducer';
import cartReducer from '../reducers/cartReducer';
import addressReducer from '../reducers/addressReducer';
import walletReducer from '../reducers/walletReducer';


const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    orders: orderReducer,
    cart: cartReducer,
    address: addressReducer,
    wallet:walletReducer
  },
});

export default store;
