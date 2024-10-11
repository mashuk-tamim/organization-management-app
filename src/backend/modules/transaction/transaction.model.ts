import { model, models, Schema } from "mongoose";
import { ITransaction } from "./transaction.interface";

const transactionSchema: Schema = new Schema<ITransaction>(
	{
		date: { type: String, required: true },
		type: { type: String, enum: ["Income", "Expense"], required: true },
		category: {
			type: String,
			enum: ["Project Completion", "Service Sale", "Salary", "Utilities"],
			required: true,
		},
		amount: { type: Number, required: true, min: 0 },
		department: {
			type: String,
			enum: ["Development", "Design", "Others"],
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Transaction = models?.Transaction || model<ITransaction>("Transaction", transactionSchema);
export default Transaction;
