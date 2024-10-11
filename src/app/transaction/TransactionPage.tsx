"use client";
import { Suspense, useEffect, useState } from "react";
import TransactionHistory from "./TransactionHistory";
import TransactionSummary from "./TransactionSummary";
import { getAllTransactions } from "@/actions/transaction.action";
import { ITransaction } from "@/backend/modules/transaction/transaction.interface";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function TransactionPage() {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		async function fetchAllTransactions() {
			setLoading(true);
			const response = await getAllTransactions();
			if (response?.success && response.data) {
				setTransactions(response.data);
			} else {
				setErrorMessage(response.error || "Failed to fetch transactions");
			}
			setLoading(false);
		}
		fetchAllTransactions();
  }, []);

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Transaction Management</h1>
			<Suspense fallback={<LoadingSpinner className="" />}>
				<TransactionHistory
					transactions={transactions}
					loading={loading}
					errorMessage={errorMessage}
				/>
			</Suspense>

			<Suspense fallback={<LoadingSpinner className="" />}>
        <TransactionSummary transactions={transactions} loading={loading} />
			</Suspense>
		</div>
	);
}
