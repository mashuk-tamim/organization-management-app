import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface RowLimitProps {
	limit: number;
	handleLimitChange: (newLimit: number) => void;
}

export default function RowLimit({ limit, handleLimitChange }: RowLimitProps) {
	const rowLimitOptions = [10, 20, 30, 40, 50];
	return (
		<div className="flex items-center space-x-2">
			<p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
			<Select
				value={`${limit}`}
				onValueChange={(value) => {
					handleLimitChange(Number(value));
				}}
			>
				<SelectTrigger className="h-8 w-[70px]">
					<SelectValue placeholder={limit} />
				</SelectTrigger>
				<SelectContent side="top">
					{rowLimitOptions.map((rowLimit) => (
						<SelectItem key={rowLimit} value={`${rowLimit}`}>
							{rowLimit}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
