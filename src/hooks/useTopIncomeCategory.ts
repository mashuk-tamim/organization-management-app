
import { ITransaction } from "@/types/transaction.interface";
import { useMemo } from "react";

const useTopIncomeCategory = (transactions: ITransaction[]) => {
  const topIncomeCategory = useMemo(() => {
		// returns an `Array` of transaction.type === "Income"
		const incomes = transactions.filter(
			(transaction) => transaction.type === "Income"
		);

		const categoryTotals: { [key: string]: number } = {};

		// Sum the amounts for each category
		incomes.forEach((income) => {
			if (categoryTotals[income.category]) {
				categoryTotals[income.category] += income.amount;
			} else {
				categoryTotals[income.category] = income.amount;
			}
		});

		// Find the category with the highest total
		let topCategory = null;
		let maxAmount = 0;

    for (const category in categoryTotals) {
			if (categoryTotals[category] > maxAmount) {
				maxAmount = categoryTotals[category];
				topCategory = category;
			}
		}

		return topCategory;
	}, [transactions]);

	return topIncomeCategory;
};

export default useTopIncomeCategory;
