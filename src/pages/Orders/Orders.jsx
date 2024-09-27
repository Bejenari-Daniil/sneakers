import ButtonGoBack from '../../components/Elements/ButtonGoBack/ButtonGoBack';
import styles from './Orders.module.scss';
import { useSelector } from 'react-redux';

const Orders = () => {
  const isOrdered = useSelector((state) => state.orders);
  const isEmpty = isOrdered.length === 0;

  return (
    <>
      <div className={styles.orders}>
        <p className={styles.orders__title}>Мои Покупки</p>
        {isEmpty ? (
          <div className={styles.orders__empty}>
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

export default Orders;
