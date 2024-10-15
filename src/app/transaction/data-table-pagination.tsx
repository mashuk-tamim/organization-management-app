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
  setCurrentPage?: (newPage: number) => void;
}

export function DataTablePagination({
	currentPage,
  totalPages,
  onPageChange: handlePageChange,
  // setCurrentPage,
}: DataTablePaginationProps) {
  
	return (
		<div className="flex w-full flex-col items-center justify-end gap-4 overflow-auto px-2 sm:flex-row sm:gap-8">
			<div className="flex items-center space-x-2">
				<Button
					size="icon"
					variant="outline"
					aria-label="Go to first page"
					disabled={currentPage === 1}
					onClick={() => handlePageChange(1)}
				>
					<DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
				</Button>
				<Button
					size="icon"
					variant="outline"
					aria-label="Go to previous page"
					disabled={currentPage === 1}
					onClick={() => handlePageChange(currentPage - 1)}
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
					onClick={() => handlePageChange(currentPage + 1)}
				>
					<ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
				</Button>
				<Button
					size="icon"
					variant="outline"
					aria-label="Go to last page"
					disabled={currentPage === totalPages}
					onClick={() => handlePageChange(totalPages)}
				>
					<DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
				</Button>
			</div>
		</div>
	);
}