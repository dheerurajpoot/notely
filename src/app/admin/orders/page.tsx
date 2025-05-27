"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Search } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { formatCurrency, formatDate } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import axios from "axios";

interface Order {
	_id: string;
	productId: any;
	buyerId: string;
	sellerId: string;
	amount: number;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

export default function OrdersPage() {
	const { user } = useAuth();
	const [orders, setOrders] = useState<Order[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
	const [selectedOrder, setSelectedOrder] = useState<any>(null);
	const [showOrderSlipDialog, setShowOrderSlipDialog] = useState(false);

	const fetchOrders = async () => {
		const response = await axios.get(`/api/orders/allorders`);
		const data = await response.data;
		if (data.success) {
			setOrders(data.orders);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const filteredOrders = orders.filter((order) =>
		order?._id?.toLowerCase()?.includes(searchTerm.toLowerCase())
	);
	console.log("Orders:", orders);

	const handleUpdateStatus = async (orderId: string, status: string) => {
		setIsUpdating(true);
		setUpdatingOrderId(orderId);

		try {
			const response = await axios.put(`/api/orders/${orderId}`, {
				status,
			});
			console.log("Order updated:", response.data);
			// Force a re-render by setting state
			setTimeout(() => {
				setIsUpdating(false);
				setUpdatingOrderId(null);
			}, 500);
		} catch (error) {
			console.error("Failed to update order status:", error);
			setIsUpdating(false);
			setUpdatingOrderId(null);
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>Orders</h1>
				<p className='text-muted-foreground'>Manage your orders</p>
			</div>

			<div className='flex items-center gap-4'>
				<div className='relative flex-1'>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
					<Input
						type='search'
						placeholder='Search orders by ID...'
						className='pl-8'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<div>
				<div>All Orders ({orders.length})</div>

				<div className='mt-4'>
					{filteredOrders.length > 0 ? (
						<div className='grid gap-4'>
							{filteredOrders.map((order, index) => (
								<Card key={index}>
									<CardContent>
										<CardHeader className='pb-2'>
											<div className='flex items-center justify-between'>
												<div>
													<CardTitle className='text-lg'>
														Order #
														{order._id.slice(0, 8)}
													</CardTitle>
													<CardDescription>
														Placed on{" "}
														{formatDate(
															order.createdAt
														)}
													</CardDescription>
												</div>
												<OrderStatusBadge
													status={order.status}
												/>
											</div>
										</CardHeader>
										<div className='grid gap-4 md:grid-cols-3'>
											<div>
												<h4 className='text-sm font-medium mb-1'>
													Product
												</h4>
												<p className='text-sm'>
													{order?.productId?.title ||
														`Product #${order.productId}`}
												</p>
												<p className='text-sm text-muted-foreground'>
													Digital product
												</p>
											</div>
											<div>
												<h4 className='text-sm font-medium mb-1'>
													Customer
												</h4>
												<p className='text-sm'>
													Customer #{order.buyerId}
												</p>
											</div>
											<div>
												<h4 className='text-sm font-medium mb-1'>
													Payment
												</h4>
												<p className='text-sm font-medium'>
													{formatCurrency(
														order.amount
													)}
												</p>
												<p className='text-xs text-green-600'>
													Your earnings:{" "}
													{formatCurrency(
														order.amount * 0.1
													)}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<AlertCircle className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No orders found
								</p>
							</CardContent>
						</Card>
					)}
				</div>
			</div>

			{/* Order Slip Dialog */}
			<Dialog
				open={showOrderSlipDialog}
				onOpenChange={setShowOrderSlipDialog}>
				<DialogContent className='max-w-2xl'>
					<DialogHeader>
						<DialogTitle>Order Slip</DialogTitle>
					</DialogHeader>
					{selectedOrder && <OrderSlip order={selectedOrder} />}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function OrderStatusBadge({ status }: { status: string }) {
	let color = "";

	switch (status) {
		case "pending":
			color = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
			break;
		case "completed":
			color = "bg-green-100 text-green-800 hover:bg-green-100/80";
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

async function OrderSlip({ order }: { order: any }) {
	return (
		<div className='p-4 border rounded-lg'>
			<div className='flex justify-between items-center border-b pb-4 mb-4'>
				<div>
					<h2 className='text-xl font-bold'>Notely</h2>
					<p className='text-sm text-muted-foreground'>
						Student Marketplace
					</p>
				</div>
				<div className='text-right'>
					<h3 className='font-medium'>ORDER SLIP</h3>
					<p className='text-sm'>#{order.id.slice(0, 8)}</p>
					<p className='text-xs text-muted-foreground'>
						{formatDate(order.createdAt)}
					</p>
				</div>
			</div>

			<div className='grid md:grid-cols-2 gap-6 mb-6'>
				<div>
					<h4 className='font-medium mb-2'>Order Details:</h4>
					<div className='text-sm'>
						<p>
							<span className='font-medium'>Order Date:</span>{" "}
							{formatDate(order.createdAt)}
						</p>
						<p>
							<span className='font-medium'>Order Status:</span>{" "}
							{order.status.charAt(0).toUpperCase() +
								order.status.slice(1)}
						</p>
						{order.trackingNumber && (
							<p>
								<span className='font-medium'>
									Tracking Number:
								</span>{" "}
								{order.trackingNumber}
							</p>
						)}
						<p className='mt-1'>
							<span className='font-medium'>Payment:</span>{" "}
							{formatCurrency(order.amount)}
						</p>
					</div>
				</div>
			</div>

			<div className='text-center text-sm text-muted-foreground border-t pt-4'>
				<p>Thank you for your order!</p>
				<p>
					If you have any questions, please contact support@notely.in
				</p>
			</div>
		</div>
	);
}
