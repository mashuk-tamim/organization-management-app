"use client";

// import { useState, useEffect } from "react";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogHeader,
// 	DialogTitle,
// } from "@/components/ui/dialog";
// import { getTransactionById } from "@/server/actions/transaction.action";
// import { ITransaction } from "@/types/transaction.interface";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";

// interface ViewTransactionDialogProps {
// 	transactionId: string;
// 	open: boolean;
// 	onOpenChange: (open: boolean) => void;
// }

// export default function ViewTransactionDialog({
// 	transactionId,
// 	open,
// 	onOpenChange,
// }: ViewTransactionDialogProps) {
// 	const [transaction, setTransaction] = useState<ITransaction | null>(null);
// 	const [loading, setLoading] = useState<boolean>(false);

// 	// Fetch transaction only when the dialog is opened
// 	useEffect(() => {
// 		if (open) {
// 			setLoading(true);
// 			const fetchTransaction = async () => {
// 				const result = await getTransactionById(transactionId);
// 				console.log("result:::::",result);
// 				setTransaction(result);
// 				setLoading(false);
// 			};
// 			fetchTransaction();
// 		}
// 	}, [open, transactionId]);

// 	// console.log(transaction);

// 	return (
// 		<Dialog open={open} onOpenChange={onOpenChange}>
// 			<DialogContent
// 				className="sm:max-w-[425px]"
// 				onClick={(e) => e.stopPropagation()}
// 			>
// 				<DialogHeader>
// 					{loading ? (
// 						<LoadingSpinner className="" />
// 					) : (
// 						<>
// 							<DialogTitle>Transaction ID: {transaction?._id}</DialogTitle>
// 							<DialogTitle>Amount: {transaction?.amount}</DialogTitle>
// 						</>
// 					)}
// 				</DialogHeader>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }

import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { getTransactionById } from "@/server/actions/transaction.action";
import { ITransaction } from "@/types/transaction.interface";

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
	const [transaction, setTransaction] = useState<ITransaction | null>(null);

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

	if (!open) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="sm:max-w-[425px]"
				onClick={(e) => e.stopPropagation()}
			>
				<DialogHeader>
					<DialogTitle>Transaction Details</DialogTitle>
				</DialogHeader>
				{transaction ? (
					<div className="flex flex-col">
						<p>
							<span className="text-accent-foreground">ID: </span>
							{transaction._id}
						</p>
						<p>
							<span className="text-accent-foreground">Date: </span>{" "}
							{new Date(transaction.date).toLocaleDateString("en-US", {
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
							<span className="text-accent-foreground">Type: </span>{" "}
							{transaction.type}
						</p>
						<p>
							<span className="text-accent-foreground">Category: </span>{" "}
							{transaction.category}
						</p>
						<p>
							<span className="text-accent-foreground">Department: </span>{" "}
							{transaction.department}
						</p>
						{/* Add more transaction details as needed */}
					</div>
				) : (
					<p>Loading transaction details...</p>
				)}
			</DialogContent>
		</Dialog>
	);
}
