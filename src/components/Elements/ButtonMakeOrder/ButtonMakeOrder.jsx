import { IoArrowForwardOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonMakeOrder.module.scss';

const ButtonMakeOrder = ({ toggleCartDrawer, onClick }) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
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
      <span className={styles.text}>Оформить заказ</span>
    </button>
  );
};

export default ButtonMakeOrder;
