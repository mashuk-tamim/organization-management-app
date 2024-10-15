"use server";

import connectDB from "@/server/config/db";
import Transaction from "@/server/models/transaction.model";
import mongoose from "mongoose";
import { ITransaction } from "@/types/transaction.interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		// Parse URL and searchParams
		const { searchParams } = new URL(request.url);
		const transactionId = searchParams.get("id");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		// for sorting
    const sortField = searchParams.get("sortField") || null;
		const sortOrder = searchParams.get("sortOrder") || "default";

		// Connect to the database
		await connectDB();

		// If there's a transaction ID, fetch a single transaction
		if (transactionId) {
			console.log("Received request for transaction ID:", transactionId);

			// Validate if transactionId is a valid ObjectId
			if (!mongoose.Types.ObjectId.isValid(transactionId)) {
				return NextResponse.json(
					{ error: "Invalid transaction ID" },
					{ status: 400 }
				);
			}

			const transaction = await Transaction.findById(transactionId);

			if (!transaction) {
				return NextResponse.json(
					{ error: "Transaction not found" },
					{ status: 404 }
				);
			}

			console.log("Found transaction:", transaction);
			// Return the transaction data
			return NextResponse.json({ transaction });
		}

		// If no transaction ID, fetch all transactions (paginated)
		const skip = (page - 1) * limit;
		const query = Transaction.find().skip(skip).limit(limit);

		// Apply sorting only if sortOrder is not "default"
		if (sortField && (sortOrder === "asc" || sortOrder === "desc")) {
			const sortOrderValue = sortOrder === "asc" ? 1 : -1;
			query.sort({ [sortField]: sortOrderValue });
		}

		const transactions: ITransaction[] = await query;

		const totalTransactions = await Transaction.countDocuments();

		return NextResponse.json({
			data: transactions,
			currentPage: page,
			totalPages: Math.ceil(totalTransactions / limit),
		});
	} catch (error) {
		console.error("Error processing transaction request:", error);
		return NextResponse.json(
			{ error: "Failed to process transaction request" },
			{ status: 500 }
		);
	}
}
