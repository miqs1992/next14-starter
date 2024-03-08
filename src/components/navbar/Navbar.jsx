import Links from "@/components/navbar/links/Links";
import styles from './navbar.module.css';
import Link from "next/link";
import {auth} from "@/lib/auth";
const Navbar = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <Link href='/' className={styles.logo}>Logo</Link>
      <Links session={session}/>
    </div>
  );
};

export default Navbar
