export type TimeFrame = "weekly" | "monthly" | "yearly";

export type DashboardData = {
	period: string;
	income: number;
	expense: number;
	profit: number;
};
