import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { FinancialData } from "./types";

type IncomeExpenseChartProps = {
	data: FinancialData[];
};

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="period" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="income" fill="#8884d8" name="Income" />
				<Bar dataKey="expense" fill="#82ca9d" name="Expense" />
			</BarChart>
		</ResponsiveContainer>
	);
}
