import { Button } from "@/components/ui/button";
import { TimeFrame } from "../../types/dashboardData.type";

type TimeFrameSelectorProps = {
	timeFrame: TimeFrame;
	setTimeFrame: (timeFrame: TimeFrame) => void;
};

export default function TimeFrameSelector({
	timeFrame,
	setTimeFrame,
}: TimeFrameSelectorProps) {
	return (
		<div className="mb-4 flex justify-end space-x-2">
			<Button
				variant={timeFrame === "weekly" ? "default" : "outline"}
				onClick={() => setTimeFrame("weekly")}
			>
				Weekly
			</Button>
			<Button
				variant={timeFrame === "monthly" ? "default" : "outline"}
				onClick={() => setTimeFrame("monthly")}
			>
				Monthly
			</Button>
			<Button
				variant={timeFrame === "yearly" ? "default" : "outline"}
				onClick={() => setTimeFrame("yearly")}
			>
				Yearly
			</Button>
		</div>
	);
}
