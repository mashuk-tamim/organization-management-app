"use server";

import bcrypt from "bcrypt";
import User from "@/backend/modules/user/user.model";
import connectDB from "@/backend/utils/db";
import z from "zod";
import { loginValidationSchema } from "@/backend/modules/user/login.validation";
import { IUser } from "@/backend/modules/user/user.interface";

export type LoginState = {
  user: IUser | null;
	error?: string;
	success?: boolean;
	message?: string;
	validationErrors?: {
		path: string;
		message: string;
	}[];
} | null;

export async function login(
	prevState: LoginState,
	formData: FormData
): Promise<LoginState> {
	const rawFormData = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	try {
		// Validate login data
		const validatedData = loginValidationSchema.parse(rawFormData);

		const email = validatedData.email;
		const password = validatedData.password;

		await connectDB();

		// Check if the user exists
		const existingUser = await User.findOne({ email }).select("+password");

		if (!existingUser) {
      return {
        user: null,
				error: "Invalid email or password.",
			};
		}

		// Compare the provided password with the stored hashed password
		const isPasswordMatch = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordMatch) {
      return {
        user: null,
				error: "Invalid email or password.",
			};
		}

    return {
			user: existingUser,
			success: true,
			message: "Login successful.",
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			// Return validation errors if schema fails
			const errors = error.errors.map((err) => ({
				path: err.path.join("."),
				message: err.message,
			}));
      return {
        user: null,
				error: "Validation failed",
				validationErrors: errors,
			};
		}

    console.log("Login error:", error);
    return {
      user: null,
			error: "Something went wrong. Please try again.",
		};
	}
}
