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
import { logout } from "@/app/api/logout/route";
import { useRouter } from "next/navigation";

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
		<nav className="w-screen flex justify-between gap-4 font-medium py-4 px-10">
			<div>
				<Link href="/" className="flex gap-1 items-center">
					<Image src={logo} alt="logo" className="size-6" />
					<h1 className="text-[#4ed162] text-xl font-bold cursor-pointer">
						Expensee
					</h1>
				</Link>
			</div>
			<div className="flex gap-4 font-medium">
				<Link href="/" className="hover:text-[#4ed162]">
					Home
				</Link>
				<Link href="/dashboard" className="hover:text-[#4ed162]">
					Dashboard
				</Link>
				<Link href="/transaction" className="hover:text-[#4ed162]">
					Transaction
				</Link>
			</div>
			<div className="flex gap-4">
				<div>
					<ThemeToggle />
				</div>
				<div className="flex gap-4">
					{loading ? (
						// Show a loading indicator or skeleton
						<div className="animate-pulse bg-gray-200 rounded-full size-9"></div>
					) : user ? (
						<div className="flex items-center">
							<div className="flex items-center">
								<DropdownMenu>
									<DropdownMenuTrigger>
										<Image
											src={
												user.profileImg ||
												"https://i.ibb.co.com/pJ8HzFy/60111.jpg"
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
										<DropdownMenuItem onClick={handleLogout}>
											Log out
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					) : (
						<>
							<Button>
								<Link href="/login">Login</Link>
							</Button>
							<Button>
								<Link href="/register">Register</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}
