"use server";

import connectDB from "@/server/config/db";
import Transaction from "@/server/models/transaction.model";
import { ITransaction } from "@/types/transaction.interface";
import { NextResponse } from "next/server"; // Adjust the path to your Transaction model

export async function GET(request: Request) {
	await connectDB();

	const { searchParams } = new URL(request.url);
	const page = parseInt(searchParams.get("page") || "1", 10);
	const limit = parseInt(searchParams.get("limit") || "10", 10);
	const skip = (page - 1) * limit;

	try {
		const transactions: ITransaction[] = await Transaction.find()
			.skip(skip)
			.limit(limit)
			.sort({ date: -1 });
		const totalTransactions = await Transaction.countDocuments();

		return NextResponse.json({
			data: transactions,
			currentPage: page,
			totalPages: Math.ceil(totalTransactions / limit),
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Error fetching transactions" },
			{ status: 500 }
		);
	}
}
