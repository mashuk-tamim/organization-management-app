"use server";

import { z } from "zod";
import mongoose from "mongoose";
import { transactionValidationSchema } from "@/validation/transaction.validation";
import connectDB from "../config/db";
import Transaction from "../models/transaction.model";

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
				data: null,
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

// Fetch all transactions
export async function getAllTransactions() {
	try {
		await connectDB(); // Connect to the database
		const transactions = await Transaction.find();

		// Convert MongoDB documents into plain JavaScript objects
		const plainTransactions = transactions.map((transaction) => {
			const plainTransaction = transaction.toObject(); // Convert Mongoose doc to plain object

			// Transform _id, createdAt, updatedAt into strings
			return {
				...plainTransaction,
				_id: plainTransaction._id.toString(), 
				createdAt: plainTransaction.createdAt.toISOString(),
				updatedAt: plainTransaction.updatedAt.toISOString(),
			};
		});

		return {
			success: true,
			data: plainTransactions,
		};
	} catch (error) {
		console.log("Error fetching transactions:", error);
		return {
			success: false,
			error: "Failed to fetch transactions",
		};
	}
}

export async function getTransactionById(transactionId: string) {
	try {
		console.log(`Fetching transaction with ID: ${transactionId}`);
		const response = await fetch(
			`http://localhost:3000/api/transaction?id=${transactionId}`
		);

		console.log(`Response status: ${response.status}`);
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const data = await response.json();
		console.log("Received data:", data);
		return data.transaction;
	} catch (error) {
		console.error("Failed to fetch transaction:", error);
		return null;
	}
}

