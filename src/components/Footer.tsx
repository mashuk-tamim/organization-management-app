import Link from "next/link";

export default function Footer() {
	return (
		<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
			<p className="text-xs text-muted-foreground">
				&copy; {new Date().getFullYear()} Expensee. All rights reserved.
			</p>
			<nav className="sm:ml-auto flex gap-4 sm:gap-6">
				<Link className="text-xs hover:text-primary" href="#">
					Terms of Service
				</Link>
				<Link className="text-xs hover:text-primary" href="#">
					Privacy
				</Link>
			</nav>
		</footer>
	);
}

