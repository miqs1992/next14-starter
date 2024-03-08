import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import {connectToDb} from "@/lib/utils";
import {User} from "@/lib/models";
import bcrypt from "bcryptjs";

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
		}
	}
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions)
