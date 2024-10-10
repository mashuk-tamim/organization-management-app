"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { Transaction } from "./types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { transactionValidationSchema } from "@/backend/modules/transaction/transaction.validation";

type TransactionForm = z.infer<typeof transactionValidationSchema>;

type AddTransactionDialogProps = {
	onAddTransaction: (transaction: Omit<Transaction, "id">) => void;
};

export default function AddTransactionDialog({
	onAddTransaction,
}: AddTransactionDialogProps) {
	const form = useForm<TransactionForm>({
		resolver: zodResolver(transactionValidationSchema),
	});

	const onSubmit = (values: TransactionForm) => {
		onAddTransaction(values);
		setOpen(false);
		console.log(values);
	};

	const [open, setOpen] = useState(false);
	const [transactionType, setTransactionType] = useState<
		"Income" | "Expense" | null
	>(null);

	// Categories based on type
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
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
              name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date</FormLabel>
									<FormControl>
										<Input type="date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<FormControl>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
												setTransactionType(value as "Income" | "Expense");
											}}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Income">Income</SelectItem>
												<SelectItem value="Expense">Expense</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={!transactionType} // Disable if no type is selected
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
											<SelectContent>
												{transactionType === "Income" && (
													<SelectGroup>
														{incomeCategories.map((category) => (
															<SelectItem key={category} value={category}>
																{category}
															</SelectItem>
														))}
													</SelectGroup>
												)}
												{transactionType === "Expense" && (
													<SelectGroup>
														{expenseCategories.map((category) => (
															<SelectItem key={category} value={category}>
																{category}
															</SelectItem>
														))}
													</SelectGroup>
												)}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="amount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
									<FormControl>
										<Input
											type="number"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="department"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Department</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select a department" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Development">Development</SelectItem>
												<SelectItem value="Design">Design</SelectItem>
												<SelectItem value="others">Others</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">Add Transaction</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
