import { Button } from "@/components/ui/button";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface DataTablePaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (newPage: number) => void;
}

export function DataTablePagination({
	currentPage,
	totalPages,
	onPageChange,
}: DataTablePaginationProps) {
	return (
		<div className="flex w-full flex-col items-center justify-end gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
			<div className="flex items-center space-x-2">
				<Button
					size="icon"
					variant="outline"
					aria-label="Go to first page"
					disabled={currentPage === 1}
					onClick={() => onPageChange(1)}
				>
					<DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
				</Button>
				<Button
					size="icon"
					variant="outline"
					aria-label="Go to previous page"
					disabled={currentPage === 1}
					onClick={() => onPageChange(currentPage - 1)}
				>
					<ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
				</Button>
			</div>

			<div className="flex items-center justify-center text-sm font-medium">
				Page {currentPage} of {totalPages}
			</div>

			<div className="flex items-center space-x-2">
				<Button
					size="icon"
					variant="outline"
					aria-label="Go to next page"
					disabled={currentPage === totalPages}
					onClick={() => onPageChange(currentPage + 1)}
				>
					<ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
				</Button>
				<Button
					size="icon"
					variant="outline"
					aria-label="Go to last page"
					disabled={currentPage === totalPages}
					onClick={() => onPageChange(totalPages)}
				>
					<DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
				</Button>
			</div>
		</div>
	);
}