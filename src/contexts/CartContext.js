import { createContext, useContext, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../helper/constants';

const CartContext = createContext(0);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const getCartItemsFromLocalStorage = () => {
    const addedItems = localStorage.getItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
    );
    return addedItems ? JSON.parse(addedItems) : [];
  };

  const [addedItemsToCart, setAddedItemsToCart] = useState(() =>
    getCartItemsFromLocalStorage(),
  );

  const addItemToCart = (item) => {
    if (addedItemsToCart.some((cartItem) => cartItem.id === item.id)) {
      return;
    }
    const updatedItems = [...addedItemsToCart, item];
    localStorage.setItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
      JSON.stringify(updatedItems),
    );
    setAddedItemsToCart(updatedItems);
  };

  const removeItemFromCart = (itemId) => {
    const updatedItems = addedItemsToCart.filter(
      (cartItem) => cartItem.id !== itemId,
    );
    localStorage.setItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
      JSON.stringify(updatedItems),
    );
    setAddedItemsToCart(updatedItems);
    return itemId;
  };

  const clearCart = () => {
    localStorage.removeItem(LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART);
    setAddedItemsToCart([]);
  };

  return (
    <CartContext.Provider
      value={{ addedItemsToCart, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
