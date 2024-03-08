"use client";
import styles from "./registerForm.module.css";
import { handleRegistration } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import Link from "next/link";

const RegisterForm = () => {
	const [state, formAction] = useFormState(handleRegistration, undefined);

	const router = useRouter();

	useEffect(() => {
		state?.success && router.push("/login");
	}, [state?.success, router]);


	return (
		<form action={formAction} className={styles.form}>
			{state?.error ? <p className={styles.error}>{state.error}</p> : null}
			<input type='text' name="username" placeholder="username"/>
			<input type='email' name="email" placeholder="email"/>
			<input type='password' name="password" placeholder="password"/>
			<input type='password' name="passwordConfirmation" placeholder="password confirmation"/>
			<button type='submit'>Register</button>

			<Link href="/login">
				Have an account? <b>Login</b>
			</Link>
		</form>
	)
}

export default RegisterForm;
