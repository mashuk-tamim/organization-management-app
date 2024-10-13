import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, PlusCircle, PieChart } from "lucide-react";
import React from "react";

export default function FeaturesSection() {
	return (
		<section className="w-screen flex justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
			<div className="container px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
					Key Features
				</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						title="Dashboard Overview"
						description="Get a comprehensive view of your finances with our intuitive dashboard."
						icon={<BarChart3 className="h-12 w-12 mb-4 text-primary" />}
					/>
					<FeatureCard
						title="Easy Transaction Entry"
						description="Quickly add transactions with details like amount, category, type, and department."
						icon={<PlusCircle className="h-12 w-12 mb-4 text-primary" />}
					/>
					<FeatureCard
						title="Detailed Reports"
						description="Generate detailed reports to analyze your spending patterns and financial health."
						icon={<PieChart className="h-12 w-12 mb-4 text-primary" />}
					/>
				</div>
			</div>
		</section>
	);
}
type FeatureCardProps = {
	title: string;
	description: string;
	icon: React.ReactNode;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
	return (
		<Card className="bg-card text-card-foreground">
			<CardHeader>
				<CardTitle className="text-primary">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				{icon}
				<p>{description}</p>
			</CardContent>
		</Card>
	);
}