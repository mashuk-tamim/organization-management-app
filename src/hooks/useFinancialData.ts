import { useMemo } from "react";
import { ITransaction } from "@/types/transaction.interface";
import groupByWeek from "@/server/utils/groupByWeek";
import groupByMonth from "@/server/utils/groupByMonth";
import groupByYear from "@/server/utils/groupByYear";

const useFinancialData = (transactions: ITransaction[]) => {
	const weeklyData = useMemo(() => groupByWeek(transactions), [transactions]);
	const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);
	const yearlyData = useMemo(() => groupByYear(transactions), [transactions]);

	return { weeklyData, monthlyData, yearlyData };
};

export default useFinancialData;