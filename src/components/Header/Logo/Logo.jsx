import styles from './Logo.module.scss';
import { NavLink } from 'react-router-dom';
import { GiBootStomp } from 'react-icons/gi';

const Logo = () => {
  return (
    <NavLink to="/" className={styles.header__logoTitle}>
      <GiBootStomp />
      <div className={styles.title}>
        <span>REACT SNEAKERS</span>
        <p>Магазин лучших кроссовок</p>
      </div>
    </NavLink>
  );
};

export default Logo;
