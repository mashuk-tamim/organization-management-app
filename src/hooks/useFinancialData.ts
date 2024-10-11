import { useMemo } from "react";
import { ITransaction } from "@/backend/modules/transaction/transaction.interface";
import { startOfWeek, startOfMonth, startOfYear, parseISO, format } from "date-fns";

const useFinancialData = (transactions: ITransaction[]) => {
	const weeklyData = useMemo(() => groupByWeek(transactions), [transactions]);
	const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);
	const yearlyData = useMemo(() => groupByYear(transactions), [transactions]);

	return { weeklyData, monthlyData, yearlyData };
};

export default useFinancialData;


// Group by Week
const groupByWeek = (transactions: ITransaction[]) => {
	const weeklyData: { [key: string]: { income: number; expense: number } } = {};

	transactions.forEach((transaction) => {
		const weekStart = startOfWeek(parseISO(transaction.date)).toISOString();
		if (!weeklyData[weekStart]) {
			weeklyData[weekStart] = { income: 0, expense: 0 };
		}
		if (transaction.type === "Income") {
			weeklyData[weekStart].income += transaction.amount;
		} else {
			weeklyData[weekStart].expense += transaction.amount;
		}
	});

	return Object.entries(weeklyData).map(([week, totals], index) => ({
		period: `Week ${index + 1}`,
		income: totals.income,
		expense: totals.expense,
		profit: totals.income - totals.expense,
	}));
};

// Group by Month
const groupByMonth = (transactions: ITransaction[]) => {
  const monthlyData: { [key: string]: { income: number, expense: number } } = {};

  transactions.forEach((transaction) => {
		const monthStart = format(parseISO(transaction.date), "MMM"); // Format as "Jan", "Feb", etc.
		if (!monthlyData[monthStart]) {
			monthlyData[monthStart] = { income: 0, expense: 0 };
		}
		if (transaction.type === "Income") {
			monthlyData[monthStart].income += transaction.amount;
		} else {
			monthlyData[monthStart].expense += transaction.amount;
		}
	})

  return Object.entries(monthlyData)
		.slice(-6)
		.map(([month, totals]) => ({
			period: month,
			income: totals.income,
			expense: totals.expense,
			profit: totals.income - totals.expense,
		}));
}

// Group by Year
const groupByYear = (transactions: ITransaction[]) => {
  const yearlyData: { [key: string]: { income: number; expense: number } } = {};

  transactions.forEach((transaction) => {
		const yearStart = format(parseISO(transaction.date), "yyyy"); // Format as "YYYY"
		if (!yearlyData[yearStart]) {
			yearlyData[yearStart] = { income: 0, expense: 0 };
		}
		if (transaction.type === "Income") {
			yearlyData[yearStart].income += transaction.amount;
		} else {
			yearlyData[yearStart].expense += transaction.amount;
		}
	});

  return Object.entries(yearlyData).map(([year, totals]) => ({
		period: year,
		income: totals.income,
		expense: totals.expense,
		profit: totals.income - totals.expense,
	}));
};