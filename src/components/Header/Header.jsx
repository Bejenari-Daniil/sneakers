import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoriteContext';
import CartDrawer from '../../pages/Cart/CartDrawer';
import { FaRegUserCircle, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import Logo from './Logo/Logo';
import styles from './Header.module.scss';

const Header = () => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { addedItemsToCart } = useCart();
  const { favorites } = useFavorites();
  const toogleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isCartDrawerOpen]);

  const navigationLinks = [
    {
      url: '#',
      icon: <FaShoppingCart />,
      label: `${addedItemsToCart.length || 0}`,
      onClick: toogleCartDrawer,
    },
    {
      url: '/favorites',
      icon: <FaRegHeart />,
      label: `${favorites.length || 0}`,
    },
    {
      url: '/orders',
      icon: <FaRegUserCircle />,
      label: 'Покупки',
    },
  ];

  return (
    <header className={styles.header}>
      <Logo />
      <div className={styles.header__profileCartFavorites}>
        <ul>
          {navigationLinks.map((navigationItem, index) => (
            <li key={index}>
              <NavLink to={navigationItem.url} onClick={navigationItem.onClick}>
                {navigationItem.icon}
                {navigationItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {isCartDrawerOpen && <CartDrawer toggleCartDrawer={toogleCartDrawer} />}
    </header>
  );
};

export default Header;
