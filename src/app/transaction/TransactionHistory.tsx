import { ComponentType, useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { columns } from "./data-table/columns";
import { DataTablePagination } from "./data-table/data-table-pagination";
import { ITransaction } from "@/types/transaction.interface";
import RowLimit from "./data-table/row-limit";
import SortColumn from "./data-table/sort-column";
import TableSkeleton from "./data-table/table-skeleton";
import FilterColumn from "./data-table/filter-column";
import { DataTableProps } from "./data-table/data-table";
const AddTransactionDialog = dynamic(() => import("./AddTransactionDialog"));

// Type the dynamic import
const DataTable = dynamic(
	() => import("./data-table/data-table")
) as ComponentType<DataTableProps<ITransaction, unknown>>;

export default function TransactionHistory() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [transactions, setTransactions] = useState< ITransaction[]>([]);
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

			const data: DataType = await res.json();
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
				<div className="text-red-500">{error}</div>
			) : (
				<div className="space-y-2">
					<div className="flex flex-wrap justify-between gap-4">
						<FilterColumn
							typeFilter={typeFilter}
							categoryFilter={categoryFilter}
							departmentFilter={departmentFilter}
							setTypeFilter={setTypeFilter}
							setCategoryFilter={setCategoryFilter}
							setDepartmentFilter={setDepartmentFilter}
							updateURL={updateURL}
						/>
						<div className="flex flex-wrap gap-4">
							<SortColumn
								sortField={sortField}
								setSortField={setSortField}
								sortOrder={sortOrder}
								setSortOrder={setSortOrder}
								updateURL={updateURL}
							/>
							{/* Limit selector */}
							<RowLimit
								limit={limit}
								setLimit={setLimit}
								updateURL={updateURL}
							/>
						</div>
					</div>
					{isLoading ? (
						<TableSkeleton rows={limit} columns={columns.length} />
					) : error ? (
						<div className="text-red-500">{error}</div>
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
						<div className="text-red-500">No transactions found.</div>
					)}
				</div>
			)}
		</div>
	);
}

type DataType = {
	data: ITransaction[];
	currentPage: number;
	totalPages: number;
};


