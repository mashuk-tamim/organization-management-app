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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
// import { signupFormSchema } from "@/validation/signup.schema";
import { userValidationSchema } from "@/backend/modules/user/user.validation";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../../components/ui/select";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupForm() {
	const [errorMessage, setErrorMessage] = useState("");
	const { push } = useRouter();

	const form = useForm<z.infer<typeof userValidationSchema>>({
		resolver: zodResolver(userValidationSchema),
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof userValidationSchema>) {
		const { firstName, lastName, email, password, gender, contactNumber } =
			values;
		try {
			const res = await fetch("/api/register", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
					gender,
					contactNumber,
				}),
			});
			if (res.status === 400) {
				setErrorMessage("This email is already taken");
			}
			if (res.status === 200) {
				setErrorMessage("");
				push("/login");
			}
		} catch (error: any) {
			setErrorMessage("Something went wrong. Try again");
			console.log(error);
		}
		console.log(values);
	}
	return (
		<Card className="mx-auto max-w-md">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex gap-4">
							<FormField
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="Mashuk" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Tamim" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
											}}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="select a gender" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="male">Male</SelectItem>
												<SelectItem value="female">Female</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contact Number</FormLabel>
									<FormControl>
										<Input placeholder="contact number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="profileImg"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Profile Image Link (optional)</FormLabel>
									<FormControl>
										<Input placeholder="contact number" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Create an account
						</Button>
						<Button
							onClick={() => signIn("github")}
							variant="outline"
							className="w-full"
						>
							Sign in with Github <GitHubLogoIcon className="ml-2"/>
						</Button>
					</form>
				</Form>
				<p className="text-sm text-red-500 pt-2">
					{errorMessage && errorMessage}
				</p>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/login" className="underline">
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
