import { Outlet } from 'react-router-dom';
import { CartProvider } from '../../contexts/CartContext';
import { FavoritesProvider } from '../../contexts/FavoriteContext';
import { AuthProvider } from '../../contexts/AuthContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <Header />
            <main className={styles.content}>
              <Outlet />
            </main>
            <Footer />
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </div>
  );
};

export default Layout;
