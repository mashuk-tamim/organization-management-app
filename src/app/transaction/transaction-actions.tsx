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

export default function TransactionActions({
	transaction,
}: {
	transaction: ITransaction;
}) {
	const transactionId = transaction._id!;
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

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
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleOpenDialog}>
						View Transaction Details
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
