export type TimeFrame = "weekly" | "monthly" | "yearly";

export type FinancialData = {
	period: string;
	income: number;
	expense: number;
	profit: number;
};
