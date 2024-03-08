"use client";

import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";
import { handleLogin } from "@/lib/actions";

const LoginForm = () => {
	const [state, formAction] = useFormState(handleLogin, undefined);

	return (
		<form className={styles.form} action={formAction}>
			{state?.error && <p className={styles.error}>{state.error}</p>}
			<input type="text" placeholder="username" name="username" />
			<input type="password" placeholder="password" name="password" />
			<button>Login</button>
			<Link href="/register">
				{"Don't have an account?"} <b>Register</b>
			</Link>
		</form>
	);
};

export default LoginForm;
