import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

export const githubProvider = Github({
	clientId: process.env.GITHUB_ID,
	clientSecret: process.env.GITHUB_SECRET,
});

export const authOptions = {
	// Configure one or more authentication providers
	providers: [githubProvider],
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions)
