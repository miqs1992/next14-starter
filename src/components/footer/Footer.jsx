import styles from './footer.module.css';

const Footer = () => {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>Wojtek</div>
        <div className={styles.text}>
          Wojtek pozdro 600
        </div>
      </div>
    );
};

export default Footer
