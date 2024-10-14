// app/transaction/TransactionPage.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import TransactionHistory from "./TransactionHistory";
import TransactionSummary from "./TransactionSummary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ITransaction } from "@/types/transaction.interface";
import { useTransactionContext } from "@/provider/TransactionContext";

export type initialDataType = {
	data: ITransaction[];
	currentPage: number;
	totalPages: number;
};

export default function TransactionPage() {
	const [initialData, setInitialData] = useState<initialDataType | null>(null);
	const [loading, setLoading] = useState(true);
	const { transactions } = useTransactionContext();

	useEffect(() => {
		const fetchData = async () => {
			const page = 1; // Change this if you want to support different pages
			const limit = 10;

			const res = await fetch(`/api/transactions?page=${page}&limit=${limit}`);
			const data = await res.json();
			setInitialData(data);
			setLoading(false);
		};

		fetchData();
	}, [transactions]);

	console.log(initialData);

	if (loading) {
		return <LoadingSpinner className="" />;
	}

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Transaction Management</h1>

			{initialData && (
				<>
					<Suspense fallback={<LoadingSpinner className="" />}>
						<TransactionHistory initialData={initialData} />
					</Suspense>
					<Suspense fallback={<LoadingSpinner className="" />}>
						<TransactionSummary
							transactions={transactions}
							loading={false}
						/>
					</Suspense>
				</>
			)}
		</div>
	);
}
