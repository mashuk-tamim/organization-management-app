import connectDB from "@/server/config/db";
import Transaction from "@/server/models/transaction.model";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
	await connectDB();
	const { transactionId } = await req.json(); // Parse ID from request body (or URL if necessary)

	// Check if the id is a valid ObjectId
	if (!ObjectId.isValid(transactionId)) {
		return NextResponse.json(
			{ error: "Invalid transaction ID" },
			{ status: 400 }
		);
  }
  
  const objectId = new mongoose.Types.ObjectId(transactionId);

	try {
		// Update the transaction to mark it as deleted
		const transaction = await Transaction.findByIdAndUpdate(
			objectId,
			{ isDeleted: true },
			{ new: true }
		);

		if (!transaction) {
			return NextResponse.json(
				{ error: "Transaction not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			isDeleted: true,
			message: "Transaction deleted successfully",
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				isDeleted: false,
				message: "Error deleting transaction",
			},
			{ status: 500 }
		);
	}
}
