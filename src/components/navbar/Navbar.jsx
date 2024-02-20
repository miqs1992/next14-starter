import Links from "@/components/navbar/links/Links";
import styles from './navbar.module.css';
const Navbar = () => {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>Logo</div>
        <Links />
      </div>
    );
};

export default Navbar
