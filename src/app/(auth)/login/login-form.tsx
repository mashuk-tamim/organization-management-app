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
import { userValidationSchema } from "@/backend/modules/user/user.validation";
import { useClientValidation } from "@/hooks/useClientValidation";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { login } from "@/actions/login.action";
import { IUser } from "@/backend/modules/user/user.interface";
import { useRouter } from "next/navigation";

type LoginInResponseType = {
	user: IUser | null;
	email?: string;
	password?: string;
	error?: string;
	success?: boolean;
	message?: string;
};

export default function LoginForm() {
	const [state, formAction] = useFormState<LoginInResponseType, FormData>(
		signInUser,
		{ user: null }
	);
	const { errors, validateField } = useClientValidation();
	const { push } = useRouter();

	const handleFieldChange =
		(name: keyof z.infer<typeof userValidationSchema>) => (value: string) => {
			validateField(name, value);
		};

	// Define the function to sign in the user using the login action
	async function signInUser(
		prevState: LoginInResponseType,
		formData: FormData
	): Promise<typeof prevState> {
		try {
			const response = await login(prevState, formData);

			if (response?.success) {
				push("/dashboard");
				// 	// You can store user data in session, local storage, or state
				// 	// For example, storing in local storage or triggering global state
				// 	// localStorage.setItem("user", JSON.stringify(response.user));

				// 	return {
				// 		...response,
				// 		user: response.user, // store user data in state
				// 	};
			}

			// Ensure the response is properly structured
			return {
				user: response?.user || null,
				success: response?.success || false,
				error: response?.error,
				message:
					response?.message ||
					(response?.success ? "Login successful!" : undefined),
			};
		} catch (error) {
			if (!error) {
				// just to avoid eslint error
				return {
					user: null,
					success: false,
					error: "An unexpected error occurred during login",
				};
			}
			return {
				user: null,
				success: false,
				error: "An unexpected error occurred during login",
			};
		}
	}

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
						placeholder="your password"
						state={state}
						required
						onValueChange={handleFieldChange("password")}
						clientError={errors.password}
					/>

					<SubmitButton buttonText="Login"/>

					<Button
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
