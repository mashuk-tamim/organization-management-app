"use client"

import { getAllTransactions } from "@/server/actions/transaction.action";
import { ITransaction } from "@/types/transaction.interface";
import { TransactionContextType } from "@/types/transactionContext.type";
import React, { createContext, useState, useEffect, useContext } from "react";

const TransactionContext = createContext<TransactionContextType | undefined>(
	undefined
);

export const useTransactionContext = () => {
	const context = useContext(TransactionContext);
	if (!context) {
		throw new Error(
			"useTransactionContext must be used within a TransactionProvider"
		);
	}
	return context;
};

export const TransactionProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState("");

	const fetchTransactions = async () => {
		try {
			setLoading(true);
			const result = await getAllTransactions();
			if (result.success && result.data) {
				setTransactions(result.data);
			} else {
				setErrorMessage(result.error || "Failed to fetch transactions");
			}
			setLoading(false);
		} catch (error) {
			console.error("Error fetching transactions:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

	// Function to update transactions (only update changed ones)
	const updateTransactions = (newTransaction: ITransaction) => {
		setTransactions((prevTransactions) => {
			const updatedTransactions = prevTransactions.map((transaction) =>
				transaction._id === newTransaction._id ? newTransaction : transaction
			);
			return updatedTransactions;
		});
	};

	return (
		<TransactionContext.Provider
			value={{
				transactions,
				setTransactions,
        fetchTransactions,
        updateTransactions,
				loading,
				errorMessage,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
