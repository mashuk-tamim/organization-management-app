
import { ITransaction } from "@/types/transaction.interface";
import { useMemo } from "react";

const useTopExpenseCategory = (transactions: ITransaction[]) => {
	const topExpenseCategory = useMemo(() => {
		const expenses = transactions.filter(
			(transaction) => transaction.type === "Expense"
		);

		const categoryTotals: { [key: string]: number } = {};

		expenses.forEach((expense) => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      } else {
        categoryTotals[expense.category] = expense.amount;
			}
    });
    
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

	return topExpenseCategory;
};

export default useTopExpenseCategory;
