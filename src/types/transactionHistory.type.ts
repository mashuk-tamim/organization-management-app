import { ITransaction } from "./transaction.interface";

export type TransactionHistoryProps = {
	transactions: ITransaction[];
	loading: boolean;
	errorMessage: string;
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
};
