import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  orders: orderReducer,
  cart: cartReducer,
});

export default rootReducer;
