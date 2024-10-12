"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import Image from "next/image";
import logo from "@/public/logo.png"

export default function Navbar() {

	return (
		<nav className="w-screen flex justify-between gap-4 font-medium py-4 px-10">
			<div>
        <Link href="/" className="flex gap-1 items-center">
          <Image src={logo} alt="logo" className="size-6"/>
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
					<Button>
						<Link href="/login">Login</Link>
					</Button>
					<Button>
						<Link href="/register">Register</Link>
					</Button>
				</div>

				{/* <div className="flex gap-2">
						<div className="flex flex-col">
							<p>{data.user?.name || "user name not available"}</p>
							<p>{data.user?.email}</p>
						</div>
						<Image
							src={data.user?.image || ""}
							alt={data.user?.name || "not available"}
							className="size-10 rounded-full border"
						/>
						<Button onClick={() => signOut()}>Logout</Button>
					</div> */}
			</div>
		</nav>
	);
}
