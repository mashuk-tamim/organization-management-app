"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	// SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { SubmitButton } from "@/components/ui/submit-button";
import { useFormState } from "react-dom";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
	addTransaction,
	TransactionState,
} from "@/server/actions/transaction.action";
import { useTransactionContext } from "@/context/TransactionContext";
import { useTransactionFormFieldValidation } from "@/hooks/useTransactionFormFieldValidation";
import { FormField } from "@/components/ui/transaction-form-field";

export default function AddTransactionDialog() {
	const [open, setOpen] = useState(false);
	const [transactionType, setTransactionType] = useState<
		"Income" | "Expense" | null
	>(null);

	const { fetchTransactions } = useTransactionContext();

	const formRef = useRef<HTMLFormElement>(null);

	const [state, formAction] = useFormState<TransactionState, FormData>(
		addTransaction,
		null
  );

  const { errors, validateField } = useTransactionFormFieldValidation();

  const handleFieldChange = (fieldName: string) => (value: string | number) => {
		validateField(fieldName as keyof TransactionState, value);
	};
  
	// This useEffect will run after a successful transaction is added
	useEffect(() => {
		if (state?.success) {
			fetchTransactions(); // Fetch updated transactions
			toast.success(state.message);

			// Reset form fields and state
			formRef.current?.reset();
			setTransactionType(null);

			setOpen(false); // Close the modal
			state.success = false;
		}
	}, [state, fetchTransactions]);

	const incomeCategories = ["Project Completion", "Service Sale"];
	const expenseCategories = ["Salary", "Utilities"];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" /> Add Transaction
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Transaction</DialogTitle>
				</DialogHeader>
				<form action={formAction} className="space-y-4">
					<FormField
						id="date"
						label="Date"
						type="date"
						state={state}
						required
						onValueChange={handleFieldChange("date")}
						clientError={errors.date}
					/>

					<div>
						<label htmlFor="type" className="block text-sm font-medium">
							Type<span className="text-red-500 ml-1">*</span>
						</label>
						<Select
							name="type"
							required
							onValueChange={(value) => {
								setTransactionType(value as "Income" | "Expense");
								handleFieldChange("type")(value);
							}}
						>
							<SelectTrigger className={errors.type ? "border-red-500" : ""}>
								<SelectValue placeholder="Select a type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Income">Income</SelectItem>
								<SelectItem value="Expense">Expense</SelectItem>
							</SelectContent>
						</Select>
						{errors.type && (
							<p className="text-sm text-red-500">{errors.type}</p>
						)}
					</div>

					<div>
						<label htmlFor="category" className="block text-sm font-medium">
							Category<span className="text-red-500 ml-1">*</span>
						</label>
						<Select
							name="category"
							required
							disabled={!transactionType}
							onValueChange={handleFieldChange("category")}
						>
							<SelectTrigger
								className={errors.category ? "border-red-500" : ""}
							>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{transactionType === "Income" &&
									incomeCategories.map((category) => (
										<SelectItem key={category} value={category}>
											{category}
										</SelectItem>
									))}
								{transactionType === "Expense" &&
									expenseCategories.map((category) => (
										<SelectItem key={category} value={category}>
											{category}
										</SelectItem>
									))}
							</SelectContent>
						</Select>
						{errors.category && (
							<p className="text-sm text-red-500">{errors.category}</p>
						)}
					</div>

					<FormField
						id="amount"
						label="Amount"
						type="number"
						state={state}
						required
						onValueChange={handleFieldChange("amount")}
						clientError={errors.amount}
					/>

					<div>
						<label htmlFor="department" className="block text-sm font-medium">
							Department<span className="text-red-500 ml-1">*</span>
						</label>
						<Select
							name="department"
							required
							onValueChange={handleFieldChange("department")}
						>
							<SelectTrigger
								className={errors.department ? "border-red-500" : ""}
							>
								<SelectValue placeholder="Select a department" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Development">Development</SelectItem>
								<SelectItem value="Design">Design</SelectItem>
								<SelectItem value="Others">Others</SelectItem>
							</SelectContent>
						</Select>
						{errors.department && (
							<p className="text-sm text-red-500">{errors.department}</p>
						)}
					</div>

					<SubmitButton buttonText="Add Transaction" />

					{state?.error && !state.validationErrors && (
						<p className="text-sm text-red-500">{state.error}</p>
					)}

					{state?.success && (
						<p className="text-sm text-green-500">{state.message}</p>
					)}
				</form>
			</DialogContent>
		</Dialog>
	);
}

				// <form action={formAction} ref={formRef} className="space-y-4">
				// 	{/* Date Field */}
				// 	<div className="space-y-2">
				// 		<Label htmlFor="date">Date</Label>
				// 		<Input id="date" name="date" type="date" />
				// 	</div>

				// 	{/* Type Field */}
				// 	<div className="space-y-2">
				// 		<Label htmlFor="type">Type</Label>
				// 		<Select
				// 			name="type"
				// 			onValueChange={(value) => {
				// 				setTransactionType(value as "Income" | "Expense");
				// 			}}
				// 		>
				// 			<SelectTrigger>
				// 				<SelectValue placeholder="Select a type" />
				// 			</SelectTrigger>
				// 			<SelectContent>
				// 				<SelectItem value="Income">Income</SelectItem>
				// 				<SelectItem value="Expense">Expense</SelectItem>
				// 			</SelectContent>
				// 		</Select>
				// 	</div>

				// 	{/* Category Field */}
				// 	<div className="space-y-2">
				// 		<Label htmlFor="category">Category</Label>
				// 		<Select name="category" disabled={!transactionType}>
				// 			<SelectTrigger>
				// 				<SelectValue placeholder="Select a category" />
				// 			</SelectTrigger>
				// 			<SelectContent>
				// 				{transactionType === "Income" && (
				// 					<SelectGroup>
				// 						{incomeCategories.map((category) => (
				// 							<SelectItem key={category} value={category}>
				// 								{category}
				// 							</SelectItem>
				// 						))}
				// 					</SelectGroup>
				// 				)}
				// 				{transactionType === "Expense" && (
				// 					<SelectGroup>
				// 						{expenseCategories.map((category) => (
				// 							<SelectItem key={category} value={category}>
				// 								{category}
				// 							</SelectItem>
				// 						))}
				// 					</SelectGroup>
				// 				)}
				// 			</SelectContent>
				// 		</Select>
				// 	</div>

				// 	{/* Amount Field */}
				// 	<div className="space-y-2">
				// 		<Label htmlFor="amount">Amount</Label>
				// 		<Input name="amount" type="number" required />
				// 	</div>

				// 	{/* Department Field */}
				// 	<div className="space-y-2">
				// 		<Label htmlFor="department">Department</Label>
				// 		<Select name="department">
				// 			<SelectTrigger>
				// 				<SelectValue placeholder="Select a department" />
				// 			</SelectTrigger>
				// 			<SelectContent>
				// 				<SelectItem value="Development">Development</SelectItem>
				// 				<SelectItem value="Design">Design</SelectItem>
				// 				<SelectItem value="Others">Others</SelectItem>
				// 			</SelectContent>
				// 		</Select>
				// 	</div>

				// 	{/* Submit Button */}
				// 	<SubmitButton buttonText="Add Transaction" />

				// 	{/* Display errors */}
				// 	{state?.error && (
				// 		<p className="text-sm text-red-500">{state.error}</p>
				// 	)}
				// </form>