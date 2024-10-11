import { z } from "zod";

// Helper function to check capitalized string
const capitalizeValidator = z.custom<string>(
	(value) => {
		const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
		return capitalized === value;
	},
	{ message: "Value must be capitalized" }
);

// User validation schema
export const userValidationSchema = z.object({
	firstName: z
		.string()
		.min(2, { message: "First name must be at least 2 characters" })
		.max(30, {
			message: "First name must be less than or equal to 30 characters",
		})
		.refine((value) => capitalizeValidator.parse(value), {
			message: "First name must be capitalized",
		}),

	lastName: z
		.string()
		.min(2, { message: "Last name must be at least 2 characters" })
		.max(30, {
			message: "Last name must be less than or equal to 30 characters",
		})
		.refine((value) => capitalizeValidator.parse(value), {
			message: "Last name must be capitalized",
    }),
  
	email: z
		.string()
		.email({ message: "Email is not valid" })
		.min(1, { message: "Email is required" }),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),

	gender: z.enum(["male", "female"], {
		errorMap: () => ({ message: "Gender must be either male or female" }),
	}),

	contactNumber: z.string().min(1, { message: "Contact number is required" }),
	profileImg: z.string().url().optional(),
});

export type RegisterFormData = z.infer<typeof userValidationSchema>;