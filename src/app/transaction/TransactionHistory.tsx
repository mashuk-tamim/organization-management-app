import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AddTransactionDialog from "./AddTransactionDialog";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataTablePagination } from "./data-table-pagination";
import { ITransaction } from "@/types/transaction.interface";
import { initialDataType } from "./TransactionPage";

export default function TransactionHistory({
	initialData,
}: {
	initialData: initialDataType;
}) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [transactions, setTransactions] = useState<ITransaction[]>(
		initialData.data || []
	);
	const [pageCount, setPageCount] = useState(initialData.totalPages || 1);

	console.log(initialData);

	const currentPage = Number(searchParams.get("page") || "1");

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const res = await fetch(
					`/api/transactions?page=${currentPage}&limit=10`
				);
				if (!res.ok) throw new Error("Failed to fetch transactions");
				const data = await res.json();
				setTransactions(data.data);
				setPageCount(data.totalPages);
			} catch (error) {
				console.error("Error fetching transactions:", error);
				// Handle error (e.g., show error message to user)
			}
		};

		fetchTransactions();
	}, [currentPage]);

	const handlePageChange = (newPage: number) => {
		router.push(`/transaction?page=${newPage}&limit=10`);
	};

	return (
		<div className="mb-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Transaction History</h2>
				<AddTransactionDialog />
			</div>
			<DataTable columns={columns} data={transactions} />

			<DataTablePagination
				currentPage={currentPage}
				totalPages={pageCount}
				onPageChange={handlePageChange}
			/>
		</div>
	);
}
