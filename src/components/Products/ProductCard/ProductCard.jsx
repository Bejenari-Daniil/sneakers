import {
  addItemToFavorites,
  removeItemFromFavorites,
} from '../../../features/favorite/favoriteSlice';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../../features/cart/cartSlice';

import { useDispatch, useSelector } from 'react-redux';
import {
  IoHeartOutline,
  IoHeart,
  IoAddCircleOutline,
  IoAddCircle,
} from 'react-icons/io5';
import styles from './ProductCard.module.scss';

const ProductCard = ({ id, name, price, imageUrl }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavoriteState = favorites.some((product) => product.id === id);

  const cart = useSelector((state) => state.cart);
  const isAdded = cart.some((product) => product.id === id);

  const handleAddToFavorites = () => {
    dispatch(addItemToFavorites({ id, name, price, imageUrl }));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeItemFromFavorites(id));
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart({ id, name, price, imageUrl }));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(id));
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
