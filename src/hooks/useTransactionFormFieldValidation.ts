import { transactionValidationSchema } from "@/validation/transaction.validation";
import { useState } from "react";
import { z } from "zod";

type FieldErrors = Partial<
	Record<keyof z.infer<typeof transactionValidationSchema>, string>
>;

export function useTransactionFormFieldValidation() {
	const [errors, setErrors] = useState<FieldErrors>({});

	const validateField = (
		name: keyof z.infer<typeof transactionValidationSchema>,
		value: string | number
	) => {
		try {
			const fieldSchema = transactionValidationSchema.shape[name];
			fieldSchema.parse(value);
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		} catch (error) {
			if (error instanceof z.ZodError) {
				setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
			}
		}
	};

	return { errors, validateField };
}
