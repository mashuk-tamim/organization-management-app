"use server";

import connectDB from "@/server/config/db";
import Transaction from "@/server/models/transaction.model";
import { Types } from "mongoose";
import { ITransaction } from "@/types/transaction.interface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const transactionId = searchParams.get("id");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);

		const typeFilter = searchParams.get("type") || null;
		const categoryFilter = searchParams.get("category") || null;
		const departmentFilter = searchParams.get("department") || null;

		const sortField = searchParams.get("sortField") || null;
		const sortOrder = searchParams.get("sortOrder") || "default";

		await connectDB();

		const baseFilters = { isDeleted: { $ne: true } };

		if (transactionId) {
			console.log("Received request for transaction ID:", transactionId);

			if (!Types.ObjectId.isValid(transactionId)) {
				return NextResponse.json(
					{ error: "Invalid transaction ID" },
					{ status: 400 }
				);
			}

			const transaction = await Transaction.findOne({
				_id: transactionId,
				...baseFilters,
			});

			if (!transaction) {
				return NextResponse.json(
					{ error: "Transaction not found" },
					{ status: 404 }
				);
			}

			console.log("Found transaction:", transaction);
			return NextResponse.json({ transaction });
		}

		const skip = (page - 1) * limit;

		const filters: any = {
			...baseFilters,
		};
		if (typeFilter) filters.type = typeFilter;
		if (categoryFilter) filters.category = categoryFilter;
		if (departmentFilter) filters.department = departmentFilter;

		const query = Transaction.find(filters).skip(skip).limit(limit);

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
