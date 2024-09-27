import ProductCard from './ProductCard/ProductCard';
import ProductFilter from './ProductFilter/ProductFilter';
import { data } from '../../helper/fakeData';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Products.module.scss';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [searchedValue, setSearchedValue] = useState('');
  const [category, setCategory] = useState('all');
  const [searchParams] = useSearchParams();

  const postQuery = searchParams.get('post') || '';
  const categoryQuery = searchParams.get('category') || 'all';

  useEffect(() => {
    handleFilterChange(postQuery, categoryQuery);
    setSearchedValue(postQuery);
  }, [postQuery, categoryQuery]);

  const handleFilterChange = (searchValue, category) => {
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
            />
          ))
        )}
      </div>
    </>
  );
};

export default Products;
