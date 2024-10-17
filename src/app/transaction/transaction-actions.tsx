import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ViewTransactionDialog from "./view-transaction-dialog";
import { ITransaction } from "@/types/transaction.interface";
import { useTransactionContext } from "@/provider/TransactionContext";
import { useRouter } from "next/navigation";

export default function TransactionActions({
  transaction,
}: {
	transaction: ITransaction;
  }) {
  const { setTransactions } = useTransactionContext();
	const transactionId = transaction._id!;
	const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const router = useRouter();

	const handleOpenDialog = useCallback(() => {
		setDialogOpen(true);
		setDropdownOpen(false); // Close the dropdown when opening the dialog
	}, []);

	const handleCloseDialog = useCallback(() => {
		setDialogOpen(false);
	}, []);

	const handleDropdownOpenChange = useCallback((open: boolean) => {
		setDropdownOpen(open);
	}, []);

	const handleDeleteTransaction = useCallback(async (transactionId: string) => {
		console.log("will delete", transactionId);
		try {
			const response = await fetch(
				`/api/transaction/delete-transaction/${transactionId}`,
				{
					method: "PATCH", // Use PATCH for updating `isDeleted` field
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ isDeleted: true }), // Sending the updated field in the body
				}
      );
      
      console.log(response);

			if (response.ok) {
				// Remove the transaction from the state after soft deletion
        router.refresh();
				// setTransactions((prev) =>
				// 	prev.filter((txn) => txn._id !== transactionId)
				// );
        console.log("Transaction deleted:", transactionId);
			} else {
				console.error("Failed to delete transaction");
			}
		} catch (error) {
			console.error("Error deleting transaction:", error);
		}
	}, [setTransactions, router]);

	return (
		<div className="relative">
			<DropdownMenu open={dropdownOpen} onOpenChange={handleDropdownOpenChange}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => {
							navigator.clipboard.writeText(transactionId);
							setDropdownOpen(false);
						}}
					>
						Copy transaction ID
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleOpenDialog}>
						View Transaction Details
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => handleDeleteTransaction(transactionId)}
					>
						Delete Transaction
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<ViewTransactionDialog
				transactionId={transactionId}
				open={dialogOpen}
				onOpenChange={handleCloseDialog}
			/>
		</div>
	);
}
