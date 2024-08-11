import styles from './Footer.module.scss';
const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>Обратная связь:</p>
      <a href="mailto:bejenaridaniil@gmail.com">bejenaridaniil@gmail.com</a>
    </div>
  );
};

export default Footer;
