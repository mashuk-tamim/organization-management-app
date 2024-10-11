"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { z } from "zod";
import { useClientValidation } from "@/hooks/useClientValidation";
import { FormField } from "@/components/ui/form-field";
import { SubmitButton } from "@/components/ui/submit-button";
import { useRouter } from "next/navigation";
import { register, SignUpState } from "@/server/actions/register.action";
import { userValidationSchema } from "@/validation/user.validation";

export default function RegisterForm() {
	const { push } = useRouter();
	const [state, registerFormAction] = useFormState<SignUpState, FormData>(
		register,
		null
	);
	const { errors, validateField } = useClientValidation();

	if (state?.success) {
		push("/login");
	}
	const handleFieldChange =
		(name: keyof z.infer<typeof userValidationSchema>) => (value: string) => {
			validateField(name, value);
		};

	return (
		<Card className="mx-auto max-w-md">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={registerFormAction} className="space-y-4">
					<div className="flex gap-4">
						<div className="flex-1">
							<FormField
								id="firstName"
								label="First Name"
								placeholder="John"
								state={state}
								required
								onValueChange={handleFieldChange("firstName")}
								clientError={errors.firstName}
							/>
						</div>
						<div className="flex-1">
							<FormField
								id="lastName"
								label="Last Name"
								placeholder="Doe"
								state={state}
								required
								onValueChange={handleFieldChange("lastName")}
								clientError={errors.lastName}
							/>
						</div>
					</div>

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

					<div>
						<label htmlFor="gender" className="block text-sm font-medium">
							Gender<span className="text-red-500 ml-1">*</span>
						</label>
						<Select
							name="gender"
							required
							onValueChange={(value) => handleFieldChange("gender")(value)}
						>
							<SelectTrigger className={errors.gender ? "border-red-500" : ""}>
								<SelectValue placeholder="Select a gender" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="male">Male</SelectItem>
								<SelectItem value="female">Female</SelectItem>
							</SelectContent>
						</Select>
						{errors.gender && (
							<p className="text-sm text-red-500">{errors.gender}</p>
						)}
					</div>

					<FormField
						id="contactNumber"
						label="Contact Number"
						placeholder="+8801521000000"
						state={state}
						required
						onValueChange={handleFieldChange("contactNumber")}
						clientError={errors.contactNumber}
					/>

					<FormField
						id="profileImg"
						label="Profile Image URL"
						placeholder="https://example.com/profile.jpg"
						state={state}
						onValueChange={handleFieldChange("profileImg")}
						clientError={errors.profileImg}
					/>

					<SubmitButton buttonText="Register"/>

					<Button
						onClick={() => signIn("github")}
						type="button"
						variant="outline"
						className="w-full"
					>
						Sign in with Github <GitHubLogoIcon className="ml-2" />
					</Button>

					{state?.error && !state.validationErrors && (
						<p className="text-sm text-red-500">{state.error}</p>
					)}

					{state?.success && (
						<p className="text-sm text-green-500">{state.message}</p>
					)}
				</form>

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
