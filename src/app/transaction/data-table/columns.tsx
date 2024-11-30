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

