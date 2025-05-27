"use client";

import { useState } from "react";
import {
	BanknoteIcon as BanknotesIcon,
	CheckCircle,
	Clock,
	Search,
	XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export default function AdminPayoutsPage() {
	const { user } = useAuth();
	const allPayoutRequests: PayoutRequest[] = [];
	const [searchTerm, setSearchTerm] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [processingId, setProcessingId] = useState<string | null>(null);

	const pendingPayouts = allPayoutRequests.filter(
		(pr) => pr.status === "pending"
	);
	const processingPayouts = allPayoutRequests.filter(
		(pr) => pr.status === "processing"
	);
	const completedPayouts = allPayoutRequests.filter(
		(pr) => pr.status === "completed"
	);
	const rejectedPayouts = allPayoutRequests.filter(
		(pr) => pr.status === "rejected"
	);

	const filteredPayouts = allPayoutRequests.filter((pr: PayoutRequest) => {
		const { requester } = pr;
		return (
			(requester?.name?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
			(pr.id?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) ||
			(pr.userId?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
		);
	});

	const handleUpdateStatus = async (
		id: string,
		status: "processing" | "completed" | "rejected"
	) => {
		setIsProcessing(true);
		setProcessingId(id);

		try {
			// In a real app, this would be a server action or API call
			// updatePayoutRequest(id, { status });
			// Force a re-render by setting state
			setTimeout(() => {
				setIsProcessing(false);
				setProcessingId(null);
			}, 500);
		} catch (error) {
			console.error("Failed to update payout status:", error);
			setIsProcessing(false);
			setProcessingId(null);
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Manage Payouts
				</h1>
				<p className='text-muted-foreground'>
					Process seller payout requests
				</p>
			</div>

			<div className='flex items-center gap-4'>
				<div className='relative flex-1'>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
					<Input
						type='search'
						placeholder='Search by seller name or ID...'
						className='pl-8'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<Tabs defaultValue='pending'>
				<TabsList>
					<TabsTrigger value='pending'>
						Pending ({pendingPayouts.length})
					</TabsTrigger>
					<TabsTrigger value='processing'>
						Processing ({processingPayouts.length})
					</TabsTrigger>
					<TabsTrigger value='completed'>
						Completed ({completedPayouts.length})
					</TabsTrigger>
					<TabsTrigger value='rejected'>
						Rejected ({rejectedPayouts.length})
					</TabsTrigger>
					<TabsTrigger value='all'>
						All ({allPayoutRequests.length})
					</TabsTrigger>
				</TabsList>

				<TabsContent value='pending' className='mt-4'>
					{pendingPayouts.length > 0 ? (
						<div className='grid gap-4'>
							{pendingPayouts.map((payout) => (
								<PayoutRequestCard
									key={payout.id}
									payout={payout}
									onUpdateStatus={handleUpdateStatus}
									isProcessing={
										isProcessing &&
										processingId === payout.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<Clock className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No pending payout requests
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value='processing' className='mt-4'>
					{processingPayouts.length > 0 ? (
						<div className='grid gap-4'>
							{processingPayouts.map((payout) => (
								<PayoutRequestCard
									key={payout.id}
									payout={payout}
									onUpdateStatus={handleUpdateStatus}
									isProcessing={
										isProcessing &&
										processingId === payout.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<Clock className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No payouts being processed
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value='completed' className='mt-4'>
					{completedPayouts.length > 0 ? (
						<div className='grid gap-4'>
							{completedPayouts.map((payout) => (
								<PayoutRequestCard
									key={payout.id}
									payout={payout}
									onUpdateStatus={handleUpdateStatus}
									isProcessing={
										isProcessing &&
										processingId === payout.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<CheckCircle className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No completed payouts
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value='rejected' className='mt-4'>
					{rejectedPayouts.length > 0 ? (
						<div className='grid gap-4'>
							{rejectedPayouts.map((payout) => (
								<PayoutRequestCard
									key={payout.id}
									payout={payout}
									onUpdateStatus={handleUpdateStatus}
									isProcessing={
										isProcessing &&
										processingId === payout.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<XCircle className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No rejected payouts
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value='all' className='mt-4'>
					{filteredPayouts.length > 0 ? (
						<div className='grid gap-4'>
							{filteredPayouts.map((payout) => (
								<PayoutRequestCard
									key={payout.id}
									payout={payout}
									onUpdateStatus={handleUpdateStatus}
									isProcessing={
										isProcessing &&
										processingId === payout.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<BanknotesIcon className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No payout requests found
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}

interface PayoutRequest {
	id: string;
	status: "pending" | "processing" | "completed" | "rejected";
	createdAt: string;
	amount: number;
	paymentMethod: "bank_transfer" | "paypal";
	paymentDetails: {
		bankName?: string;
		accountNumber?: string;
		routingNumber?: string;
		paypalEmail?: string;
	};
	userId: string;
	requester?: {
		name?: string;
		email?: string;
	};
}

function PayoutRequestCard({
	payout,
	onUpdateStatus,
	isProcessing,
}: {
	payout: PayoutRequest;
	onUpdateStatus: (
		id: string,
		status: "processing" | "completed" | "rejected"
	) => void;
	isProcessing: boolean;
}) {
	const { requester } = payout;

	return (
		<Card>
			<CardHeader className='pb-2'>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle>
							Payout Request #{payout.id.slice(0, 8)}
						</CardTitle>
						<CardDescription>
							Requested on {formatDate(new Date(payout.createdAt))}
						</CardDescription>
					</div>
					<PayoutStatusBadge status={payout.status} />
				</div>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4 md:grid-cols-3'>
					<div>
						<h4 className='text-sm font-medium mb-1'>Seller</h4>
						<p className='text-sm'>
							{requester?.name || `User #${payout.userId}`}
						</p>
						<p className='text-sm text-muted-foreground'>
							{requester?.email || "No email available"}
						</p>
					</div>
					<div>
						<h4 className='text-sm font-medium mb-1'>Amount</h4>
						<p className='text-sm font-medium'>
							{formatCurrency(payout.amount)}
						</p>
						<p className='text-xs text-muted-foreground'>
							Via {formatPaymentMethod(payout.paymentMethod)}
						</p>
					</div>
					<div>
						<h4 className='text-sm font-medium mb-1'>
							Payment Details
						</h4>
						{payout.paymentMethod === "bank_transfer" && (
							<div className='text-sm'>
								<p>{payout.paymentDetails.bankName}</p>
								<p>
									Account:{" "}
									{payout.paymentDetails.accountNumber}
								</p>
								<p>
									Routing:{" "}
									{payout.paymentDetails.routingNumber}
								</p>
							</div>
						)}
						{payout.paymentMethod === "paypal" && (
							<div className='text-sm'>
								<p>
									PayPal: {payout.paymentDetails.paypalEmail}
								</p>
							</div>
						)}
					</div>
				</div>

				{payout.status === "pending" && (
					<div className='mt-4 pt-4 border-t flex justify-end gap-2'>
						<Button
							variant='outline'
							onClick={() =>
								onUpdateStatus(payout.id, "rejected")
							}
							disabled={isProcessing}>
							{isProcessing ? "Processing..." : "Reject"}
						</Button>
						<Button
							onClick={() =>
								onUpdateStatus(payout.id, "processing")
							}
							disabled={isProcessing}
							className='bg-sky-600 hover:bg-sky-700'>
							{isProcessing
								? "Processing..."
								: "Start Processing"}
						</Button>
					</div>
				)}

				{payout.status === "processing" && (
					<div className='mt-4 pt-4 border-t flex justify-end'>
						<Button
							onClick={() =>
								onUpdateStatus(payout.id, "completed")
							}
							disabled={isProcessing}
							className='bg-sky-600 hover:bg-sky-700'>
							{isProcessing
								? "Processing..."
								: "Mark as Completed"}
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function PayoutStatusBadge({ status }: { status: string }) {
	let color = "";

	switch (status) {
		case "pending":
			color = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
			break;
		case "processing":
			color = "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
			break;
		case "completed":
			color = "bg-green-100 text-green-800 hover:bg-green-100/80";
			break;
		case "rejected":
			color = "bg-red-100 text-red-800 hover:bg-red-100/80";
			break;
		default:
			color = "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
	}

	return (
		<Badge className={color} variant='outline'>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</Badge>
	);
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
