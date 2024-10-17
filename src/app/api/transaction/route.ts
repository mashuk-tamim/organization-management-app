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

		// Get filters from query params
		const typeFilter = searchParams.get("type") || null;
		const categoryFilter = searchParams.get("category") || null;
		const departmentFilter = searchParams.get("department") || null;

		// for sorting
		const sortField = searchParams.get("sortField") || null;
		const sortOrder = searchParams.get("sortOrder") || "default";

		// Connect to the database
		await connectDB();

		// Base filter to exclude soft-deleted transactions
		const baseFilters = { isDeleted: { $ne: true } };

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

			const transaction = await Transaction.findOne({
				_id: transactionId,
				...baseFilters, // Include base filters to prevent fetching deleted transactions
			});

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

		const skip = (page - 1) * limit;

		// Build query object with filters
		// Build query object with filters
		const filters: any = {
			...baseFilters, // Include base filters in all queries
		};
		if (typeFilter) filters.type = typeFilter;
		if (categoryFilter) filters.category = categoryFilter;
		if (departmentFilter) filters.department = departmentFilter;

		const query = Transaction.find(filters).skip(skip).limit(limit);

		// Apply sorting only if sortOrder is not "default"
		if (sortField && (sortOrder === "asc" || sortOrder === "desc")) {
			const sortOrderValue = sortOrder === "asc" ? 1 : -1;
			query.sort({ [sortField]: sortOrderValue });
		}

		const transactions: ITransaction[] = await query;

		const totalTransactions = await Transaction.countDocuments(filters);

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

