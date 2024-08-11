import React, { useEffect, useState } from 'react';
import styles from './ProductCard.module.scss';

import {
  IoHeartOutline,
  IoHeart,
  IoAddCircleOutline,
  IoAddCircle,
} from 'react-icons/io5';
import { LOCALSTORAGE_KEYS } from '../../../helper/constants';

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  onAddToCart,
  onRemoveFromCart,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const savedProducts = localStorage.getItem(
    LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_CART,
  );
  const savedFavoriteProducts = localStorage.getItem(
    LOCALSTORAGE_KEYS.ADDED_PRODUCTS_TO_FAVORITES,
  );

  useEffect(() => {
    const savedProductsArr = savedProducts ? JSON.parse(savedProducts) : [];
    const isProductInCart = savedProductsArr.some(
      (product) => product.id === id,
    );

    if (isProductInCart) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [savedProducts, id]);

  useEffect(() => {
    const savedFavoriteProductsArr = savedFavoriteProducts
      ? JSON.parse(savedFavoriteProducts)
      : [];
    const isProductInFavorites = savedFavoriteProductsArr.some(
      (product) => product.id === id,
    );

    if (isProductInFavorites) {
      setIsFavoriteState(true);
    }
  }, [savedFavoriteProducts, id]);

  const handleAddToFavorites = () => {
    setIsFavoriteState(true);
    onAddToFavorites();
  };
  const handleRemoveFromFavorites = () => {
    setIsFavoriteState(false);
    onRemoveFromFavorites(id);
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart();
  };

  const handleRemoveFromCart = () => {
    setIsAdded(false);
    onRemoveFromCart(id);
  };

  return (
    <div className={styles.card} key={id}>
      <button
        type="button"
        className={styles.card__onFavorite}
        onClick={
          isFavoriteState ? handleRemoveFromFavorites : handleAddToFavorites
        }
      >
        {isFavoriteState ? <IoHeart /> : <IoHeartOutline />}
      </button>
      <div className={styles.card__img}>
        <img width={133} height={122} src={imageUrl} alt={name} />
      </div>
      <p className={styles.card__itemName}>{name}</p>
      <div className={styles.card__price}>
        <p>Цена:</p>
        <span>{price} лей</span>
        <button
          type="button"
          className={styles.card__onPlus}
          onClick={isAdded ? handleRemoveFromCart : handleAddToCart}
        >
          {isAdded ? <IoAddCircle /> : <IoAddCircleOutline />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
