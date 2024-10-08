import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

// import bcrypt from "bcrypt";
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/backend/modules/user/user.model";
// import connect from "@/backend/utils/db";

// export const authOptions = {
// 	providers: [
// 		CredentialsProvider({
// 			id: "credentials",
// 			name: "credentials",
// 			credentials: {
// 				email: { label: "Email", type: "text" },
// 				password: { label: "Password", type: "password" },
// 			},
// 			async authorize(
// 				credentials: Record<"email" | "password", string> | undefined
// 			) {
// 				if (!credentials) {
// 					throw new Error("No credentials provided.");
// 				}

//         await connect();

// 				const user = await User.findOne({ email: credentials.email });
// 				if (!user) {
// 					throw new Error("No user found with this email.");
// 				}
// 				if (user) {
// 					const isPasswordCorrect = await bcrypt.compare(
// 						credentials.password,
// 						user.password
//           );
//           if (!isPasswordCorrect) {
// 						throw new Error("Incorrect password.");
// 					}
// 					if (isPasswordCorrect) {
// 						return user;
// 					}
// 				}
// 				return user;
// 			},
// 		}),
// 		GithubProvider({
// 			clientId: process.env.GITHUB_ID as string,
// 			clientSecret: process.env.GITHUB_SECRET as string,
// 		}),
// 	],
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
