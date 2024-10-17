import React, { useCallback, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FilterColumnProps = {
	typeFilter: string | null;
	categoryFilter: string | null;
	departmentFilter: string | null;
	setTypeFilter: (typeFilter: string | null) => void;
	setCategoryFilter: (categoryFilter: string | null) => void;
	setDepartmentFilter: (departmentFilter: string | null) => void;
	updateURL: (newParams: Record<string, string>) => void;
};

export default function FilterColumn({
	typeFilter,
	categoryFilter,
	departmentFilter,
	setTypeFilter,
	setCategoryFilter,
  setDepartmentFilter,
  updateURL,
}: FilterColumnProps) {
	const [transactionType, setTransactionType] = useState<
		"Income" | "Expense" | "all"
	>("all");
	const incomeCategories = ["Project Completion", "Service Sale"];
  const expenseCategories = ["Salary", "Utilities"];
  
  const handleFilterChange = useCallback(
		(filterType: string, value: string | null) => {
			switch (filterType) {
				case "type":
					setTypeFilter(value);
					break;
				case "category":
					setCategoryFilter(value);
					break;
				case "department":
					setDepartmentFilter(value);
					break;
			}
			updateURL({ page: "1", [filterType]: value || "" });
		},
		[updateURL, setTypeFilter, setCategoryFilter, setDepartmentFilter]
	);
	return (
		<div>
			{/* Filter controls */}
			<div className="flex gap-4">
				<Select
					value={typeFilter || "all"}
					onValueChange={(value) => {
						handleFilterChange("type", value === "all" ? null : value);
						setTransactionType(value as "Income" | "Expense");
					}}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by Type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Types</SelectItem>
						<SelectItem value="Income">Income</SelectItem>
						<SelectItem value="Expense">Expense</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={categoryFilter || "all"}
					onValueChange={(value) =>
						handleFilterChange("category", value === "all" ? null : value)
					}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by Categories" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{incomeCategories.map((category) => (
							<SelectItem
								key={category}
								disabled={
									transactionType === "Income" || transactionType === "all"
										? false
										: true
								}
								value={category}
							>
								{category}
							</SelectItem>
						))}
						{expenseCategories.map((category) => (
							<SelectItem
								key={category}
								disabled={
									transactionType === "Expense" || transactionType === "all"
										? false
										: true
								}
								value={category}
							>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={departmentFilter || "all"}
					onValueChange={(value) =>
						handleFilterChange("department", value === "all" ? null : value)
					}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Filter by Department" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Departments</SelectItem>
						<SelectItem value="Development">Development</SelectItem>
						<SelectItem value="Design">Design</SelectItem>
						<SelectItem value="Others">Others</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
