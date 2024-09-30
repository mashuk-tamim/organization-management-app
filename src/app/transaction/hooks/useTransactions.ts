"use client"

import { useState } from "react";
import { Transaction } from "../types";

export function useTransactions() {
	const [transactions, setTransactions] = useState<Transaction[]>([
		{
			id: 1,
			date: "2023-09-15",
			type: "Income",
			category: "Project Completion",
			amount: 5000,
			department: "Development",
		},
		{
			id: 2,
			date: "2023-09-14",
			type: "Expense",
			category: "Salary",
			amount: 3000,
			department: "Design",
		},
		{
			id: 3,
			date: "2023-09-13",
			type: "Income",
			category: "Service Sale",
			amount: 2000,
			department: "Development",
		},
	]);

	const addTransaction = (newTransaction: Omit<Transaction, "id">) => {
		setTransactions((prev) => [
			...prev,
			{ ...newTransaction, id: Math.max(...prev.map((t) => t.id), 0) + 1 },
		]);
	};

	return { transactions, addTransaction };
}
