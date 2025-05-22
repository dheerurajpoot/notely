"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	WalletIcon,
	DownloadIcon,
	BanknoteIcon as BanknotesIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export default function WalletPage() {
	const { user } = useAuth();
	const transactions: any[] = [];
	const [payoutAmount, setPayoutAmount] = useState("");
	const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
	const [bankName, setBankName] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [routingNumber, setRoutingNumber] = useState("");
	const [paypalEmail, setPaypalEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handlePayoutRequest = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");
		setSuccess("");

		const amount = Number.parseFloat(payoutAmount);
		if (isNaN(amount) || amount <= 0) {
			setError("Please enter a valid amount");
			setIsSubmitting(false);
			return;
		}

		if (amount > (user?.walletBalance || 0)) {
			setError("Insufficient balance");
			setIsSubmitting(false);
			return;
		}

		let paymentDetails = {};
		if (paymentMethod === "bank_transfer") {
			if (!bankName || !accountNumber || !routingNumber) {
				setError("Please fill in all bank details");
				setIsSubmitting(false);
				return;
			}
			paymentDetails = { bankName, accountNumber, routingNumber };
		} else if (paymentMethod === "paypal") {
			if (!paypalEmail) {
				setError("Please enter your PayPal email");
				setIsSubmitting(false);
				return;
			}
			paymentDetails = { paypalEmail };
		}

		try {
			// In a real app, this would be a server action or API call
			// createPayoutRequest({
			// 	userId: user?.id || "",
			// 	amount,
			// 	status: "pending",
			// 	paymentMethod: paymentMethod as any,
			// 	paymentDetails,
			// });

			setSuccess("Payout request submitted successfully");
			setPayoutAmount("");
			setBankName("");
			setAccountNumber("");
			setRoutingNumber("");
			setPaypalEmail("");
		} catch (err) {
			setError("Failed to submit payout request");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Wallet</h1>
				<p className='text-muted-foreground'>
					Manage your earnings and request payouts
				</p>
			</div>

			<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm font-medium'>
							Available Balance
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{formatCurrency(user?.walletBalance || 0)}
						</div>
						<p className='text-xs text-muted-foreground mt-1'>
							Available for withdrawal
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm font-medium'>
							Pending Balance
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{formatCurrency(user?.pendingBalance || 0)}
						</div>
						<p className='text-xs text-muted-foreground mt-1'>
							Will be available after order delivery
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className='pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Earnings
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{formatCurrency(
								(user?.walletBalance || 0) +
									(user?.pendingBalance || 0)
							)}
						</div>
						<p className='text-xs text-muted-foreground mt-1'>
							Lifetime earnings
						</p>
					</CardContent>
				</Card>
			</div>

			<div className='grid gap-6 md:grid-cols-3'>
				<div className='md:col-span-2'>
					<Card>
						<CardHeader>
							<CardTitle>Transaction History</CardTitle>
							<CardDescription>
								View your recent transactions
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue='all'>
								<TabsList className='mb-4'>
									<TabsTrigger value='all'>All</TabsTrigger>
									<TabsTrigger value='credits'>
										Credits
									</TabsTrigger>
									<TabsTrigger value='payouts'>
										Payouts
									</TabsTrigger>
								</TabsList>
								<TabsContent value='all'>
									<div className='space-y-4'>
										{transactions.length > 0 ? (
											transactions.map((tx) => (
												<div
													key={tx.id}
													className='flex items-center justify-between border-b pb-4'>
													<div className='flex items-center gap-3'>
														<div
															className={`p-2 rounded-full ${getTransactionIconBg(
																tx.type
															)}`}>
															{getTransactionIcon(
																tx.type
															)}
														</div>
														<div>
															<p className='font-medium'>
																{tx.description}
															</p>
															<p className='text-xs text-muted-foreground'>
																{formatDate(
																	tx.createdAt
																)}
															</p>
														</div>
													</div>
													<div className='text-right'>
														<p
															className={`font-medium ${getTransactionAmountColor(
																tx.type
															)}`}>
															{getTransactionAmountPrefix(
																tx.type
															)}
															{formatCurrency(
																tx.amount
															)}
														</p>
														<p
															className={`text-xs ${getTransactionStatusColor(
																tx.status
															)}`}>
															{tx.status}
														</p>
													</div>
												</div>
											))
										) : (
											<p className='text-center text-muted-foreground py-4'>
												No transactions yet
											</p>
										)}
									</div>
								</TabsContent>
								<TabsContent value='credits'>
									<div className='space-y-4'>
										{transactions.filter(
											(tx) => tx.type === "credit"
										).length > 0 ? (
											transactions
												.filter(
													(tx) => tx.type === "credit"
												)
												.map((tx) => (
													<div
														key={tx.id}
														className='flex items-center justify-between border-b pb-4'>
														<div className='flex items-center gap-3'>
															<div className='p-2 rounded-full bg-green-100'>
																<ArrowDownIcon className='h-4 w-4 text-green-600' />
															</div>
															<div>
																<p className='font-medium'>
																	{
																		tx.description
																	}
																</p>
																<p className='text-xs text-muted-foreground'>
																	{formatDate(
																		tx.createdAt
																	)}
																</p>
															</div>
														</div>
														<div className='text-right'>
															<p className='font-medium text-green-600'>
																+
																{formatCurrency(
																	tx.amount
																)}
															</p>
															<p
																className={`text-xs ${getTransactionStatusColor(
																	tx.status
																)}`}>
																{tx.status}
															</p>
														</div>
													</div>
												))
										) : (
											<p className='text-center text-muted-foreground py-4'>
												No credits yet
											</p>
										)}
									</div>
								</TabsContent>
								<TabsContent value='payouts'>
									<div className='space-y-4'>
										{transactions.filter(
											(tx) => tx.type === "payout"
										).length > 0 ? (
											transactions
												.filter(
													(tx) => tx.type === "payout"
												)
												.map((tx) => (
													<div
														key={tx.id}
														className='flex items-center justify-between border-b pb-4'>
														<div className='flex items-center gap-3'>
															<div className='p-2 rounded-full bg-amber-100'>
																<ArrowUpIcon className='h-4 w-4 text-amber-600' />
															</div>
															<div>
																<p className='font-medium'>
																	{
																		tx.description
																	}
																</p>
																<p className='text-xs text-muted-foreground'>
																	{formatDate(
																		tx.createdAt
																	)}
																</p>
															</div>
														</div>
														<div className='text-right'>
															<p className='font-medium text-amber-600'>
																-
																{formatCurrency(
																	tx.amount
																)}
															</p>
															<p
																className={`text-xs ${getTransactionStatusColor(
																	tx.status
																)}`}>
																{tx.status}
															</p>
														</div>
													</div>
												))
										) : (
											<p className='text-center text-muted-foreground py-4'>
												No payouts yet
											</p>
										)}
									</div>
								</TabsContent>
							</Tabs>
						</CardContent>
						<CardFooter>
							<Button
								variant='outline'
								className='w-full'
								size='sm'>
								<DownloadIcon className='h-4 w-4 mr-2' />
								Download Statement
							</Button>
						</CardFooter>
					</Card>
				</div>

				<div>
					<Card>
						<CardHeader>
							<CardTitle>Request Payout</CardTitle>
							<CardDescription>
								Withdraw your available balance
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form
								onSubmit={handlePayoutRequest}
								className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='amount'>Amount</Label>
									<div className='relative'>
										<span className='absolute left-3 top-1/2 -translate-y-1/2'>
											$
										</span>
										<Input
											id='amount'
											type='number'
											placeholder='0.00'
											className='pl-8'
											value={payoutAmount}
											onChange={(e) =>
												setPayoutAmount(e.target.value)
											}
											min='1'
											max={user?.walletBalance || 0}
											step='0.01'
											required
										/>
									</div>
									<p className='text-xs text-muted-foreground'>
										Available:{" "}
										{formatCurrency(
											user?.walletBalance || 0
										)}
									</p>
								</div>

								<div className='space-y-2'>
									<Label htmlFor='payment-method'>
										Payment Method
									</Label>
									<Select
										value={paymentMethod}
										onValueChange={setPaymentMethod}>
										<SelectTrigger id='payment-method'>
											<SelectValue placeholder='Select payment method' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='bank_transfer'>
												Bank Transfer
											</SelectItem>
											<SelectItem value='paypal'>
												PayPal
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{paymentMethod === "bank_transfer" && (
									<>
										<div className='space-y-2'>
											<Label htmlFor='bank-name'>
												Bank Name
											</Label>
											<Input
												id='bank-name'
												value={bankName}
												onChange={(e) =>
													setBankName(e.target.value)
												}
												required
											/>
										</div>
										<div className='space-y-2'>
											<Label htmlFor='account-number'>
												Account Number
											</Label>
											<Input
												id='account-number'
												value={accountNumber}
												onChange={(e) =>
													setAccountNumber(
														e.target.value
													)
												}
												required
											/>
										</div>
										<div className='space-y-2'>
											<Label htmlFor='routing-number'>
												Routing Number
											</Label>
											<Input
												id='routing-number'
												value={routingNumber}
												onChange={(e) =>
													setRoutingNumber(
														e.target.value
													)
												}
												required
											/>
										</div>
									</>
								)}

								{paymentMethod === "paypal" && (
									<div className='space-y-2'>
										<Label htmlFor='paypal-email'>
											PayPal Email
										</Label>
										<Input
											id='paypal-email'
											type='email'
											value={paypalEmail}
											onChange={(e) =>
												setPaypalEmail(e.target.value)
											}
											required
										/>
									</div>
								)}

								{error && (
									<p className='text-sm text-red-500'>
										{error}
									</p>
								)}
								{success && (
									<p className='text-sm text-green-500'>
										{success}
									</p>
								)}

								<Button
									type='submit'
									className='w-full bg-sky-600 hover:bg-sky-700'
									disabled={isSubmitting}>
									{isSubmitting
										? "Processing..."
										: "Request Payout"}
								</Button>
							</form>
						</CardContent>
						<CardFooter className='flex flex-col items-start'>
							<p className='text-xs text-muted-foreground'>
								Payouts are processed weekly on Fridays. Minimum
								payout amount is $10.
							</p>
							<Link
								href='/dashboard/payout-history'
								className='text-xs text-sky-600 mt-2'>
								View payout history
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	);
}

function getTransactionIcon(type: string) {
	switch (type) {
		case "credit":
			return <ArrowDownIcon className='h-4 w-4 text-green-600' />;
		case "debit":
			return <ArrowUpIcon className='h-4 w-4 text-red-600' />;
		case "payout":
			return <BanknotesIcon className='h-4 w-4 text-amber-600' />;
		case "refund":
			return <ArrowDownIcon className='h-4 w-4 text-blue-600' />;
		default:
			return <WalletIcon className='h-4 w-4 text-gray-600' />;
	}
}

function getTransactionIconBg(type: string) {
	switch (type) {
		case "credit":
			return "bg-green-100";
		case "debit":
			return "bg-red-100";
		case "payout":
			return "bg-amber-100";
		case "refund":
			return "bg-blue-100";
		default:
			return "bg-gray-100";
	}
}

function getTransactionAmountColor(type: string) {
	switch (type) {
		case "credit":
		case "refund":
			return "text-green-600";
		case "debit":
		case "payout":
			return "text-amber-600";
		default:
			return "";
	}
}

function getTransactionAmountPrefix(type: string) {
	switch (type) {
		case "credit":
		case "refund":
			return "+";
		case "debit":
		case "payout":
			return "-";
		default:
			return "";
	}
}

function getTransactionStatusColor(status: string) {
	switch (status) {
		case "completed":
			return "text-green-600";
		case "pending":
			return "text-amber-600";
		case "failed":
			return "text-red-600";
		default:
			return "text-gray-600";
	}
}
