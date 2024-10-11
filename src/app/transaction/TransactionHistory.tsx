import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import AddTransactionDialog from "./AddTransactionDialog";
import { useEffect, useState } from "react";
import { getAllTransactions } from "@/actions/register.action";
import { ITransaction } from "@/backend/modules/transaction/transaction.interface";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function TransactionHistory() {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		async function fetchAllTransactions() {
			setLoading(true);
			const response = await getAllTransactions();
			console.log(response);
			if (response?.success && response.data) {
				setTransactions(response.data);
			} else {
				setErrorMessage(response.error || "Failed to fetch transactions");
			}
			setLoading(false);
		}
		fetchAllTransactions();
	}, []);

	if (errorMessage !== "") {
		toast.error(errorMessage);
	}

	console.log(transactions);
	return (
		<div className="mb-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Transaction History</h2>
				<AddTransactionDialog />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
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
			{loading && (
				<div className="w-full flex justify-center items-center">
					<LoadingSpinner className=" my-2" />
				</div>
			)}
		</div>
	);
}
