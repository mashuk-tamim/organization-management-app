"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useUser } from "@/provider/UserContext";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { BarChart3 } from "lucide-react";
import { logout } from "@/server/actions/login.action";

export default function Navbar() {
	const { user, setUser, loading } = useUser();
	const router = useRouter();

	const handleLogout = async () => {
		const response = await logout();
		if (response.success) {
			setUser(null);
		}
		router.refresh();
	};

	return (
		<nav className="w-full flex justify-between items-center gap-4 font-medium py-4 px-10">
			<div>
				<Link href="/" className="flex gap-1 items-center">
					{/* <Image src={logo} alt="logo" className="size-6" /> */}
					<BarChart3 className="h-6 w-6 text-green-primary" />
					<h1 className="text-green-primary text-xl font-bold cursor-pointer">
						Expensee
					</h1>
				</Link>
			</div>
			<div className="flex items-center gap-4">
				<div>
					<ThemeToggle />
				</div>
				{loading ? (
					<div className="animate-pulse bg-text-green-primary/30 rounded-full size-9"></div>
				) : user ? (
					<>
						<div className="hidden md:flex gap-4">
							<Link href="/dashboard" className="hover:text-green-primary">
								Dashboard
							</Link>
							<Link href="/transaction" className="hover:text-green-primary">
								Transaction
							</Link>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Image
									src={
										user.profileImg || "https://i.ibb.co.com/pJ8HzFy/60111.jpg"
									}
									alt={`${user.lastName}'s profile`}
									width={100}
									height={100}
									className="size-9 rounded-full border"
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Link href="/profile">Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href="/dashboard">Dashboard</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href="/transaction">Transaction</Link>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleLogout}>
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</>
				) : (
					<Button asChild>
						<Link href="/login">Login</Link>
					</Button>
				)}
			</div>
		</nav>
	);
}
