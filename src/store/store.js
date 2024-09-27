import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authorization/authorizationSlice';
import favoritesReducer from '../features/favorite/favoriteSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { ordersReducer } from '../features/orders/ordersSlice';

export default configureStore({
  reducer: {
    authorization: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});
