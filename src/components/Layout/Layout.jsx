import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';
import { CartProvider } from '../../contexts/CartContext';
import { FavoritesProvider } from '../../contexts/FavoriteContext';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <FavoritesProvider>
        <CartProvider>
          <Header />
          <main className={styles.content}>
            <Outlet />
          </main>
          <Footer />
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
};

export default Layout;
