"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  const { data } = useSession();
	// console.log(data);
	return (
		<nav className="w-screen flex justify-between gap-4 font-medium py-4 px-10">
			<div>
				<Link href="/">
					<h1 className="text-yellow-600 text-xl font-bold cursor-pointer">
						UqiDev
					</h1>
				</Link>
			</div>
			<div className="flex gap-4 font-medium">
				<Link href="/">Home</Link>
				<Link href="/dashboard">Dashboard</Link>
				<Link href="/transaction">Transaction</Link>
			</div>
			<div className="flex gap-4">
				{!data ? (
					<>
						<Button>
							<Link href="/login">Login</Link>
						</Button>
						<Button>
							<Link href="/register">Register</Link>
						</Button>
					</>
				) : (
					<div className="flex gap-2">
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
					</div>
				)}
			</div>
		</nav>
	);
}
