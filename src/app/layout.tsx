import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { TransactionProvider } from "@/provider/TransactionContext";
import { ThemeProvider } from "@/provider/ThemeProvider";
// import NavbarWrapper from "@/components/NavbarWrapper";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/provider/UserContext";
import Footer from "@/components/Footer";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Expensee:Dev",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<UserProvider>
					<TransactionProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Navbar />
              {children}
              <Footer/>
							<Toaster richColors />
						</ThemeProvider>
					</TransactionProvider>
				</UserProvider>
			</body>
		</html>
	);
}
