import { createSlice } from '@reduxjs/toolkit';
import { LOCALSTORAGE_KEYS } from '../../helper/constants';

const getOrdersFromLocalStorage = () => {
  const orderedProducts = localStorage.getItem(LOCALSTORAGE_KEYS.ORDER_HISTORY);
  return orderedProducts ? JSON.parse(orderedProducts) : [];
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: getOrdersFromLocalStorage(),
  reducers: {
    makeOrder: (state, action) => {
      const orderedProducts = action.payload;
      const updatedOrders = [...state, ...orderedProducts];
      localStorage.setItem(
        LOCALSTORAGE_KEYS.ORDER_HISTORY,
        JSON.stringify(updatedOrders),
      );
      return updatedOrders;
    },
  },
});

export const { makeOrder } = orderSlice.actions;
export const ordersReducer = orderSlice.reducer;
