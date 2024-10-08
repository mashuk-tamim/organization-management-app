"use server";

import User from "@/backend/modules/user/user.model";
import { userValidationSchema } from "@/backend/modules/user/user.validation";
import connectDB from "@/backend/utils/db";
import { z } from "zod";

export type SignUpState = {
	error?: string;
	success?: boolean;
	message?: string;
	validationErrors?: {
		path: string;
		message: string;
	}[];
} | null;

export async function signUp(
	prevState: SignUpState,
	formData: FormData
): Promise<SignUpState> {
	const rawFormData = {
		firstName: formData.get("firstName"),
		lastName: formData.get("lastName"),
		email: formData.get("email"),
		password: formData.get("password"),
		gender: formData.get("gender"),
		contactNumber: formData.get("contactNumber"),
		profileImg: formData.get("profileImg") || undefined,
	};

	try {
		const validatedData = userValidationSchema.parse(rawFormData);
		const email = validatedData.email;

		await connectDB();

		const existingUser = await User.findOne({ email });

		// Check for existing user (replace with actual database check)
		if (existingUser) {
			return {
				error: "This email is already registered",
			};
		}

		return {
			success: true,
			message: "Account created successfully",
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errors = error.errors.map((err) => ({
				path: err.path.join("."),
				message: err.message,
			}));
			return {
				error: "Validation failed",
				validationErrors: errors,
			};
		}

		return {
			error: "Something went wrong. Please try again.",
		};
	}
}
