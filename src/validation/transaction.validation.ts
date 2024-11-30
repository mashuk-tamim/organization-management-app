import { z } from "zod";

export const transactionValidationSchema = z.object({
	// Ensuring date is required
	date: z
		.string({
			required_error: "Date is required",
		})
		.min(1, { message: "Date is required" }),

	// Type is already handled
	type: z.enum(["Income", "Expense"], {
		required_error: "Type is required",
	}),

	// Category is already handled
	category: z.enum(
		["Project Completion", "Service Sale", "Salary", "Utilities"],
		{
			required_error: "Category is required",
		}
	),

	// Ensuring amount is non-negative and required
	amount: z
		.number({
			required_error: "Amount is required",
		})
		.nonnegative({ message: "Amount must be a positive number" }),

	// Department is already handled
	department: z.enum(["Development", "Design", "Others"], {
		required_error: "Department is required",
  }),
});
