import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/backend/modules/user/user.model";
import connect from "@/backend/utils/db";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(
				credentials: Record<"email" | "password", string> | undefined
			) {
				if (!credentials) {
					return null;
				}

				await connect();
				const user = await User.findOne({ email: credentials.email });
				if (user) {
					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (isPasswordCorrect) {
						return user;
					}
				}
				return null;
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
	],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
