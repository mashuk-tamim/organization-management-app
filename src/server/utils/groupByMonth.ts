import {  parseISO, format, startOfMonth, subMonths } from "date-fns";
import { ITransaction } from "@/types/transaction.interface";

// Group by month
const groupByMonth = (transactions: ITransaction[]) => {
	// Create an array of the last 6 months in reverse chronological order
	const last6Months = Array.from({ length: 6 }, (_, i) =>
		startOfMonth(subMonths(new Date(), i))
	).reverse();

	// Initialize the monthlyData object with all 6 months
	const monthlyData = last6Months.reduce((acc, month) => {
		const monthKey = month.toISOString();
		acc[monthKey] = { income: 0, expense: 0 };
		return acc;
	}, {} as { [key: string]: { income: number; expense: number } });

	// Process transactions
	transactions.forEach((transaction) => {
		const monthStart = startOfMonth(parseISO(transaction.date)).toISOString();
		if (monthlyData[monthStart]) {
			if (transaction.type === "Income") {
				monthlyData[monthStart].income += transaction.amount;
			} else {
				monthlyData[monthStart].expense += transaction.amount;
			}
		}
	});

	// Convert to array and map to final format
	return Object.entries(monthlyData).map(([month, totals]) => ({
		period: format(new Date(month), "MMM"),
		income: totals.income,
		expense: totals.expense,
		profit: totals.income - totals.expense,
	}));
};

export default groupByMonth;
