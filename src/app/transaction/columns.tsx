"use client";

import { ITransaction } from "@/types/transaction.interface";
import { ColumnDef } from "@tanstack/react-table";
import TransactionActions from "./transaction-actions";

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
	},
	{
		accessorKey: "department",
		header: "Department",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const transaction = row.original;

			return (
				<TransactionActions
					transaction={transaction}
				/>
			);
		},
	},
];

// cell: ({ row }) => {
// 			const amount = parseFloat(row.getValue("amount"));
// 			const formatted = new Intl.NumberFormat("en-US", {
// 				style: "currency",
// 				currency: "USD",
// 				minimumFractionDigits: 0, // No decimal digits
// 				maximumFractionDigits: 0, // No decimal digits
// 			}).format(amount);

// 			return <div className="">{formatted}</div>;
// 		},
