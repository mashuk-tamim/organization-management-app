import { DashboardData } from "../types/dashboardData.type";

export const weeklyData: DashboardData[] = [
	{ period: "Week 1", income: 10000, expense: 8000, profit: 2000 },
	{ period: "Week 2", income: 12000, expense: 9000, profit: 3000 },
	{ period: "Week 3", income: 9000, expense: 9500, profit: -500 },
	{ period: "Week 4", income: 15000, expense: 10000, profit: 5000 },
];

export const monthlyData: DashboardData[] = [
	{ period: "Jan", income: 40000, expense: 35000, profit: 5000 },
	{ period: "Feb", income: 45000, expense: 38000, profit: 7000 },
	{ period: "Mar", income: 38000, expense: 40000, profit: -2000 },
	{ period: "Apr", income: 50000, expense: 42000, profit: 8000 },
	{ period: "May", income: 55000, expense: 45000, profit: 10000 },
	{ period: "Jun", income: 48000, expense: 47000, profit: 1000 },
];

export const yearlyData: DashboardData[] = [
	{ period: "2018", income: 500000, expense: 450000, profit: 50000 },
	{ period: "2019", income: 550000, expense: 500000, profit: 50000 },
	{ period: "2020", income: 480000, expense: 510000, profit: -30000 },
	{ period: "2021", income: 600000, expense: 520000, profit: 80000 },
	{ period: "2022", income: 650000, expense: 580000, profit: 70000 },
];
