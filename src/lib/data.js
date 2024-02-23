// TEMPORARY DATA
// const users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
// ];

// const posts = [
//   { id: 1, title: "Post 1", body: "......", userId: 1 },
//   { id: 2, title: "Post 2", body: "......", userId: 1 },
//   { id: 3, title: "Post 3", body: "......", userId: 2 },
//   { id: 4, title: "Post 4", body: "......", userId: 2 },
// ];

import {Post, User} from "@/lib/models";
import {connectToDb} from "@/lib/utils";

export const getPosts = async () => {
	try {
		connectToDb();
		return Post.find();
	} catch (error) {
		console.log(error);
		throw new Error("failed to fetch posts");
	}
}

export const getPost = async (slug) => {
	try {
		connectToDb();
		return Post.findOne({slug});
	} catch (error) {
		console.log(error);
		throw new Error("failed to fetch post");
	}
}

export const getUser = async (id) => {
	try {
		connectToDb();
		return User.findById(id);
	} catch (error) {
		console.log(error);
		throw new Error("failed to fetch user");
	}
}
