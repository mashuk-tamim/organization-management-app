import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters.",
		})
		.max(40, {
			message: "Password cannot exceed 40 characters.",
		}),
});
