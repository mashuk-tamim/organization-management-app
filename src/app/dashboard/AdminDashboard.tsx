"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeFrameSelector from "./TimeFrameSelector";
import ProfitLossChart from "./ProfitLossChart";
import IncomeExpenseChart from "./IncomeExpenseChart";
import FinancialStatement from "./FinancialStatement";
import { monthlyData, weeklyData, yearlyData } from "./mockData";
import { FinancialData, TimeFrame } from "./types";

export default function AdminDashboard() {
	const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");

	const getData = (): FinancialData[] => {
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

	const data = getData();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Admin Financial Dashboard</h1>
			<TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
			<div className="flex flex-col gap-4 border-red-600">
				<div className="flex flex-col md:flex-row justify-between gap-4">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Total Profit/Loss</CardTitle>
						</CardHeader>
						<CardContent>
							<ProfitLossChart data={data} />
						</CardContent>
					</Card>
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Income vs Expense</CardTitle>
						</CardHeader>
						<CardContent>
							<IncomeExpenseChart data={data} />
						</CardContent>
					</Card>
				</div>
				<Card>
					<CardHeader>
						<CardTitle>Financial Statement</CardTitle>
					</CardHeader>
					<CardContent>
						<FinancialStatement data={data} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
