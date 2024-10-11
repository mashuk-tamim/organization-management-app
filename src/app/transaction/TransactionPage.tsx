"use client";
import { Suspense } from "react";
import TransactionHistory from "./TransactionHistory";
import TransactionSummary from "./TransactionSummary";

export default function TransactionPage() {

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Transaction Management</h1>
			<Suspense fallback={<p>Loading transactions...</p>}>
				<TransactionHistory />
			</Suspense>

			<TransactionSummary />
		</div>
	);
}
