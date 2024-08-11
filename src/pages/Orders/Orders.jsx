import styles from './Orders.module.scss';
import ButtonGoBack from '../../components/Elements/ButtonGoBack/ButtonGoBack';
import { useEffect, useState } from 'react';
import { LOCALSTORAGE_KEYS } from '../../helper/constants';

const Profile = () => {
  const [isOrdered, setIsOrdered] = useState([]);
  const isEmpty = isOrdered.length === 0;

  useEffect(() => {
    const orderedProducts = localStorage.getItem(
      LOCALSTORAGE_KEYS.ORDER_HISTORY,
    );
    if (orderedProducts) {
      const parsedProducts = JSON.parse(orderedProducts);
      setIsOrdered(parsedProducts);
    }
  }, []);

  return (
    <>
      <div className={styles.profile}>
        <p className={styles.profile__title}>Мои Покупки</p>
        {isEmpty ? (
          <div className={styles.profile__empty}>
            <p>У вас нет покупок</p>
            <p>Оформите покупку чтобы отобразить её здесь</p>
            <ButtonGoBack></ButtonGoBack>
          </div>
        ) : (
          <div className={styles.ordered__items}>
            {isOrdered.map((item) => (
              <div className={styles.card} key={item.id}>
                <div className={styles.card__img}>
                  <img
                    width={133}
                    height={122}
                    src={item.imageUrl}
                    alt={item.name}
                  />
                </div>
                <p className={styles.card__itemName}>{item.name}</p>
                <div className={styles.card__price}>
                  <p>Цена:</p>
                  <span>{item.price} лей</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
