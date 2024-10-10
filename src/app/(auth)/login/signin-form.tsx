"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { loginFormSchema } from "@/validation/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function SignInForm() {
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		console.log(session.status);
		if (session.status === "authenticated") {
			console.log("I want to navigate to dashboard");
			// router.push("/dashboard");
		}
		if (session.status === "loading") {
			setIsLoading(true);
		}
  }, [session, router]);
  
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
	});

	async function onSubmit(values: z.infer<typeof loginFormSchema>) {
		// Do something with the form values.
		const email = values.email;
		const password = values.password;

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		console.log(res);
		if (res?.error) {
			setErrorMessage("Invalid email or password");
			console.log(res.error);
		} else {
			setErrorMessage("");
		}
	}
	return (
		<Card className="mx-auto max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="m@example.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="password" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							{isLoading ? "Loading..." : "Login"}
						</Button>
            <Button
              type="submit"
							onClick={() => signIn("google")}
							variant="outline"
							className="w-full"
						>
							Sign in with Google
						</Button>
            <Button
              type="submit"
							onClick={() => signIn("github")}
							variant="outline"
							className="w-full"
						>
							Sign in with Github
							<GitHubLogoIcon className="ml-2" />
						</Button>
					</form>
				</Form>
				<p className="text-sm text-red-500 pt-2">
					{errorMessage && errorMessage}
				</p>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/signup" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
