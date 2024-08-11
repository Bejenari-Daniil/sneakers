import styles from './Favorites.module.scss';
import ButtonGoBack from '../../components/Elements/ButtonGoBack/ButtonGoBack';
import { useEffect, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../../helper/constants';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import { useFavorites } from '../../contexts/FavoriteContext';

const Favorites = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { removeItemFromFavorites } = useFavorites();
  const isEmpty = favoriteItems.length === 0;

  useEffect(() => {
    const savedFavoriteProducts = localStorage.getItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
    );
    if (savedFavoriteProducts) {
      const parsedProducts = JSON.parse(savedFavoriteProducts);
      setFavoriteItems(parsedProducts);
    }
  }, []);

  const handleRemoveFromFavorites = (productId) => {
    removeItemFromFavorites(productId);
    const updatedFavoritesItems = favoriteItems.filter(
      (item) => item.id !== productId,
    );
    setFavoriteItems(updatedFavoritesItems);
    localStorage.setItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
      JSON.stringify(updatedFavoritesItems),
    );
  };

  const handleAddToCart = (product) => {
    const savedProducts = localStorage.getItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
    );
    const savedProductsArr = savedProducts ? JSON.parse(savedProducts) : [];

    const productExistsInCart = savedProductsArr.some(
      (savedProduct) => savedProduct.id === product.id,
    );

    if (!productExistsInCart) {
      const updatedProducts = [...savedProductsArr, product];
      localStorage.setItem(
        LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
        JSON.stringify(updatedProducts),
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    const savedProducts = localStorage.getItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
    );
    const savedProductsArr = savedProducts ? JSON.parse(savedProducts) : [];

    const updatedProducts = savedProductsArr.filter(
      (product) => product.id !== productId,
    );

    localStorage.setItem(
      LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
      JSON.stringify(updatedProducts),
    );
  };

  return (
    <div className={styles.favorites}>
      <p className={styles.favorites__title}>Мои Закладки</p>
      {isEmpty ? (
        <div className={styles.favorites__empty}>
          <p>У вас нет закладок</p>
          <p>Вы ничего не добавляли в закладки.</p>
          <ButtonGoBack />
        </div>
      ) : (
        <div className={styles.favorites_items}>
          {favoriteItems.map((obj) => (
            <ProductCard
              key={obj.id}
              id={obj.id}
              name={obj.name}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onAddToCart={() => handleAddToCart(obj)}
              onRemoveFromCart={() => handleRemoveFromCart(obj.id)}
              onRemoveFromFavorites={() => handleRemoveFromFavorites(obj.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
