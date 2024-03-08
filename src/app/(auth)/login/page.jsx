import {handleGithubLogin, handleLogin} from "@/lib/actions";
import styles from "./login.module.css";

const LoginPage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action={handleLogin}>
          <input type='text' name="username" placeholder="username"/>
          <input type='password' name="password" placeholder="password"/>
          <button type='submit'>Login</button>
        </form>
        <form action={handleGithubLogin}>
          <button className={styles.github}>Login with Github</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
