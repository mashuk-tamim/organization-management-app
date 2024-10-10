import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Transaction } from "./types";
import AddTransactionDialog from "./AddTransactionDialog";

type TransactionHistoryProps = {
	transactions: Transaction[];
	onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
};

export default function TransactionHistory({
	transactions,
	// onAddTransaction,
}: TransactionHistoryProps) {
	return (
		<div className="mb-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Transaction History</h2>
        {/* <AddTransactionDialog onAddTransaction={onAddTransaction} /> */}
        <AddTransactionDialog/>
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
						<TableRow key={transaction.id}>
							<TableCell>{transaction.date}</TableCell>
							<TableCell>{transaction.type}</TableCell>
							<TableCell>{transaction.category}</TableCell>
							<TableCell>${transaction.amount.toLocaleString()}</TableCell>
							<TableCell>{transaction.department}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
