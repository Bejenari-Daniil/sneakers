import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaRegUserCircle,
  FaRegHeart,
  FaShoppingCart,
  FaCartArrowDown,
} from 'react-icons/fa';
import Logo from './Logo/Logo';
import CartDrawer from '../../pages/Cart/CartDrawer';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const favoriteItems = useSelector((state) => state.favorites);
  const cartItems = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.authorization.currentUser);
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

  const handleAuthClick = () => {
    navigate('/signIn');
  };

  const navigationLinks = [
    {
      url: '#',
      icon: <FaShoppingCart />,
      label: `${cartItems.length || 0}`,
      onClick: toogleCartDrawer,
    },
    {
      url: '/favorites',
      icon: <FaRegHeart />,
      label: `${favoriteItems.length || 0}`,
    },
    {
      url: '/orders',
      icon: <FaCartArrowDown />,
      label: 'Покупки',
    },
    {
      url: '/signIn',
      icon: <FaRegUserCircle />,
      label: currentUser ? currentUser.name : 'Авторизация',
      onClick: handleAuthClick,
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
