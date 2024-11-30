"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getTransactionById } from "@/server/actions/transaction.action";
import { ITransaction } from "@/types/transaction.interface";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ViewTransactionDialogProps {
	transactionId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function ViewTransactionDialog({
	transactionId,
	open,
	onOpenChange,
}: ViewTransactionDialogProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transaction, setTransaction] = useState<ITransaction | null>(null);
  const createdAt = new Date(transaction?.createdAt || 0);
	const router = useRouter();

	// Fetch transaction details when the dialog opens
	useEffect(() => {
		let isMounted = true;
		if (open) {
			getTransactionById(transactionId).then((data) => {
				if (isMounted) setTransaction(data);
			});
		} else {
			setTransaction(null);
		}
		return () => {
			isMounted = false;
		};
	}, [open, transactionId]);

	// Handle delete confirmation
	const handleConfirmDelete = () => {
		handleDeleteTransaction();
		setIsDeleteDialogOpen(false);
	};

	// Function to delete transaction
	const handleDeleteTransaction = useCallback(async () => {
		console.log("will delete", transactionId);
		try {
			const response = await fetch(`/api/transaction/delete-transaction`, {
				method: "PATCH", // Use PATCH for soft deletion
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ transactionId }),
			});

			if (response.ok) {
				router.refresh();
				console.log("Transaction deleted:", transactionId);
			} else {
				console.error("Failed to delete transaction");
			}
		} catch (error) {
			console.error("Error deleting transaction:", error);
		}
	}, [router, transactionId]);

	const handleEditTransaction = () => {
		// Implement edit functionality here
	};

	if (!open) return null;

	return (
		<div>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent
					className="sm:max-w-[425px]"
					onClick={(e) => e.stopPropagation()}
				>
					<DialogHeader>
						<DialogTitle>Transaction Details</DialogTitle>
					</DialogHeader>
					{transaction ? (
						<div className="flex flex-col gap-2">
							<p>
								<span className="text-accent-foreground">Transaction ID: </span>
								{transaction._id}
							</p>
							<p>
								<span className="text-accent-foreground">Date: </span>
								{new Date(transaction.date).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
							<p>
								<span className="text-accent-foreground">Created At: </span>
								{new Date(createdAt).toLocaleDateString("en-US", {
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</p>
							<p>
								<span className="text-accent-foreground">Amount: </span>$
								{transaction.amount}
							</p>
							<p>
								<span className="text-accent-foreground">Type: </span>
								{transaction.type}
							</p>
							<p>
								<span className="text-accent-foreground">Category: </span>
								{transaction.category}
							</p>
							<p>
								<span className="text-accent-foreground">Department: </span>
								{transaction.department}
							</p>
							<Button onClick={handleEditTransaction}>Edit Transaction</Button>
							{/* Trigger delete dialog */}
							<Button onClick={() => setIsDeleteDialogOpen(true)}>
								Delete Transaction
							</Button>
						</div>
					) : (
						<p>Loading transaction details...</p>
					)}
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<h2>Are you sure you want to delete this transaction?</h2>
					<div className="flex justify-center gap-2">
						<Button
							className="w-full"
							variant="destructive"
							onClick={handleConfirmDelete}
						>
							Confirm Delete
						</Button>
						<Button
							className="w-full"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancel
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
