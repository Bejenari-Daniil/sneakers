import ProductCard from './ProductCard/ProductCard';
import ProductFilter from './ProductFilter/ProductFilter';
import { data } from '../../helper/fakeData';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoriteContext';
import styles from './Products.module.scss';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [searchedValue, setSearchedValue] = useState('');
  const [category, setCategory] = useState('all');
  const { addItemToCart, removeItemFromCart } = useCart();
  const { addItemToFavorites, removeItemFromFavorites } = useFavorites();

  const handleFilterChange = (searchValue, category) => {
    setSearchedValue(searchValue);
    const filtered = data.filter(
      (product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase()) &&
        (category === 'all' ||
          (category === 'men' &&
            product.name.toLowerCase().includes('мужские')) ||
          (category === 'women' &&
            product.name.toLowerCase().includes('женские'))),
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (searchValue, newCategory) => {
    setCategory(newCategory);
    handleFilterChange(searchValue, newCategory);
  };

  const handleAddToCart = (product) => {
    addItemToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeItemFromCart(productId);
  };

  const handleAddToFavorites = (product) => {
    addItemToFavorites(product);
  };

  const handleRemoveFromFavorites = (product) => {
    removeItemFromFavorites(product);
  };

  return (
    <>
      <ProductFilter
        onFilterChange={handleFilterChange}
        onCategoryChange={handleCategoryChange}
        currentCategory={category}
      />
      <div className={styles.content__sneakers}>
        {filteredProducts.length === 0 ? (
          <p className={styles.noProductsMessage}>
            Товар "{searchedValue}" не найден в каталоге
          </p>
        ) : (
          filteredProducts.map((obj) => (
            <ProductCard
              key={obj.id}
              id={obj.id}
              name={obj.name}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onAddToCart={() => handleAddToCart(obj)}
              onRemoveFromCart={() => handleRemoveFromCart(obj.id)}
              onAddToFavorites={() => handleAddToFavorites(obj)}
              onRemoveFromFavorites={() => handleRemoveFromFavorites(obj.id)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Products;
