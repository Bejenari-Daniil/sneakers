import { createSlice } from '@reduxjs/toolkit';
import { LOCALSTORAGE_KEYS } from '../../helper/constants';

const getFavoritesFromLocalStorage = () => {
  const savedFavorites = localStorage.getItem(
    LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
  );
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: getFavoritesFromLocalStorage(),
  reducers: {
    addItemToFavorites: (state, action) => {
      const item = action.payload;
      if (!state.some((favoriteItem) => favoriteItem.id === item.id)) {
        state.push(item);
        localStorage.setItem(
          LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
          JSON.stringify(state),
        );
      }
    },
    removeItemFromFavorites: (state, action) => {
      const itemId = action.payload;
      const updatedState = state.filter(
        (favoriteItem) => favoriteItem.id !== itemId,
      );
      localStorage.setItem(
        LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
        JSON.stringify(updatedState),
      );
      return updatedState;
    },
  },
});

export const { addItemToFavorites, removeItemFromFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
