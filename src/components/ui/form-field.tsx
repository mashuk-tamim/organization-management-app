import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
import { userValidationSchema } from "@/backend/modules/user/user.validation";
import { z } from "zod";
import { SignUpState } from "@/actions/register.action";

type FormFieldProps = {
	id: keyof z.infer<typeof userValidationSchema>;
	label: string;
	type?: string;
	placeholder?: string;
	state?: SignUpState | null;
	required?: boolean;
	onValueChange?: (value: string) => void;
	clientError?: string;
};

export function FormField({
	id,
	label,
	type = "text",
	placeholder,
	state,
	required,
	onValueChange,
	clientError,
}: FormFieldProps) {
	const serverError = state?.validationErrors?.find(
		(e) => e.path === id
	)?.message;
	const error = clientError || serverError;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onValueChange?.(e.target.value);
	};

	return (
		<div>
			<label htmlFor={id} className="block text-sm font-medium">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			<Input
				id={id}
				name={id}
				type={type}
				placeholder={placeholder}
				required={required}
				onChange={handleChange}
				className={error ? "border-red-500" : ""}
			/>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}

// import { SignUpState } from "@/actions/signup.action";
// import { Input } from "@/components/ui/input";

// type FormFieldProps = {
// 	id: string;
// 	label: string;
// 	type?: string;
// 	placeholder?: string;
// 	state?: SignUpState | null;
// 	required?: boolean;
// };

// export function FormField({
// 	id,
// 	label,
// 	type = "text",
// 	placeholder,
// 	state,
// 	required,
// }: FormFieldProps) {
// 	const error = state?.validationErrors?.find((e) => e.path === id)?.message;

// 	return (
// 		<div>
// 			<label htmlFor={id} className="block text-sm font-medium">
// 				{label}
// 				{required && <span className="text-red-500 ml-1">*</span>}
// 			</label>
// 			<Input
// 				id={id}
// 				name={id}
// 				type={type}
// 				placeholder={placeholder}
// 				required={required}
// 			/>
// 			{error && <p className="text-sm text-red-500">{error}</p>}
// 		</div>
// 	);
// }
