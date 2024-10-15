import React from "react";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
	return (
		<div className="w-full animate-pulse">
			<div className="bg-gray-700 h-8 w-full mb-4 rounded"></div>
			{[...Array(rows)].map((_, rowIndex) => (
				<div key={rowIndex} className="flex mb-4 space-x-4">
					{[...Array(columns)].map((_, colIndex) => (
						<div
							key={colIndex}
							className="bg-gray-700 h-6 rounded"
							style={{ width: `${100 / columns}%` }}
						></div>
					))}
				</div>
			))}
		</div>
	);
};

export default TableSkeleton;
