import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeOrder } from '../../features/orders/ordersSlice';
import { clearCart, removeItemFromCart } from '../../features/cart/cartSlice';
import { IoCloseCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

import ButtonGoBack from '../../components/Elements/ButtonGoBack/ButtonGoBack';
import ButtonMakeOrder from '../../components/Elements/ButtonMakeOrder/ButtonMakeOrder';
import styles from './CartDrawer.module.scss';

const CartDrawer = ({ toggleCartDrawer }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [orderMade, setOrderMade] = useState(false);
  const isEmpty = cartItems.length === 0;

  const handleMakeOrder = () => {
    dispatch(makeOrder(cartItems));
    setOrderMade(!orderMade);
    dispatch(clearCart());
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeItemFromCart(productId));
  };

  const totalPrice = cartItems.reduce(
    (sum, cartItems) => cartItems.price + sum,
    0,
  );
  const discount = (totalPrice * 0.05).toFixed(2);
  const finalPrice = (totalPrice - discount).toFixed(2);

  return (
    <div className={styles.overlay}>
      <div className={styles.cart__drawer}>
        <div className={styles.cart__drawer_header}>
          <p>Корзина</p>
          <button type="button" onClick={toggleCartDrawer}>
            <IoCloseCircleOutline />
          </button>
        </div>

        {orderMade ? (
          <div className={styles.cart__drawer_orderMade}>
            <img src="/img/order.svg" alt="order" />
            <h3>Заказ оформлен!</h3>
            <p>Ваш заказ скоро будет передан курьерской доставке</p>
            <ButtonGoBack toggleCartDrawer={toggleCartDrawer} />
          </div>
        ) : isEmpty ? (
          <div className={styles.cart__drawer_empty}>
            <img
              src="assets/img/cartEmpty/cart-empty.svg"
              alt="cart-empty-image"
            />
            <p>Корзина Пустая</p>
            <span>
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </span>
            <ButtonGoBack toggleCartDrawer={toggleCartDrawer} />
          </div>
        ) : (
          <>
            <div className={styles.cart__drawer_items}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cart__item}>
                  <img src={item.imageUrl} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>{item.price} лей</span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      type="button"
                    >
                      <IoRemoveCircleOutline />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.drawer__total_price}>
              <div className={styles.drawer__price_container}>
                <ul>
                  <li>
                    <span>Итого</span>
                    <b>{totalPrice} лей.</b>
                  </li>
                  <li>
                    <span>Скида 5%:</span>
                    <b>{discount} лей.</b>
                  </li>
                  <li>
                    <span>К оплате:</span>
                    <b>{finalPrice} лей.</b>
                  </li>
                </ul>
              </div>
              <ButtonMakeOrder
                toggleCartDrawer={toggleCartDrawer}
                onClick={handleMakeOrder}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
