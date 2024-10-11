"use server";

import { userValidationSchema } from "@/validation/user.validation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import connectDB from "../config/db";
import User from "../models/user.model";


export type SignUpState = {
	error?: string;
	success?: boolean;
	message?: string;
	validationErrors?: {
		path: string;
		message: string;
	}[];
} | null;

export async function register(
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
				success: false,
				error: "This email is already registered",
			};
		}
		// Hash the password using bcrypt
		const hashedPassword = await bcrypt.hash(
			validatedData.password,
			Number(process.env.BCRYPT_SALT_ROUND)
		);

		// Create a new user instance
		const newUser = new User({
			firstName: validatedData.firstName,
			lastName: validatedData.lastName,
			email: validatedData.email,
			password: hashedPassword,
			gender: validatedData.gender,
			contactNumber: validatedData.contactNumber,
			profileImg: validatedData.profileImg,
		});

		// Save the user to the database
		await newUser.save();

		return {
			success: true,
			message: "Account created successfully",
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			// Return validation errors if schema fails
			const errors = error.errors.map((err) => ({
				path: err.path.join("."),
				message: err.message,
			}));
      return {
				success: false,
				error: "Validation failed",
				validationErrors: errors,
			};
		}

    return {
			success: false,
			error: "Something went wrong. Please try again.",
		};
	}
}