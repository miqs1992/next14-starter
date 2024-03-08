import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {connectToDb} from "@/lib/utils";
import {User} from "@/lib/models";
import bcrypt from "bcryptjs";
import {authConfig} from "@/lib/auth.config";

const login = async (credentials) => {
	try {
		connectToDb();
		const user = await User.findOne({ username: credentials.username });

		if (!user) throw new Error("Wrong credentials!");

		const isPasswordCorrect = await bcrypt.compare(
			credentials.password,
			user.password
		);

		if (!isPasswordCorrect) throw new Error("Wrong credentials!");

		return user;
	} catch (err) {
		console.log(err);
		throw new Error("Failed to login!");
	}
};

export const githubProvider = Github({
	clientId: process.env.GITHUB_ID,
	clientSecret: process.env.GITHUB_SECRET,
});

export const credentialsProvider = CredentialsProvider({
	async authorize(credentials) {
		try {
			const user = await login(credentials);
			return user;
		} catch (err) {
			return null;
		}
	},
})

export const authOptions = {
	...authConfig,
	// Configure one or more authentication providers
	providers: [githubProvider, credentialsProvider],
	callbacks: {
		async signIn({user, account, profile}) {
			if(account.provider === "github") {
				await connectToDb();
				try {
					const user = await User.findOne({ email: profile.email });

					if (!user) {
						const newUser = new User({
							email: profile.email,
							username: profile.login,
							image: profile.image,
							password: 'Test123!',
						});

						await newUser.save();
					}
				} catch (error) {
					console.log(error);
					return false;
				}
			}
			return true
		},
		authorized({ auth, request }) {
			const user = auth?.user;
			const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
			const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
			const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

			// ONLY ADMIN CAN REACH THE ADMIN DASHBOARD

			if (isOnAdminPanel && !user?.isAdmin) {
				return false;
			}

			// ONLY AUTHENTICATED USERS CAN REACH THE BLOG PAGE

			if (isOnBlogPage && !user) {
				return false;
			}

			// ONLY UNAUTHENTICATED USERS CAN REACH THE LOGIN PAGE

			if (isOnLoginPage && user) {
				return Response.redirect(new URL("/", request.nextUrl));
			}

			return true
		},
		...authConfig.callbacks,
	}
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions)
