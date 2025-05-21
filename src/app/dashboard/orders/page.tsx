"use client";

import { useState } from "react";
import {
	Package,
	Truck,
	CheckCircle,
	AlertCircle,
	Search,
	FileText,
	Printer,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { requireAuth } from "@/lib/auth";
import {
	getOrdersBySeller,
	getPhysicalOrdersBySeller,
	updateOrder,
	getProductById,
} from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function OrdersPage() {
	const user = requireAuth();
	const allOrders = getOrdersBySeller(user?.id || "");
	const physicalOrders = getPhysicalOrdersBySeller(user?.id || "");
	const [searchTerm, setSearchTerm] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
	const [selectedOrder, setSelectedOrder] = useState<any>(null);
	const [showAddressDialog, setShowAddressDialog] = useState(false);
	const [showOrderSlipDialog, setShowOrderSlipDialog] = useState(false);

	const pendingOrders = physicalOrders.filter(
		(order) => order.status === "pending" || order.status === "processing"
	);
	const shippedOrders = physicalOrders.filter(
		(order) => order.status === "shipped"
	);
	const deliveredOrders = physicalOrders.filter(
		(order) => order.status === "delivered"
	);

	const filteredOrders = allOrders.filter((order) =>
		order.id.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleUpdateStatus = async (orderId: string, status: string) => {
		setIsUpdating(true);
		setUpdatingOrderId(orderId);

		try {
			// In a real app, this would be a server action or API call
			updateOrder(orderId, { status });
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

	const handleViewAddress = (order: any) => {
		setSelectedOrder(order);
		setShowAddressDialog(true);
	};

	const handleViewOrderSlip = (order: any) => {
		setSelectedOrder(order);
		setShowOrderSlipDialog(true);
	};

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					Orders to Fulfill
				</h1>
				<p className='text-muted-foreground'>
					Manage your physical product orders
				</p>
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

			<Tabs defaultValue='pending'>
				<TabsList>
					<TabsTrigger value='pending'>
						Pending ({pendingOrders.length})
					</TabsTrigger>
					<TabsTrigger value='shipped'>
						Shipped ({shippedOrders.length})
					</TabsTrigger>
					<TabsTrigger value='delivered'>
						Delivered ({deliveredOrders.length})
					</TabsTrigger>
					<TabsTrigger value='all'>
						All Orders ({allOrders.length})
					</TabsTrigger>
				</TabsList>

				<TabsContent value='pending' className='mt-4'>
					{pendingOrders.length > 0 ? (
						<div className='grid gap-4'>
							{pendingOrders.map((order) => (
								<OrderCard
									key={order.id}
									order={order}
									onUpdateStatus={handleUpdateStatus}
									onViewAddress={handleViewAddress}
									onViewOrderSlip={handleViewOrderSlip}
									isUpdating={
										isUpdating &&
										updatingOrderId === order.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<Package className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No pending orders to fulfill
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value='shipped' className='mt-4'>
					{shippedOrders.length > 0 ? (
						<div className='grid gap-4'>
							{shippedOrders.map((order) => (
								<OrderCard
									key={order.id}
									order={order}
									onUpdateStatus={handleUpdateStatus}
									onViewAddress={handleViewAddress}
									onViewOrderSlip={handleViewOrderSlip}
									isUpdating={
										isUpdating &&
										updatingOrderId === order.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<Truck className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No shipped orders
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value='delivered' className='mt-4'>
					{deliveredOrders.length > 0 ? (
						<div className='grid gap-4'>
							{deliveredOrders.map((order) => (
								<OrderCard
									key={order.id}
									order={order}
									onUpdateStatus={handleUpdateStatus}
									onViewAddress={handleViewAddress}
									onViewOrderSlip={handleViewOrderSlip}
									isUpdating={
										isUpdating &&
										updatingOrderId === order.id
									}
								/>
							))}
						</div>
					) : (
						<Card>
							<CardContent className='flex flex-col items-center justify-center py-8'>
								<CheckCircle className='h-12 w-12 text-muted-foreground mb-4' />
								<p className='text-center text-muted-foreground'>
									No delivered orders
								</p>
							</CardContent>
						</Card>
					)}
				</TabsContent>

				<TabsContent value='all' className='mt-4'>
					{filteredOrders.length > 0 ? (
						<div className='grid gap-4'>
							{filteredOrders.map((order) => (
								<OrderCard
									key={order.id}
									order={order}
									onUpdateStatus={handleUpdateStatus}
									onViewAddress={handleViewAddress}
									onViewOrderSlip={handleViewOrderSlip}
									isUpdating={
										isUpdating &&
										updatingOrderId === order.id
									}
								/>
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
				</TabsContent>
			</Tabs>

			{/* Address Dialog */}
			<Dialog
				open={showAddressDialog}
				onOpenChange={setShowAddressDialog}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delivery Address</DialogTitle>
					</DialogHeader>
					{selectedOrder?.deliveryAddress && (
						<div className='space-y-2'>
							<p className='font-medium'>
								{selectedOrder.deliveryAddress.fullName}
							</p>
							<p>{selectedOrder.deliveryAddress.addressLine1}</p>
							{selectedOrder.deliveryAddress.addressLine2 && (
								<p>
									{selectedOrder.deliveryAddress.addressLine2}
								</p>
							)}
							<p>
								{selectedOrder.deliveryAddress.city},{" "}
								{selectedOrder.deliveryAddress.state}{" "}
								{selectedOrder.deliveryAddress.postalCode}
							</p>
							<p>{selectedOrder.deliveryAddress.country}</p>
							<p className='pt-2'>
								Phone:{" "}
								{selectedOrder.deliveryAddress.phoneNumber}
							</p>
						</div>
					)}
				</DialogContent>
			</Dialog>

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

function OrderCard({
	order,
	onUpdateStatus,
	onViewAddress,
	onViewOrderSlip,
	isUpdating,
}: {
	order: any;
	onUpdateStatus: (orderId: string, status: string) => void;
	onViewAddress: (order: any) => void;
	onViewOrderSlip: (order: any) => void;
	isUpdating: boolean;
}) {
	const product = getProductById(order.productId);

	return (
		<Card>
			<CardHeader className='pb-2'>
				<div className='flex items-center justify-between'>
					<div>
						<CardTitle className='text-lg'>
							Order #{order.id.slice(0, 8)}
						</CardTitle>
						<CardDescription>
							Placed on {formatDate(order.createdAt)}
						</CardDescription>
					</div>
					<OrderStatusBadge status={order.status} />
				</div>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4 md:grid-cols-3'>
					<div>
						<h4 className='text-sm font-medium mb-1'>Product</h4>
						<p className='text-sm'>
							{product?.title || `Product #${order.productId}`}
						</p>
						<p className='text-sm text-muted-foreground'>
							{order.isPhysical
								? "Physical delivery"
								: "Digital product"}
						</p>
					</div>
					<div>
						<h4 className='text-sm font-medium mb-1'>Customer</h4>
						<p className='text-sm'>Customer #{order.buyerId}</p>
						{order.isPhysical && order.deliveryAddress && (
							<Button
								variant='link'
								size='sm'
								className='p-0 h-auto text-sky-600'
								onClick={() => onViewAddress(order)}>
								View Address
							</Button>
						)}
					</div>
					<div>
						<h4 className='text-sm font-medium mb-1'>Payment</h4>
						<p className='text-sm font-medium'>
							{formatCurrency(order.amount)}
						</p>
						<p className='text-xs text-muted-foreground'>
							Platform fee: {formatCurrency(order.platformFee)}
						</p>
						<p className='text-xs text-green-600'>
							Your earnings:{" "}
							{formatCurrency(order.sellerEarnings)}
						</p>
					</div>
				</div>

				{order.isPhysical && (
					<div className='mt-4 pt-4 border-t'>
						<div className='flex items-center justify-between'>
							<div>
								<h4 className='text-sm font-medium'>
									Shipping Details
								</h4>
								{order.trackingNumber ? (
									<p className='text-sm'>
										Tracking: {order.trackingNumber}
									</p>
								) : (
									<p className='text-sm text-muted-foreground'>
										No tracking number yet
									</p>
								)}
							</div>
							<div className='flex gap-2'>
								<Button
									variant='outline'
									size='sm'
									onClick={() => onViewOrderSlip(order)}>
									<FileText className='h-4 w-4 mr-1' />
									Order Slip
								</Button>
								<Button variant='outline' size='sm'>
									<Printer className='h-4 w-4 mr-1' />
									Print Label
								</Button>
							</div>
						</div>

						{order.status === "pending" && (
							<div className='mt-4 flex justify-end'>
								<Button
									onClick={() =>
										onUpdateStatus(order.id, "processing")
									}
									disabled={isUpdating}
									className='bg-sky-600 hover:bg-sky-700'>
									{isUpdating
										? "Updating..."
										: "Start Processing"}
								</Button>
							</div>
						)}

						{order.status === "processing" && (
							<div className='mt-4 flex justify-end'>
								<Button
									onClick={() =>
										onUpdateStatus(order.id, "shipped")
									}
									disabled={isUpdating}
									className='bg-sky-600 hover:bg-sky-700'>
									{isUpdating
										? "Updating..."
										: "Mark as Shipped"}
								</Button>
							</div>
						)}

						{order.status === "shipped" && (
							<div className='mt-4 flex justify-end'>
								<Button
									onClick={() =>
										onUpdateStatus(order.id, "delivered")
									}
									disabled={isUpdating}
									className='bg-sky-600 hover:bg-sky-700'>
									{isUpdating
										? "Updating..."
										: "Mark as Delivered"}
								</Button>
							</div>
						)}
					</div>
				)}
			</CardContent>
		</Card>
	);
}

function OrderStatusBadge({ status }: { status: string }) {
	let color = "";

	switch (status) {
		case "pending":
			color = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
			break;
		case "processing":
			color = "bg-blue-100 text-blue-800 hover:bg-blue-100/80";
			break;
		case "shipped":
			color = "bg-purple-100 text-purple-800 hover:bg-purple-100/80";
			break;
		case "delivered":
			color = "bg-green-100 text-green-800 hover:bg-green-100/80";
			break;
		case "completed":
			color = "bg-green-100 text-green-800 hover:bg-green-100/80";
			break;
		case "refunded":
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

function OrderSlip({ order }: { order: any }) {
	const product = getProductById(order.productId);

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
					<h4 className='font-medium mb-2'>Ship To:</h4>
					{order.deliveryAddress && (
						<div className='text-sm'>
							<p className='font-medium'>
								{order.deliveryAddress.fullName}
							</p>
							<p>{order.deliveryAddress.addressLine1}</p>
							{order.deliveryAddress.addressLine2 && (
								<p>{order.deliveryAddress.addressLine2}</p>
							)}
							<p>
								{order.deliveryAddress.city},{" "}
								{order.deliveryAddress.state}{" "}
								{order.deliveryAddress.postalCode}
							</p>
							<p>{order.deliveryAddress.country}</p>
							<p className='mt-1'>
								Phone: {order.deliveryAddress.phoneNumber}
							</p>
						</div>
					)}
				</div>

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

			<div className='border rounded mb-6'>
				<table className='w-full'>
					<thead className='bg-gray-50'>
						<tr>
							<th className='px-4 py-2 text-left text-sm font-medium'>
								Product
							</th>
							<th className='px-4 py-2 text-right text-sm font-medium'>
								Price
							</th>
						</tr>
					</thead>
					<tbody className='divide-y'>
						<tr>
							<td className='px-4 py-3'>
								<div>
									<p className='font-medium'>
										{product?.title ||
											`Product #${order.productId}`}
									</p>
									<p className='text-sm text-muted-foreground'>
										Physical copy
									</p>
								</div>
							</td>
							<td className='px-4 py-3 text-right'>
								{formatCurrency(
									order.amount - (order.deliveryFee || 0)
								)}
							</td>
						</tr>
						{order.deliveryFee && (
							<tr>
								<td className='px-4 py-3'>
									<div>
										<p className='font-medium'>
											Delivery Fee
										</p>
									</div>
								</td>
								<td className='px-4 py-3 text-right'>
									{formatCurrency(order.deliveryFee)}
								</td>
							</tr>
						)}
					</tbody>
					<tfoot className='bg-gray-50'>
						<tr>
							<td className='px-4 py-2 text-right font-medium'>
								Total
							</td>
							<td className='px-4 py-2 text-right font-medium'>
								{formatCurrency(order.amount)}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>

			<div className='text-center text-sm text-muted-foreground border-t pt-4'>
				<p>Thank you for your order!</p>
				<p>
					If you have any questions, please contact support@notely.com
				</p>
			</div>
		</div>
	);
}
