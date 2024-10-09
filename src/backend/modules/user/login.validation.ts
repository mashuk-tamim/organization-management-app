import { z } from "zod";

// Login validation schema
export const loginValidationSchema = z.object({
	email: z
		.string()
		.email({ message: "Email is not valid" })
		.min(1, { message: "Email is required" }),

	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormData = z.infer<typeof loginValidationSchema>;
