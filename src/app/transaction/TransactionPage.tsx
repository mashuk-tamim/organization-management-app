"use client";
import { Suspense } from "react";
import TransactionHistory from "./TransactionHistory";
import TransactionSummary from "./TransactionSummary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTransactionContext } from "@/context/TransactionContext";

export default function TransactionPage() {
	const { transactions, loading, errorMessage } = useTransactionContext();


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
