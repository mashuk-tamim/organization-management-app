"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { z } from "zod";
import { userValidationSchema } from "@/backend/modules/user/user.validation"; // Use your existing validation schema
import { useClientValidation } from "@/hooks/useClientValidation";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "@/auth";

export default function LoginForm() {
	// Set up form state and client-side validation
	const [state, formAction] = useFormState<
		{ email?: string; password?: string; error?: string; success?: boolean },
		FormData
	>(signInUser, null);
	const { errors, validateField } = useClientValidation();

	const handleFieldChange =
		(name: keyof z.infer<typeof userValidationSchema>) => (value: string) => {
			validateField(name, value);
		};

	return (
		<Card className="mx-auto max-w-md">
			<CardHeader>
				<CardTitle className="text-xl">Log In</CardTitle>
				<CardDescription>
					Enter your email and password to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={formAction} className="space-y-4">
					<FormField
						id="email"
						label="Email"
						type="email"
						placeholder="john.doe@example.com"
						state={state}
						required
						onValueChange={handleFieldChange("email")}
						clientError={errors.email}
					/>

					<FormField
						id="password"
						label="Password"
						type="password"
						placeholder="••••••••"
						state={state}
						required
						onValueChange={handleFieldChange("password")}
						clientError={errors.password}
					/>

					<SubmitButton />

					<Button
						onClick={() => signIn("github")}
						type="button"
						variant="outline"
						className="w-full"
					>
						Sign in with Github <GitHubLogoIcon className="ml-2" />
					</Button>

					{state?.error && (
						<p className="text-sm text-red-500">{state.error}</p>
					)}

					{state?.success && (
						<p className="text-sm text-green-500">{state.message}</p>
					)}
				</form>

				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/register" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
