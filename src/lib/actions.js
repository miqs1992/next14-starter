"use server";
import {connectToDb} from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {Post, User} from "@/lib/models";
import {signIn, signOut} from "@/lib/auth";
import bcrypt from "bcryptjs";

export const addPost = async (prevState,formData) => {
	// const title = formData.get("title");
	// const desc = formData.get("desc");
	// const slug = formData.get("slug");

	const { title, desc, slug, userId } = Object.fromEntries(formData);

	try {
		await connectToDb();
		const newPost = new Post({
			title,
			desc,
			slug,
			userId,
		});

		await newPost.save();
		console.log("saved to db");
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		console.log(err);
		return { error: "Something went wrong!" };
	}
};

export const deletePost = async (formData) => {
	const { id } = Object.fromEntries(formData);

	try {
		await connectToDb();

		await Post.findByIdAndDelete(id);
		console.log("deleted from db");
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		console.log(err);
		return { error: "Something went wrong!" };
	}
};

export const handleGithubLogin = async () => {
	await signIn("github");
}

export const handleGithubLogout = async () => {
	await signOut();
}

export const handleRegistration = async (previousState, formData) => {
	const { username, email, password, passwordConfirmation, img } = Object.fromEntries(formData);

	if (password !== passwordConfirmation) {
		return { error: "Passwords do not match!" };
	}

	await connectToDb();
	try {
		const user = await User.findOne({ email });

		if (user) {
			return { error: "User already exists!" };
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			username,
			password: hashedPassword,
			img,
		});

		await newUser.save();
		return { success: true };
	} catch (error) {
		console.log(error);
		return { error: "Something went wrong!" };
	}
}

export const handleLogin = async (previousState, formData) => {
	const { username, password } = Object.fromEntries(formData);

	await connectToDb();
	try {
		await signIn("credentials", {username, password});
	} catch (error) {
		console.log(error);
		if (error.message.includes("CredentialsSignin")) {
			return { error: "Invalid username or password" };
		}
		throw error;
	}
}
