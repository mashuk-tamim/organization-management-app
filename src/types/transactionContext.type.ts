import { ITransaction } from "./transaction.interface";

export type TransactionContextType = {
	transactions: ITransaction[];
	setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
	fetchTransactions: () => Promise<void>;
	updateTransactions: (updatedTransaction: ITransaction) => void;
	loading: boolean;
	errorMessage: string;
};
