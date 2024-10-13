import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
	return (
		<section className="w-screen flex justify-center py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							Track Your Finances with Ease
						</h1>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Expensee helps you monitor your profit and loss on a weekly,
							monthly, and yearly basis. Stay on top of your finances with our
							intuitive dashboard and transaction management.
						</p>
					</div>
          <div className="space-x-4">
            <Link href="/register">
						<Button
							size="lg"
							className="bg-primary text-primary-foreground hover:bg-primary/90"
						>
							Get Started
						</Button>
            </Link>
						<Button
							size="lg"
							variant="outline"
							className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
						>
							Learn More
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
