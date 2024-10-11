import {
	startOfYear,
	parseISO,
	format,
  subYears,
} from "date-fns";
import { ITransaction } from "@/types/transaction.interface";

const groupByYear = (transactions: ITransaction[]) => {
	// Create an array of the last 5 years in reverse chronological order
	const last5Years = Array.from({ length: 5 }, (_, i) =>
		startOfYear(subYears(new Date(), i))
	).reverse();

	// Initialize the yearlyData object with all 5 years
	const yearlyData = last5Years.reduce((acc, year) => {
		const yearKey = year.toISOString();
		acc[yearKey] = { income: 0, expense: 0 };
		return acc;
	}, {} as { [key: string]: { income: number; expense: number } });

	// Process transactions
	transactions.forEach((transaction) => {
		const yearStart = startOfYear(parseISO(transaction.date)).toISOString();
		if (yearlyData[yearStart]) {
			if (transaction.type === "Income") {
				yearlyData[yearStart].income += transaction.amount;
			} else {
				yearlyData[yearStart].expense += transaction.amount;
			}
		}
	});

	// Convert to array and map to final format
	return Object.entries(yearlyData).map(([year, totals]) => ({
		period: format(new Date(year), "yyyy"),
		income: totals.income,
		expense: totals.expense,
		profit: totals.income - totals.expense,
	}));
};

export default groupByYear;
