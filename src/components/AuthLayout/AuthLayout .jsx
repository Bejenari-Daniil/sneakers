import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.scss';
import { AuthProvider } from '../../contexts/AuthContext';

const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
};

export default AuthLayout;
