import { Button } from "@/components/ui/button";

export default function CTASection() {
	return (
		<section className="w-screen flex justify-center py-12 md:py-24 lg:py-32">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Start Tracking Today
						</h2>
						<p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
							Join thousands of users who have taken control of their finances
							with Expensee.
						</p>
					</div>
					<Button
						size="lg"
						className="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						Sign Up Now
					</Button>
				</div>
			</div>
		</section>
	);
}
