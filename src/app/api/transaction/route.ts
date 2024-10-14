"use server";

import connectDB from "@/server/config/db";
import Transaction from "@/server/models/transaction.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		// Get transactionId from the URL query
		const { searchParams } = new URL(request.url);
		const transactionId = searchParams.get("id");
		console.log("Received request for transaction ID:", transactionId);

		if (!transactionId) {
			return NextResponse.json(
				{ error: "Transaction ID is required" },
				{ status: 400 }
			);
		}

		// Connect to the database
		await connectDB();

		// Validate if transactionId is a valid ObjectId
		if (!mongoose.Types.ObjectId.isValid(transactionId)) {
			return NextResponse.json(
				{ error: "Invalid transaction ID" },
				{ status: 400 }
			);
		}

		// const validTransactionId = new mongoose.Types.ObjectId(transactionId);

		// Find the transaction by its ID
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
	} catch (error) {
		console.error("Error fetching transaction:", error);
		return NextResponse.json(
			{ error: "Failed to retrieve transaction" },
			{ status: 500 }
		);
	}
}
