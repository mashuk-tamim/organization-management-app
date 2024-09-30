export type Transaction = {
	id: number;
	date: string;
	type: "Income" | "Expense";
	category: string;
	amount: number;
	department: string;
};
