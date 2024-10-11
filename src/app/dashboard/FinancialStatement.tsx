import { DashboardData } from "../../types/dashboardData.type";

type FinancialStatementProps = {
	data: DashboardData[];
};

export default function FinancialStatement({ data }: FinancialStatementProps) {
	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Period
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Income
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Expense
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Profit/Loss
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((item, index) => (
						<tr key={index}>
							<td className="px-6 py-4 whitespace-nowrap">{item.period}</td>
							<td className="px-6 py-4 whitespace-nowrap">
								${item.income.toLocaleString()}
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								${item.expense.toLocaleString()}
							</td>
							<td
								className={`px-6 py-4 whitespace-nowrap ${
									item.profit >= 0 ? "text-green-600" : "text-red-600"
								}`}
							>
								${Math.abs(item.profit).toLocaleString()}{" "}
								{item.profit >= 0 ? "Profit" : "Loss"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
