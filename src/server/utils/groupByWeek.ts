import { ITransaction } from "@/types/transaction.interface";
import { format, parseISO, startOfWeek, subWeeks } from "date-fns";

const groupByWeek = (transactions: ITransaction[]) => {
	// Create an array of the last 4 weeks in reverse chronological order
	const last4Weeks = Array.from({ length: 4 }, (_, i) =>
		startOfWeek(subWeeks(new Date(), i))
	).reverse();

	// Initialize the weeklyData object with all 4 weeks
	const weeklyData = last4Weeks.reduce((acc, week) => {
		const weekKey = week.toISOString();
		acc[weekKey] = { income: 0, expense: 0 };
		return acc;
	}, {} as { [key: string]: { income: number; expense: number } });

	// Process transactions
	transactions.forEach((transaction) => {
		const weekStart = startOfWeek(parseISO(transaction.date)).toISOString();
		if (weeklyData[weekStart]) {
			if (transaction.type === "Income") {
				weeklyData[weekStart].income += transaction.amount;
			} else {
				weeklyData[weekStart].expense += transaction.amount;
			}
		}
	});

	// Convert to array and map to final format
	return Object.entries(weeklyData).map(([weekKey, totals]) => ({
		period: format(new Date(weekKey), "MMM d"),
		income: totals.income,
		expense: totals.expense,
		profit: totals.income - totals.expense,
	}));
};

export default groupByWeek;