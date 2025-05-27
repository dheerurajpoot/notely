"use client";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import axios from "axios";
import { useAuth } from "@/context/auth-context";

export default async function PayoutHistoryPage() {
	const { user } = useAuth();
	const payoutRequests = await axios.get(
		`/api/payout-requests?userId=${user?._id}`
	);

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						Payout History
					</h1>
					<p className='text-muted-foreground'>
						View your payout requests and their status
					</p>
				</div>
				<Button variant='outline' asChild>
					<Link href='/dashboard/wallet'>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back to Wallet
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Payout Requests</CardTitle>
					<CardDescription>
						All your payout requests are listed here
					</CardDescription>
				</CardHeader>
				<CardContent>
					{payoutRequests.data.length > 0 ? (
						<div className='space-y-4'>
							{payoutRequests.data.map((payout: any) => (
								<div
									key={payout.id}
									className='flex items-center justify-between border-b pb-4'>
									<div className='flex items-center gap-3'>
										<div
											className={`p-2 rounded-full ${getPayoutStatusBg(
												payout.status
											)}`}>
											{getPayoutStatusIcon(payout.status)}
										</div>
										<div>
											<p className='font-medium'>
												{formatCurrency(payout.amount)}
											</p>
											<p className='text-xs text-muted-foreground'>
												Requested on{" "}
												{formatDate(payout.createdAt)}
											</p>
											<p className='text-xs'>
												Via{" "}
												{formatPaymentMethod(
													payout.paymentMethod
												)}
											</p>
										</div>
									</div>
									<div className='text-right'>
										<p
											className={`font-medium ${getPayoutStatusTextColor(
												payout.status
											)}`}>
											{formatPayoutStatus(payout.status)}
										</p>
										{payout.processedAt && (
											<p className='text-xs text-muted-foreground'>
												Processed on{" "}
												{formatDate(payout.processedAt)}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className='text-center py-8'>
							<p className='text-muted-foreground'>
								You haven&apos;t made any payout requests yet.
							</p>
							<Button
								asChild
								className='mt-4 bg-sky-600 hover:bg-sky-700'>
								<Link href='/dashboard/wallet'>
									Request a Payout
								</Link>
							</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

function getPayoutStatusIcon(status: string) {
	switch (status) {
		case "completed":
			return <CheckCircle className='h-4 w-4 text-green-600' />;
		case "pending":
		case "processing":
			return <Clock className='h-4 w-4 text-amber-600' />;
		case "rejected":
			return <XCircle className='h-4 w-4 text-red-600' />;
		default:
			return null;
	}
}

function getPayoutStatusBg(status: string) {
	switch (status) {
		case "completed":
			return "bg-green-100";
		case "pending":
		case "processing":
			return "bg-amber-100";
		case "rejected":
			return "bg-red-100";
		default:
			return "bg-gray-100";
	}
}

function getPayoutStatusTextColor(status: string) {
	switch (status) {
		case "completed":
			return "text-green-600";
		case "pending":
		case "processing":
			return "text-amber-600";
		case "rejected":
			return "text-red-600";
		default:
			return "";
	}
}

function formatPayoutStatus(status: string) {
	return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatPaymentMethod(method: string) {
	switch (method) {
		case "bank_transfer":
			return "Bank Transfer";
		case "paypal":
			return "PayPal";
		default:
			return method.charAt(0).toUpperCase() + method.slice(1);
	}
}
