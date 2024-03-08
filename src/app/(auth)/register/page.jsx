import { handleRegistration } from "@/lib/actions";
import styles from "./register.module.css";

const RegisterPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleRegistration} className={styles.form}>
          <input type='text' name="username" placeholder="username"/>
          <input type='email' name="email" placeholder="email"/>
          <input type='password' name="password" placeholder="password"/>
          <input type='password' name="passwordConfirmation" placeholder="password confirmation"/>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
};

export default RegisterPage;
