// "use server";

// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import connectDB from "@/backend/utils/db";
// import User from "@/backend/modules/user/user.model";
// import bcrypt from "bcrypt";
// import { loginValidationSchema } from "./backend/modules/user/login.validation";

// interface Credentials {
//   email: string;
//   password: string;
// }

// export const { handlers, signIn, signOut, auth } = NextAuth({
// 	providers: [
// 		Credentials({
// 			name: "Credentials",
// 			credentials: {
// 				email: {
// 					label: "Email",
// 					type: "text",
// 				},
// 				password: { label: "Password", type: "password" },
// 			},
// 			authorize: async (credentials) => {
        
//         const { email, password } = credentials as Credentials;
        
// 				// Perform validation using the existing loginValidationSchema
// 				try {
//           loginValidationSchema.parse({ email, password });
// 				} catch (error: any) {
//           console.log(error);
// 					throw new Error("Invalid credentials.");
// 				}
        
//         await connectDB();
// 				// Find user in the database
// 				const user = await User.findOne({ email });
// 				if (!user) {
// 					throw new Error("No user found with this email.");
// 				}

// 				// Check if the password matches
// 				const isValidPassword = await bcrypt.compare(password, user.password);
// 				if (!isValidPassword) {
// 					throw new Error("Incorrect password.");
// 				}

// 				// If everything is valid, return the user object
// 				return user;
// 			},
// 		}),
// 	],
// });
// 	// pages: {
// 	// 	signIn: "/login", // Custom login page
// 	// },
// 	// session: {
// 	// 	strategy: "jwt",
// 	// },
// 	// callbacks: {
// 	// 	async jwt({ token, user }: { token: any; user: any }) {
// 	// 		console.log(token, user);
// 	// 		if (user) {
// 	// 			token.id = user.id;
// 	// 		}
// 	// 		return token;
// 	// 	},
// 	// 	async session({ session, token }: { session: any; token: any }) {
// 	// 		if (token) {
// 	// 			session.user.id = token.id as string;
// 	// 		}
// 	// 		return session;
// 	// 	},
// 	// },
// 	// secret: process.env.AUTH_SECRET,

// // import NextAuth, { CredentialsSignin } from "next-auth";
// // import Credentials from "next-auth/providers/credentials";
// // import Google from "next-auth/providers/google";
// // import connectDB from './backend/utils/db';
// // import User from './backend/modules/user/user.model';

// // export const { handlers, signIn, signOut, auth } = NextAuth({
// // 	providers: [
// // 		Credentials({
// // 			id: "credentials",
// // 			name: "credentials",
// // 			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
// // 			// e.g. domain, username, password, 2FA token, etc.
// // 			credentials: {
// // 				email: { label: "Email", type: "email" },
// // 				password: { label: "Password", type: "password" },
// // 			},
// //       authorize: async (credentials) => {
// //         const email = credentials.email as string | undefined;
// //         const password = credentials.password as string | undefined;

// //         if (!email && !password) {
// //           throw new CredentialsSignin("Please provide email and password");
// //         }

// // 				// logic to salt and hash password
// // 				// Hash the password using bcrypt
// // 				// const hashedPassword = await bcrypt.hash(
// // 				// 	credentials.password,
// // 				// 	Number(process.env.BCRYPT_SALT_ROUND)
// //         // );

// //         connectDB();

// // 				// logic to verify if the user exists
// //         const user = await User.findOne({ email }).select("+password")

// // 				if (!user) {
// // 					// No user found, so this is their first attempt to login
// // 					// meaning this is also the place you could do registration
// // 					throw new Error("User not found.");
// // 				}

// // 				// return user object with their profile data
// // 				return user;
// // 			},
// // 		}),
// // 		Google({
// // 			clientId: process.env.GOOGLE_CLIENT_ID,
// // 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// // 		}),
// // 	],
// // });
