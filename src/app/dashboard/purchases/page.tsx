"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	Download,
	ExternalLink,
	FileText,
	Package,
	Search,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import axios from "axios";

interface Product {
	title: string;
	[key: string]: any;
}

interface Order {
	_id: string;
	productId: string;
	status: string;
	createdAt: string;
	trackingNumber?: string;
	[key: string]: any;
}

interface ProductsMap {
	[key: string]: Product;
}

export default function PurchasesPage() {
	const searchParams = useSearchParams();
	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");

	const [orders, setOrders] = useState<Order[]>([]);
	const [products, setProducts] = useState<ProductsMap>({});
	const [searchTerm, setSearchTerm] = useState("");

	const fetchOrders = async () => {
		const response = await axios.get(`/api/orders`);
		const data = await response.data;
		if (data.success) {
			setOrders(data.orders);
			// Fetch products for all orders
			const productPromises = data.orders.map((order: Order) =>
				getProductById(order.productId.toString())
			);
			const productsData = await Promise.all(productPromises);
			const productsMap: ProductsMap = {};
			data.orders.forEach((order: Order, index: number) => {
				if (productsData[index]) {
					productsMap[order.productId] = productsData[index];
				}
			});
			setProducts(productsMap);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	const getProductById = async (id: string) => {
		try {
			const response = await axios.get(`/api/products/product?id=${id}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching product:", error);
			return null;
		}
	};

	const filteredOrders = orders.filter((order) => {
		const product = products[order.productId];
		return (
			product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order._id.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-3xl font-bold tracking-tight'>
					My Purchases
				</h1>
				<p className='text-muted-foreground'>
					View and access your purchased products
				</p>
			</div>

			{success && orderId && (
				<Card className='bg-green-50 border-green-200'>
					<CardContent className='pt-6'>
						<div className='flex items-center gap-2'>
							<div className='bg-green-100 p-2 rounded-full'>
								<Package className='h-4 w-4 text-green-600' />
							</div>
							<div>
								<h3 className='font-medium text-green-800'>
									Purchase Successful!
								</h3>
								<p className='text-sm text-green-700'>
									Your order #{orderId.slice(0, 8)} has been
									completed successfully.
								</p>
							</div>
						</div>
						<div className='mt-2 flex justify-end'>
							<Button
								asChild
								variant='link'
								className='text-green-700 p-0 h-auto'>
								<Link href={`/dashboard/purchases/${orderId}`}>
									View Receipt
								</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			<div className='flex items-center gap-4'>
				<div className='relative flex-1'>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
					<Input
						type='search'
						placeholder='Search purchases...'
						className='pl-8'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{filteredOrders.length > 0 ? (
				<div className='grid gap-6'>
					{filteredOrders.map((order) => {
						const product = products[order.productId];
						return (
							<Card key={order._id}>
								<CardHeader className='pb-2'>
									<div className='flex items-center justify-between'>
										<div>
											<CardTitle>
												{product?.title || "Product"}
											</CardTitle>
											<CardDescription>
												Purchased on{" "}
												{formatDate(
													new Date(order.createdAt)
												)}
											</CardDescription>
										</div>
										<OrderStatusBadge
											status={order.status}
										/>
									</div>
								</CardHeader>
								<CardContent>
									<div className='grid gap-4 md:grid-cols-3'>
										<div>
											<h4 className='text-sm font-medium mb-1'>
												Order Details
											</h4>
											<p className='text-sm'>
												#{order._id}
											</p>
											<p className='text-sm text-muted-foreground'>
												Digital product
											</p>
										</div>
										<div>
											<h4 className='text-sm font-medium mb-1'>
												Payment
											</h4>
											<p className='text-sm'>
												{formatCurrency(order.amount)}
											</p>
										</div>
										<div>
											<h4 className='text-sm font-medium mb-1'>
												Actions
											</h4>
											<div className='flex flex-wrap gap-2'>
												{/* <Button
													variant='outline'
													size='sm'>
													<Download className='h-4 w-4 mr-1' />
													Download
												</Button> */}
												<Button
													variant='outline'
													size='sm'
													asChild>
													<Link
														href={`/dashboard/purchases/${order._id}`}>
														<FileText className='h-4 w-4 mr-1' />
														Receipt
													</Link>
												</Button>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter className='border-t pt-4 flex justify-between'>
									<Button
										variant='link'
										className='px-0'
										asChild>
										<Link
											href={`/product/${order.productId}`}>
											View Product
											<ExternalLink className='h-3 w-3 ml-1' />
										</Link>
									</Button>
									<Button variant='outline' size='sm' asChild>
										<Link
											href={`/dashboard/purchases/${order._id}`}>
											View Details
										</Link>
									</Button>
								</CardFooter>
							</Card>
						);
					})}
				</div>
			) : (
				<Card>
					<CardContent className='flex flex-col items-center justify-center py-12'>
						<Package className='h-12 w-12 text-muted-foreground mb-4' />
						<h3 className='text-lg font-medium'>
							No purchases yet
						</h3>
						<p className='text-muted-foreground text-center mt-1 mb-4'>
							You haven't made any purchases yet. Start exploring
							the marketplace!
						</p>
						<Button asChild className='bg-sky-600 hover:bg-sky-700'>
							<Link href='/browse'>Browse Products</Link>
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
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
