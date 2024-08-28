import { IoArrowForwardOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonMakeOrder.module.scss';
import { useAuth } from '../../../contexts/AuthContext';

const ButtonMakeOrder = ({ toggleCartDrawer, onClick }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    if (!currentUser) {
      navigate('signIn');
    } else {
    }
    navigate('/orders');

    window.scrollTo(0, 0);

    if (toggleCartDrawer) {
      toggleCartDrawer();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={styles.button__order}
      onClick={handleBackButtonClick}
    >
      <IoArrowForwardOutline />
      <span className={styles.text}>
        {!currentUser ? 'Пожалуйста, авторизируйтесь' : 'Оформить заказ'}
      </span>
    </button>
  );
};

export default ButtonMakeOrder;
