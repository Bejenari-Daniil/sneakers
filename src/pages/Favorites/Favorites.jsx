import { removeItemFromFavorites } from '../../features/favorite/favoriteSlice';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../features/cart/cartSlice';
import ProductCard from '../../components/Products/ProductCard/ProductCard';
import ButtonGoBack from '../../components/Elements/ButtonGoBack/ButtonGoBack';
import styles from './Favorites.module.scss';
import { useDispatch, useSelector } from 'react-redux';

const Favorites = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites);
  const isEmpty = favoriteItems.length === 0;

  const handleRemoveFromFavorites = (productId) => {
    dispatch(removeItemFromFavorites(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
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
