import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddTransactionDialog from "./AddTransactionDialog";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataTablePagination } from "./data-table-pagination";
import { ITransaction } from "@/types/transaction.interface";
import RowLimit from "./row-limit";
import SortColumn from "./sort-column";
import TableSkeleton from "./table-skeleton";
import FilterColumn from "./filter-column";

export default function TransactionHistory() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [transactions, setTransactions] = useState<ITransaction[]>([]);
	const [totalPages, setTotalPages] = useState(1);
	const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
	const [sortField, setSortField] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
		"default"
	);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page") || "1")
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get("limit") || "10")
  );
  

	const fetchTransactions = useCallback(async () => {
		setIsLoading(true);
		try {
			let apiUrl = `/api/transaction?page=${currentPage}&limit=${limit}`;
			if (sortField && sortOrder && sortOrder !== "default") {
				apiUrl += `&sortField=${sortField}&sortOrder=${sortOrder}`;
			}

			if (typeFilter) apiUrl += `&type=${typeFilter}`;
			if (categoryFilter) apiUrl += `&category=${categoryFilter}`;
			if (departmentFilter) apiUrl += `&department=${departmentFilter}`;

			const res = await fetch(apiUrl);
			if (!res.ok) throw new Error("Failed to fetch transactions");

			const data = await res.json();
			setTransactions(data.data);
			setTotalPages(data.totalPages);
		} catch (error) {
			setError("Error fetching transactions");
			console.error("Error fetching transactions:", error);
		} finally {
			setIsLoading(false);
		}
	}, [
		currentPage,
		limit,
		sortField,
    sortOrder,
		typeFilter,
		categoryFilter,
		departmentFilter,
	]);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	const updateURL = useCallback(
		(newParams: Record<string, string>) => {
			const current = new URLSearchParams(Array.from(searchParams.entries()));
			Object.entries(newParams).forEach(([key, value]) => {
				if (value === "") {
					current.delete(key);
				} else {
					current.set(key, value);
				}
			});
			router.replace(`?${current.toString()}`);
		},
		[router, searchParams]
	);

	return (
		<div className="mb-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Transaction History</h2>
				<AddTransactionDialog />
			</div>

			{error ? (
				<div>{error}</div>
			) : (
				<div className="space-y-2">
					<div className="flex justify-between gap-4">
						<FilterColumn
							typeFilter={typeFilter}
							categoryFilter={categoryFilter}
							departmentFilter={departmentFilter}
							setTypeFilter={setTypeFilter}
							setCategoryFilter={setCategoryFilter}
							setDepartmentFilter={setDepartmentFilter}
							updateURL={updateURL}
						/>
						<div className="flex gap-4">
							<SortColumn
								sortField={sortField}
								setSortField={setSortField}
								sortOrder={sortOrder}
								setSortOrder={setSortOrder}
								updateURL={updateURL}
							/>
							{/* Limit selector */}
                <RowLimit limit={limit} setLimit={setLimit} updateURL={updateURL} />
						</div>
					</div>
					{isLoading ? (
						<TableSkeleton rows={limit} columns={columns.length} />
					) : error ? (
						<div>{error}</div>
					) : transactions.length > 0 ? (
						<>
							<DataTable columns={columns} data={transactions} />
							<DataTablePagination
								totalPages={totalPages}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								updateURL={updateURL}
							/>
						</>
					) : (
						<div>No transactions found.</div>
					)}
				</div>
			)}
		</div>
	);
}

export type initialDataType = {
	data: ITransaction[];
	currentPage: number;
	totalPages: number;
};
