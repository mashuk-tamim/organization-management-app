// app/transaction/TransactionPage.tsx
"use client";

import { Suspense } from "react";
import TransactionHistory from "./TransactionHistory";
import TransactionSummary from "./TransactionSummary";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function TransactionPage() {


	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Transaction Management</h1>
				<>
					<Suspense
						fallback={
							<div className="animate-pulse bg-text-green-primary/30 rounded-lg w-[800px] h-[600px]" />
						}
					>
						<TransactionHistory />
					</Suspense>
					<Suspense fallback={<LoadingSpinner className="" />}>
						<TransactionSummary/>
					</Suspense>
				</>

		</div>
	);
}
