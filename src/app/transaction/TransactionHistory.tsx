import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AddTransactionDialog from "./AddTransactionDialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { TransactionHistoryProps } from "@/types/transactionHistory.type";
import { Card } from "@/components/ui/card";

export default function TransactionHistory({
	transactions,
	loading,
	errorMessage,
}: TransactionHistoryProps) {
	if (!errorMessage) {
		<p className="text-sm text-red-500">{errorMessage}</p>;
	}

	return (
		<div className="mb-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Transaction History</h2>
				<AddTransactionDialog />
			</div>
			<Card className="p-2">
				<Table>
					<TableHeader>
						<TableRow className="font-semibold md:text-lg">
							<TableHead>Date</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Department</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{transactions.map((transaction) => (
							<TableRow key={transaction._id}>
								<TableCell>{transaction.date}</TableCell>
								<TableCell>{transaction.type}</TableCell>
								<TableCell>{transaction.category}</TableCell>
								<TableCell>${transaction.amount.toLocaleString()}</TableCell>
								<TableCell>{transaction.department}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>
			{loading && (
				<div className="w-full flex justify-center items-center">
					<LoadingSpinner className=" my-2" />
				</div>
			)}
		</div>
	);
}
