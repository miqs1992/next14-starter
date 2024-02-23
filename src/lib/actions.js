"use server";
import {connectToDb} from "@/lib/utils";
import { revalidatePath } from "next/cache";
import {Post} from "@/lib/models";

export const addPost = async (prevState,formData) => {
	// const title = formData.get("title");
	// const desc = formData.get("desc");
	// const slug = formData.get("slug");

	const { title, desc, slug, userId } = Object.fromEntries(formData);

	try {
		connectToDb();
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
		connectToDb();

		await Post.findByIdAndDelete(id);
		console.log("deleted from db");
		revalidatePath("/blog");
		revalidatePath("/admin");
	} catch (err) {
		console.log(err);
		return { error: "Something went wrong!" };
	}
};
