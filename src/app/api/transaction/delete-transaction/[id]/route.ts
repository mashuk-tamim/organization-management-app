import connectDB from "@/server/config/db";
import Transaction from "@/server/models/transaction.model";
import { NextResponse } from "next/server";

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
	await connectDB();
	const { id } = params;

	try {
		// Update the transaction to mark it as deleted
		const transaction = await Transaction.findByIdAndUpdate(id, {
			isDeleted: true,
		});

		if (!transaction) {
			return NextResponse.json(
				{ error: "Transaction not found" },
				{ status: 404 }
			);
		}

    return NextResponse.json({
      isDeleted: true,
			message: "Transaction soft deleted successfully",
		});
  } catch (error) {
    console.log(error);
		return NextResponse.json(
      {
        isDeleted: false,
        message: "Error deleting transaction"
      },
			{ status: 500 }
		);
	}
}
