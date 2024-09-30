"use client"
import TransactionHistory from "./TransactionHistory";
import TransactionSummary from "./TransactionSummary";
import { useTransactions } from "./hooks/useTransactions";

export default function TransactionPage() {
	const { transactions, addTransaction } = useTransactions();

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Transaction Management</h1>

			<TransactionHistory
				transactions={transactions}
				onAddTransaction={addTransaction}
			/>

			<TransactionSummary transactions={transactions} />
		</div>
	);
}
