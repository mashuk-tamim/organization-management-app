"use client";

import { ITransaction } from "@/types/transaction.interface";
import { ColumnDef } from "@tanstack/react-table";
import TransactionActions from "./transaction-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ITransaction>[] = [
	{
		accessorKey: "date",
		header: "Date",
	},
	{
		accessorKey: "type",
		header: "Type",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "amount",
		header: "Amount",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 0, // No decimal digits
				maximumFractionDigits: 0, // No decimal digits
			}).format(amount);

			return <div className="">{formatted}</div>;
		},
	},
	{
		accessorKey: "department",
		header: "Department",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const transaction = row.original;

			return <TransactionActions transaction={transaction} />;
		},
	},
];
