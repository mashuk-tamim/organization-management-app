import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { FinancialData } from "../../types/dashboardData.type";

type ProfitLossChartProps = {
	data: FinancialData[];
};

export default function ProfitLossChart({ data }: ProfitLossChartProps) {
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart data={data}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="period" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line
					type="monotone"
					dataKey="profit"
					stroke="#82ca9d"
					name="Profit/Loss"
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
