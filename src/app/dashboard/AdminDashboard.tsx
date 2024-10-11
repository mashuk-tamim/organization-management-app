"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeFrameSelector from "./TimeFrameSelector";
import ProfitLossChart from "./ProfitLossChart";
import IncomeExpenseChart from "./IncomeExpenseChart";
import FinancialStatement from "./FinancialStatement";
import { DashboardData, TimeFrame } from "../../types/dashboardData.type";
import useFinancialData from "@/hooks/useFinancialData";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTransactionContext } from "@/provider/TransactionContext";

export default function AdminDashboard() {
	const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
	const { transactions, loading } = useTransactionContext();

	const { weeklyData, monthlyData, yearlyData } =
		useFinancialData(transactions);

	const getPeriodicData = (): DashboardData[] => {
		switch (timeFrame) {
			case "weekly":
				return weeklyData;
			case "monthly":
				return monthlyData;
			case "yearly":
				return yearlyData;
			default:
				return monthlyData;
		}
	};

	const periodicData = getPeriodicData();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Admin Financial Dashboard</h1>
			<TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
			{loading ? (
				<LoadingSpinner className="" />
			) : (
				<div className="flex flex-col gap-4 border-red-600">
					<div className="flex flex-col md:flex-row justify-between gap-4">
						<Card className="w-full">
							<CardHeader>
								<CardTitle>Total Profit/Loss</CardTitle>
							</CardHeader>
							<CardContent>
								<ProfitLossChart data={periodicData} />
							</CardContent>
						</Card>
						<Card className="w-full">
							<CardHeader>
								<CardTitle>Income vs Expense</CardTitle>
							</CardHeader>
							<CardContent>
								<IncomeExpenseChart data={periodicData} />
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Financial Statement</CardTitle>
						</CardHeader>
						<CardContent>
							<FinancialStatement data={periodicData} />
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
