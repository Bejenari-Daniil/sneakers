import { useState } from 'react';
import styles from './ProductFilter.module.scss';
import { IoManOutline, IoWomanOutline, IoSearch } from 'react-icons/io5';

const ContentFilter = ({ onFilterChange, onCategoryChange, currentCategory }) => {
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('all');

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onFilterChange(value, category);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    onCategoryChange(searchValue, newCategory);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.filter__header}>
        <button type="button" className={currentCategory === 'all' ? styles.active : ''} onClick={() => handleCategoryChange('all')}>
          <p>Все кроссовки</p>
        </button>
        <div className={styles.filter__searchBlock}>
          <div className={styles.filter__searchBlock_icons}>
            <button type="button" className={currentCategory === 'men' ? styles.active : ''} onClick={() => handleCategoryChange('men')}>
              <IoManOutline className={styles.icon_men} />
            </button>
            <button type="button" className={currentCategory === 'women' ? styles.active : ''} onClick={() => handleCategoryChange('women')}>
              <IoWomanOutline className={styles.icon_women} />
            </button>
          </div>
          <div className={styles.filter__searchBlock_input}>
            <IoSearch />
            <input
              type="text"
              placeholder="Search"
              onChange={handleChange}
              value={searchValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentFilter;
