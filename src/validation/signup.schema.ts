import { z } from "zod";

export const signupFormSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "Must be 2 or more characters long" })
		.max(50, { message: "Must be 50 or fewer characters long" }),
	lastName: z
		.string()
		.min(2, { message: "Must be 2 or more characters long" })
		.max(50, { message: "Must be 50 or fewer characters long" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters.",
		})
		.max(40, {
			message: "Password cannot exceed 40 characters.",
		}),
	gender: z.enum(["male", "female"], {
		errorMap: () => ({ message: "Gender must be either male or female" }),
	}),
	contactNumber: z.string().min(1, { message: "Contact number is required" }),
	profileImg: z.string().url().optional(),
});

