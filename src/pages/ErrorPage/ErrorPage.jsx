import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  return (
    <div className={styles.error__page}>
      <p>404 - Page Not Found</p>
      <p>Страница которую вы ищите не существует.</p>
    </div>
  );
};

export default ErrorPage;
