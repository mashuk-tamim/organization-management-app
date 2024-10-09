import bcrypt from 'bcrypt';
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDB from './backend/utils/db';
import User from './backend/modules/user/user.model';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			id: "credentials",
			name: "credentials",
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email && !password) {
          throw new CredentialsSignin("Please provide email and password");
        }

				// logic to salt and hash password
				// Hash the password using bcrypt
				// const hashedPassword = await bcrypt.hash(
				// 	credentials.password,
				// 	Number(process.env.BCRYPT_SALT_ROUND)
        // );
        
        connectDB();

				// logic to verify if the user exists
        const user = await User.findOne({ email }).select("+password")

				if (!user) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error("User not found.");
				}

				// return user object with their profile data
				return user;
			},
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
});
