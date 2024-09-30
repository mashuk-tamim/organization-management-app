import { Label } from "@/components/ui/label";
import { Transaction } from "./types";

type TransactionSummaryProps = {
	transactions: Transaction[];
};

export default function TransactionSummary({
	transactions,
}: TransactionSummaryProps) {
	const totalIncome = transactions
		.filter((t) => t.type === "Income")
		.reduce((sum, t) => sum + t.amount, 0);

	const totalExpenses = transactions
		.filter((t) => t.type === "Expense")
		.reduce((sum, t) => sum + t.amount, 0);

	return (
		<div className="grid gap-6 md:grid-cols-2">
			<div>
				<h2 className="text-xl font-semibold mb-4">Income Summary</h2>
				<div className="space-y-4">
					<div>
						<Label>Total Income</Label>
						<div className="text-2xl font-bold">
							${totalIncome.toLocaleString()}
						</div>
					</div>
					<div>
						<Label>Top Income Category</Label>
						<div className="text-xl">Project Completion</div>
					</div>
				</div>
			</div>
			<div>
				<h2 className="text-xl font-semibold mb-4">Expense Summary</h2>
				<div className="space-y-4">
					<div>
						<Label>Total Expenses</Label>
						<div className="text-2xl font-bold">
							${totalExpenses.toLocaleString()}
						</div>
					</div>
					<div>
						<Label>Top Expense Category</Label>
						<div className="text-xl">Salary</div>
					</div>
				</div>
			</div>
		</div>
	);
}
