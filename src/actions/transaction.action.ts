"use server";

import { z } from "zod";
import { transactionValidationSchema } from "@/backend/modules/transaction/transaction.validation";
import connectDB from "@/backend/utils/db";
import Transaction from "@/backend/modules/transaction/transaction.model";
import mongoose from "mongoose";

// Infer the transaction data type from the validation schema
export type TransactionData = z.infer<typeof transactionValidationSchema>;

export type TransactionState = {
	error?: string;
	success?: boolean;
	message?: string;
	data: TransactionData | null;
	validationErrors?: { path: string; message: string }[];
} | null;

export async function addTransaction(
	prevState: TransactionState,
	formData: FormData
): Promise<TransactionState> {
	try {
		// Attempt to connect to the database
		await connectDB();

		// Extract data from formData
		const rawTransactionData: TransactionData = {
			date: formData.get("date") as string,
			type: formData.get("type") as "Income" | "Expense",
			category: formData.get("category") as
				| "Project Completion"
				| "Service Sale"
				| "Salary"
				| "Utilities",
			amount: Number(formData.get("amount")),
			department: formData.get("department") as
				| "Development"
				| "Design"
				| "Others",
		};

		// Validate the data
		const validatedData = transactionValidationSchema.parse(rawTransactionData);

		// Create and save the transaction
		const newTransaction = new Transaction(validatedData);
		const savedTransaction = await newTransaction.save();

		return {
			success: true,
			message: "Transaction added successfully",
			data: savedTransaction,
		};
	} catch (error: any) {
		// Handle Zod validation errors
		if (error instanceof z.ZodError) {
			const validationErrors = error.errors.map((err) => ({
				path: err.path.join("."),
				message: err.message,
			}));
			return {
				success: false,
				error: "Validation failed",
        validationErrors: validationErrors,
        data: null,
			};
		}

		// Handle specific Mongoose validation errors
		if (error instanceof mongoose.Error.ValidationError) {
			return {
				success: false,
				error: "Transaction validation failed",
				validationErrors: Object.values(error.errors).map((err) => ({
					path: err.path,
					message: err.message,
        })),
        data: null
			};
		}

		// Handle duplicate transaction error
		if (error.code === 11000) {
			return {
				success: false,
        error: "This transaction already exists",
        data: null,
			};
		}

		// Catch-all error handler
		return {
			success: false,
      error: error.message || "An unexpected error occurred. Please try again.",
      data: null,
		};
	}
}

// import { z } from "zod";
// import { transactionValidationSchema } from "@/backend/modules/transaction/transaction.validation";
// import connectDB from "@/backend/utils/db";
// import Transaction from "@/backend/modules/transaction/transaction.model";

// // Infer the transaction data type from the validation schema
// export type TransactionData = z.infer<typeof transactionValidationSchema>;

// export type TransactionState = {
// 	error?: string;
// 	success?: boolean;
// 	message?: string;
// 	data?: TransactionData;
// 	validationErrors?: { path: string; message: string }[];
// } | null;

// export async function addTransaction(
// 	prevState: TransactionState,
// 	formData: FormData
// ): Promise<TransactionState> {
//   // Extract data from formData
//   const rawTransactionData: TransactionData = {
//     date: formData.get("date") as string, // or format the date as needed
//     type: formData.get("type") as "Income" | "Expense",
//     category: formData.get("category") as
//       | "Project Completion"
//       | "Service Sale"
//       | "Salary"
//       | "Utilities",
//     amount: Number(formData.get("amount")), // Ensure it's a number
//     department: formData.get("department") as
//       | "Development"
//       | "Design"
//       | "Others",
//   };
//   console.log(rawTransactionData);

// 	try {
// 		// Implement your logic to add the transaction to your database
// 		await connectDB();
// 		const validatedData = transactionValidationSchema.parse(rawTransactionData);

// 		// Create a new user instance
// 		const newTransaction = new Transaction({
// 			date: validatedData.date,
// 			type: validatedData.type,
// 			category: validatedData.category,
// 			amount: validatedData.amount,
// 			department: validatedData.department,
// 		});

// 		await newTransaction.save();

// 		// e.g., await database.transaction.create({ data: transaction });

// 		// If successful, return a success message or the created transaction
// 		return {
// 			success: true,
// 			message: "Transaction added successfully",
// 			data: newTransaction,
// 		};
//   } catch (error) {
// 		console.log("Error adding transaction:", error);
// 		// Handle Zod validation errors
// 		if (error instanceof z.ZodError) {
// 			const validationErrors = error.errors.map((err) => ({
// 				path: err.path.join("."),
// 				message: err.message,
// 			}));
// 			return {
// 				success: false,
// 				error: "Validation failed",
// 				validationErrors: validationErrors,
// 			};
// 		}

// 		// Catch-all error handling for any other errors
// 		console.log("Error details:", JSON.stringify(error, null, 2)); // Detailed error
// 		return {
// 			success: false,
// 			error: "Something went wrong. Please try again.",
// 		};
// 	}
// }
