import { ITransaction } from "./transaction.interface";

export type TransactionHistoryProps = {
	transactions: ITransaction[];
	loading: boolean;
	errorMessage: string;
};
