import { createContext, useContext, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../helper/constants';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const getFavoritesFromLocalStorage = () => {
    const savedFavorites = localStorage.getItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
    );
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  };

  const [favorites, setFavorites] = useState(() =>
    getFavoritesFromLocalStorage(),
  );

  const addItemToFavorites = (item) => {
    if (favorites.some((favoriteItem) => favoriteItem.id === item.id)) {
      return;
    }
    const updatedFavorites = [...favorites, item];
    localStorage.setItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
      JSON.stringify(updatedFavorites),
    );
    setFavorites(updatedFavorites);
  };

  const removeItemFromFavorites = (itemId) => {
    const updatedFavorites = favorites.filter(
      (favoriteItem) => favoriteItem.id !== itemId,
    );
    localStorage.setItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
      JSON.stringify(updatedFavorites),
    );
    setFavorites(updatedFavorites);
    return itemId;
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addItemToFavorites, removeItemFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
