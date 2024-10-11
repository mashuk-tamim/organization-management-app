"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TimeFrameSelector from "./TimeFrameSelector";
import ProfitLossChart from "./ProfitLossChart";
import IncomeExpenseChart from "./IncomeExpenseChart";
import FinancialStatement from "./FinancialStatement";
import { FinancialData, TimeFrame } from "./types";
import { ITransaction } from "@/backend/modules/transaction/transaction.interface";
import { getAllTransactions } from "@/actions/transaction.action";
import useFinancialData from "@/hooks/useFinancialData";

export default function AdminDashboard() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		async function fetchAllTransactions() {
			setLoading(true);
			const response = await getAllTransactions();
			if (response?.success && response.data) {
				setTransactions(response.data);
			} else {
				setErrorMessage(response.error || "Failed to fetch transactions");
			}
			setLoading(false);
		}
		fetchAllTransactions();
  }, []);
  
  const { weeklyData, monthlyData, yearlyData } =
    useFinancialData(transactions);

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
  
  console.log(data);

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
