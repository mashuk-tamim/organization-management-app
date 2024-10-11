import { ITransaction } from "./transaction.interface";

export type TransactionSummaryProps = {
	transactions: ITransaction[];
	loading: boolean;
};