"use server";

import { loginValidationSchema } from "@/validation/login.validation";
import bcrypt from "bcryptjs";
import z from "zod";
import connectDB from "../config/db";
import User from "../models/user.model";
import { IUser } from "@/types/user.interface";
import { cookies } from "next/headers";
import { signJWT } from "../utils/jwt";

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

		const userId = existingUser._id.toString();

		// Create jwt token
		const accessToken = await signJWT(userId);

		// Assign the cookie
		cookies().set("access_token", accessToken, {
			secure: true,
			httpOnly: true,
			expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
			path: "/",
			sameSite: "strict",
		});

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
		return {
			user: null,
			error: "Something went wrong. Please try again.",
		};
	}
}
