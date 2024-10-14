"use client";

import { ITransaction } from "@/types/transaction.interface";
import { ColumnDef } from "@tanstack/react-table";
import TransactionActions from "./transaction-actions";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ITransaction>[] = [
	{
		accessorKey: "date",
		header: ({ column }) => {
			return (
        <div
          className="flex"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</div>
			);
		},
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
		header: ({ column }) => {
			return (
        <div
          className="flex"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Amount
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</div>
			);
		},
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
