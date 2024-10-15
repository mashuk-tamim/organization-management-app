import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SortColumnProps {
	sortField: string | null;
	sortOrder: "default" | "asc" | "desc";
	handleSortChange: (field: string | null, order: "default" | "asc" | "desc") => void;
}

export default function SortColumn({
	sortField,
	sortOrder,
	handleSortChange,
}: SortColumnProps) {
		const sortOptions = [
			{ label: "Default", value: "default" },
			{ label: "Amount (Low to High)", value: "amount_asc" },
			{ label: "Amount (High to Low)", value: "amount_desc" },
			{ label: "Date (Oldest First)", value: "date_asc" },
			{ label: "Date (Newest First)", value: "date_desc" },
  ];
  
  const currentValue =
		sortField && sortOrder !== "default"
			? `${sortField}_${sortOrder}`
      : "default";
  
	return (
		<div className="flex items-center space-x-2">
			<p className="whitespace-nowrap text-sm font-medium">Sort</p>
			<Select
				value={currentValue}
				onValueChange={(newValue) => {
					if (newValue === "default") {
						handleSortChange(null, "default");
					} else {
						const [field, order] = newValue.split("_");
						handleSortChange(field, order as "asc" | "desc");
					}
				}}
			>
				<SelectTrigger className="h-8 w-[180px]">
					<SelectValue placeholder="Choose sort order" />
				</SelectTrigger>
				<SelectContent side="top">
					{sortOptions.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
