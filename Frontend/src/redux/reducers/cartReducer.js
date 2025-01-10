const initialState = {
    cartItems: [],
    loading: false,
    error: null,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_CART_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_CART_SUCCESS':
        return { ...state, loading: false, cartItems: action.payload };
      case 'FETCH_CART_FAILURE':
        return { ...state, loading: false, error: action.error };
      case 'ADD_TO_CART':
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      case 'REMOVE_FROM_CART':
        return { ...state, cartItems: state.cartItems.filter(item => item !== action.payload) };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  