import { z } from "zod";

export const transactionValidationSchema = z.object({
	date: z.string(),
	type: z.enum(["Income", "Expense"], {
		required_error: "Type is required",
	}),
	category: z.enum(
		["Project Completion", "Service Sale", "Salary", "Utilities"],
		{
			required_error: "Category is required",
		}
	),
	amount: z.number().nonnegative(),
	department: z.enum(["Development", "Design", "Others"], {
		required_error: "Department is required",
	}),
});