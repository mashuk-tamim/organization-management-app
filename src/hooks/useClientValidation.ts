
import { userValidationSchema } from "@/backend/modules/user/user.validation";
import { useState } from "react";
import { z } from "zod";

type FieldErrors = Partial<
	Record<keyof z.infer<typeof userValidationSchema>, string>
>;

export function useClientValidation() {
	const [errors, setErrors] = useState<FieldErrors>({});

	const validateField = (
		name: keyof z.infer<typeof userValidationSchema>,
		value: string
	) => {
		try {
			const fieldSchema = userValidationSchema.shape[name];
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
