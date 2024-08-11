import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import styles from './ButtonGoBack.module.scss';

const ButtonGoBack = ({ toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');

    window.scrollTo(0, 0);

    if (toggleCartDrawer) {
      toggleCartDrawer();
    }
  };

  return (
    <button
      type="button"
      className={styles.button__back}
      onClick={handleBackButtonClick}
    >
      <IoArrowBack />
      <span className={styles.text}>Вернуться назад</span>
    </button>
  );
};

export default ButtonGoBack;
