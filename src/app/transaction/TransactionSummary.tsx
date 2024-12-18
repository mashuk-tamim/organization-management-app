import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import useTopExpenseCategory from "@/hooks/useTopExpenseCategory";
import useTopIncomeCategory from "@/hooks/useTopIncomeCategory";
import { useTransactionContext } from "@/provider/TransactionContext";

export default function TransactionSummary({

}) {
  const { transactions, loading } = useTransactionContext();
	const totalIncome = transactions
		.filter((transaction) => transaction.type === "Income")
		.reduce((sum, transaction) => sum + transaction.amount, 0);

	const totalExpenses = transactions
		.filter((transaction) => transaction.type === "Expense")
		.reduce((sum, transaction) => sum + transaction.amount, 0);

	const topIncomeCategory = useTopIncomeCategory(transactions);
	const topExpenseCategory = useTopExpenseCategory(transactions);

	return (
		<div className="grid gap-6 md:grid-cols-2">
			<Card className="p-2 md:p-5">
				<div>
					<h2 className="text-xl font-semibold mb-4">Income Summary</h2>
					{loading ? (
						<div className="">
							<LoadingSpinner className=" my-2" />
						</div>
					) : (
						<div className="space-y-4">
							<div>
								<Label>Total Income</Label>
								<div className="text-2xl font-bold">
									<p>${totalIncome.toLocaleString()}</p>
								</div>
							</div>
							<div>
								<Label>Top Income Category</Label>
								<div className="text-xl font-semibold">{topIncomeCategory}</div>
							</div>
						</div>
					)}
				</div>
			</Card>
			<Card className="p-2 md:p-5">
				<div>
					<h2 className="text-xl font-semibold mb-4">Expense Summary</h2>
					{loading ? (
						<div className="">
							<LoadingSpinner className=" my-2" />
						</div>
					) : (
						<div className="space-y-4">
							<div>
								<Label>Total Expenses</Label>
								<div className="text-2xl font-bold">
									<p>${totalExpenses.toLocaleString()}</p>
								</div>
							</div>
							<div>
								<Label>Top Expense Category</Label>
								<div className="text-xl font-semibold">
									{topExpenseCategory}
								</div>
							</div>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
}
