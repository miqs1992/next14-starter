import {connectToDb} from "@/lib/utils";
import {Post} from "@/lib/models";
import {NextResponse} from "next/server";

export const GET = async (request, {params}) => {
	try {
		await connectToDb();

		console.log(params);
		const post = await Post.findOne({slug: params.slug});
		console.log('post', post);
		return NextResponse.json(post);
	} catch (err) {
		console.log(err);
		throw new Error("Failed to fetch post!");
	}
};
