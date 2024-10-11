import { Input } from "@/components/ui/input";
import { RegisterState } from "@/server/actions/register.action";
import { userValidationSchema } from "@/validation/user.validation";
import { ChangeEvent } from "react";
import { z } from "zod";


type FormFieldProps = {
	id: keyof z.infer<typeof userValidationSchema>;
	label: string;
	type?: string;
	placeholder?: string;
	state?: RegisterState | null;
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
