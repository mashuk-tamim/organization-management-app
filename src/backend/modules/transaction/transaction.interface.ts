export interface ITransaction {
  _id?: string,
	date: string;
	type: "Income" | "Expense";
	category: "Project Completion" | "Service Sale" | "Salary" | "Utilities";
	amount: number;
	department: "Development" | "Design" | "Others";
}