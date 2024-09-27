import { createSlice } from '@reduxjs/toolkit';
import { LOCALSTORAGE_KEYS } from '../../helper/constants';

const getCartItemsFromLocalStorage = () => {
  const addedItems = localStorage.getItem(
    LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
  );
  return addedItems ? JSON.parse(addedItems) : [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartItemsFromLocalStorage(),
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      if (!state.some((cartItem) => cartItem.id === item.id)) {
        state.push(item);
        localStorage.setItem(
          LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
          JSON.stringify(state),
        );
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      const updatedState = state.filter((cartItem) => cartItem.id !== itemId);
      localStorage.setItem(
        LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
        JSON.stringify(updatedState),
      );
      return updatedState;
    },
    clearCart: (state) => {
      localStorage.removeItem(LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART);
      return [];
    },
  },
});
export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
